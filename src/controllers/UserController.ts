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
        if(!user.name || !user.email || !user.password){
            return response.status(400).json({ message: 'Bad Request: name, email and password must be defined'})
        }

        this.userService.createUser(user.name, user.email, user.password)
        return response.status(201).json({ message: 'Created' })
    }

    getUser = (request: Request, response: Response) => {
        return response.status(200)
    } 

    deleteUser = (request: Request, response: Response) => {
        this.userService.deleteUser()
        return response.status(200).json({ message: 'Deleted'})
    }
}