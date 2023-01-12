import { Request, response, Response } from 'express';
import { UserService } from '../services/UserService';

const userService = new UserService()

export class UserController {

    createUser = (request: Request, response: Response) => {
        const user = request.body

        // nulo ou indefinido
        if(!user.name){
            return response.status(400).json({ message: 'Bad Request: name must be defined'})
        }
        userService.createUser(user.name, user.email)
        return response.status(201).json({ message: 'Created' })
    }

    getAllUsers = (request: Request, response: Response) => {
        const users = userService.getAllUsers()
        return response.status(200).json(users)
    } 
}