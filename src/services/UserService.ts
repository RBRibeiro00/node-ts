const database = [
    {
        name: 'Joana',
        email: 'joana@email.com'
    }
]

export class UserService {

    createUser = (name: string, email: string) => {
        const user = {
            name,
            email
        }
        database.push(user)
        console.log(database)
    }

    getAllUsers = () => {
        return database
    } 
}