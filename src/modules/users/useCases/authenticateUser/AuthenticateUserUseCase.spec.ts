import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository"
import { CreateUserUseCase } from "../createUser/CreateUserUseCase"
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"
import { IncorrectEmailOrPasswordError } from "./IncorrectEmailOrPasswordError"

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

        expect(authentication).toHaveProperty('token');
    })

    it('should not be able to authenticate a nonexistent user', () => {
        expect(async () => {
          const result = await authenticateUserUseCase.execute({
            email: 'user00@email.com',
            password: '1234',
          });
        }).rejects.toBeInstanceOf(IncorrectEmailOrPasswordError);
    });

    it('should not be able to authenticate with incorrect password', () => {
        expect(async () => {
            await createUserUseCase.execute({
                name: "user test",
                email: "usertest@email.com",
                password: "1234",
            })
    
          const result = await authenticateUserUseCase.execute({
            email: "usertest@email.com",
            password: 'incorrectPassword',
          });
        }).rejects.toBeInstanceOf(IncorrectEmailOrPasswordError);
      });
})