import { UserService } from "./UserService";
import * as jwt from 'jsonwebtoken'

jest.mock('../repositories/UserRepository')
jest.mock('../database', () => {
    initialize: jest.fn()
})
jest.mock('jsonwebtoken')

const mockUserRepository = require('../repositories/UserRepository')

describe('UserService', () => {
    const userService = new UserService(mockUserRepository)
    const mockUser = {
        id_user: '123456',
        name: 'Rômulo',
        email: 'romulo@test.com',
        password: '123456'
    }

    it('Deve adicionar um novo usuário ', async () => {
        mockUserRepository.createUser = jest.fn().mockImplementation(() => Promise.resolve(mockUser))
        const response = await userService.createUser('Rômulo', 'romulo@test.com', '123456')
        expect(mockUserRepository.createUser).toHaveBeenCalled()
        expect(response).toMatchObject({
            id_user: '123456',
            name: 'Rômulo',
            email: 'romulo@test.com',
            password: '123456'
        })
    });

    it('Deve retornar um token de usuario', async () => {
        jest.spyOn(userService, 'getAuthenticatedUser').mockImplementation(() => Promise.resolve(mockUser))
        jest.spyOn(jwt, 'sign').mockImplementation(() => 'token')
        const token = await userService.getToken('romulo@test.com', '123456')
        expect(token).toBe('token')
    })

    it('Deve retornar um erro caso não encontre o usuario', async () => {
        jest.spyOn(userService, 'getAuthenticatedUser').mockImplementation(() => Promise.resolve(null))
        await expect(userService.getToken('invalid@test.com', '123456')).rejects.toThrowError(new Error('Email/password invalid!'))
    })

    // it('Deve buscar todos os usuários ', () => {
    //     userService.getAllUsers()
    //     expect(mockDb).toBeCalled
    // });

    // it('Deve retornar uma mensagem de deletando', () => {
    //     const mockConsole = jest.spyOn(global.console, 'log') //armazena a chamada console.log
    //     userService.deleteUser()
    //     expect(mockConsole).toHaveBeenCalledWith('Deletando...')
    // });
});