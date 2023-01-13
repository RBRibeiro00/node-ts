import { response } from "express";
import { User, UserService } from "./UserService";

describe('UserService', () => {
    const mockDb: User[] = []
    const userService = new UserService(mockDb)

    it('Deve adicionar um novo usuário ', () => {
        const mockConsole = jest.spyOn(global.console, 'log') //armazena a chamada console.log
        userService.createUser('Rômulo', 'romulo@test.com')
        expect(mockConsole).toHaveBeenCalledWith('Database updated', mockDb)
    });

    it('Deve buscar todos os usuários ', () => {
        userService.getAllUsers()
        expect(mockDb).toBeCalled
    });

    it('Deve retornar uma mensagem de deletando', () => {
        const mockConsole = jest.spyOn(global.console, 'log') //armazena a chamada console.log
        userService.deleteUser()
        expect(mockConsole).toHaveBeenCalledWith('Deletando...')
    });
});