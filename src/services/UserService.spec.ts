import { UserService } from "./UserService";

jest.mock('../repositories/UserRepository')
jest.mock('../database', () => {
    initialize: jest.fn()
})

const mockUserRepository = require('../repositories/UserRepository')

describe('UserService', () => {
    const userService = new UserService(mockUserRepository)

    it('Deve adicionar um novo usuário ', async () => {
        mockUserRepository.createUser = jest.fn().mockImplementation(() => Promise.resolve({
            id_user: '123456',
            name: 'Rômulo',
            email: 'romulo@test.com',
            password: '123456'
        }))
        const response = await userService.createUser('Rômulo', 'romulo@test.com', '123456')
        expect(mockUserRepository.createUser).toHaveBeenCalled()
        expect(response).toMatchObject({
            id_user: '123456',
            name: 'Rômulo',
            email: 'romulo@test.com',
            password: '123456'
        })
    });

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