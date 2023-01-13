import { Request, response, Response } from 'express';
import { UserService } from '../services/UserService';

export class UserController {

    userService: UserService

    constructor(userService = new UserService()){
        this.userService = userService
    }

    createUser = (request: Request, response: Response) => {
        const user = request.body

        // nulo ou indefinido
        if(!user.name){
            return response.status(400).json({ message: 'Bad Request: name must be defined'})
        }
        if (!user.email){
            return response.status(400).json({ message: 'Bad Request: email must be defined'})
        }
        this.userService.createUser(user.name, user.email)
        return response.status(201).json({ message: 'Created' })
    }

    getAllUsers = (request: Request, response: Response) => {
        const users = this.userService.getAllUsers()
        return response.status(200).json(users)
    } 

    deleteUser = (request: Request, response: Response) => {
        this.userService.deleteUser()
        return response.status(200).json({ message: 'Deleted'})
    }
}