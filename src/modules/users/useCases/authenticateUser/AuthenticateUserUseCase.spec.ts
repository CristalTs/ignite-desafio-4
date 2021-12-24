import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository"
import { CreateUserUseCase } from "../createUser/CreateUserUseCase"
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"

let authenticateUserUseCase: AuthenticateUserUseCase
let inMemoryUsersRepository: InMemoryUsersRepository
let createUserUseCase: CreateUserUseCase

describe("Authenticate user", () => {
    beforeEach(() => {
        inMemoryUsersRepository = new InMemoryUsersRepository()
        authenticateUserUseCase = new AuthenticateUserUseCase(inMemoryUsersRepository)
        createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository)
    })
    it('should be able to authenticate user', async () => {

        await createUserUseCase.execute({
            name: "user test",
            email: "usertest@email.com",
            password: "1234",
        })

        const authentication = await authenticateUserUseCase.execute({
            email: "usertest@email.com",
            password: "1234"
        })

        console.log(authentication)

        expect(authentication).toHaveProperty('token');
    })
})