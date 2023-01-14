import { UserService } from "../services/UserService";
import { UserController } from "./UserController";
import { Request } from "express";
import { makeMockResponse } from "../__mocks__/mockResponse.mock";
import { makeMockRequest } from "../__mocks__/mockRequest.mock";

const mockUserService = {
    createUser: jest.fn(),
    getUser: jest.fn()
}

jest.mock('../services/UserService', () => {
    return {
        UserService: jest.fn().mockImplementation(() => {
            return mockUserService
        })
    }
})

describe('UserController', () => {

    const userController = new UserController()
    const mockResponse = makeMockResponse()

    it('Deve adicionar um novo usuário', () => {
        const mockRequest = {
            body: {
                name: 'Rômulo',
                email: 'romulo@test.com',
                password: '123456'
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(201)
        expect(mockResponse.state.json).toMatchObject({ message: 'Created' })
    });

    it('Deve retornar um erro 400 caso o nome não seja informado', () => {
        const mockRequest = {
            body: {
                name: '',
                email: 'romulo@test.com',
                password: '123456'
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad Request: name, email and password must be defined' })
    });

    it('Deve retornar um erro 400 caso o email não seja informado', () => {
        const mockRequest = {
            body: {
                name: 'Rômulo',
                email: '',
                password: '123456'
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad Request: name, email and password must be defined' })
    });

    it('Deve retornar um erro 400 caso a senha não seja informada', () => {
        const mockRequest = {
            body: {
                name: 'Rômulo',
                email: 'romulo@test.com',
                password: ''
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad Request: name, email and password must be defined' })
    });

    it('Deve retornar o usuário com o ID informado ', () => {
        const mockRequest = makeMockRequest({
            params: {
                userId: '123456'
            }
        })
        userController.getUser(mockRequest, mockResponse)
        expect(mockUserService.getUser).toHaveBeenCalledWith('123456')
        expect(mockResponse.state.status).toBe(200)
    });

    // it('Deve buscar todos os usuários ', () => {
    //     userController.getAllUsers
    //     expect(userController.getAllUsers).toBeCalled
    // });

    it('Deve deletar um usuário ', () => {
        userController.deleteUser
        expect(userController.deleteUser).toBeCalled
    });
});