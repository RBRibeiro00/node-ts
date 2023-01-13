import { UserService } from "../services/UserService";
import { UserController } from "./UserController";
import { Request } from "express";
import { makeMockResponse } from "../__mocks__/mockResponse.mock";

describe('UserController', () => {
    const mockUserService: Partial<UserService> = {
        createUser: jest.fn()
    } 

    const userController = new UserController(mockUserService as UserService)

    it('Deve adicionar um novo usuário', () => {
        const mockRequest = {
            body: {
                name: 'Rômulo',
                email: 'romulo@test.com'
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(201)
        expect(mockResponse.state.json).toMatchObject({message: 'Created'}) 
    });

    it('Deve retornar um erro 400 caso o nome não seja informado', () => {
        const mockRequest = {
            body: {
                name: '',
                email: 'romulo@test.com'
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({message: 'Bad Request: name must be defined'}) 
    });

        it('Deve retornar um erro 400 caso o email não seja informado', () => {
        const mockRequest = {
            body: {
                name: 'Rômulo',
                email: ''
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({message: 'Bad Request: email must be defined'}) 
    });

    it('Deve buscar todos os usuários ', () => {
        userController.getAllUsers
        expect(userController.getAllUsers).toBeCalled
    });

    it('Deve deletar um usuário ', () => {
        userController.deleteUser
        expect(userController.getAllUsers).toBeCalled
    });
});