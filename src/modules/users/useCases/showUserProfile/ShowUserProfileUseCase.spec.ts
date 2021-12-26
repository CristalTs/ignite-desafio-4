import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository"
import { AuthenticateUserUseCase } from "../authenticateUser/AuthenticateUserUseCase"
import { CreateUserUseCase } from "../createUser/CreateUserUseCase"
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase"

let inMemoryUsersRepository: InMemoryUsersRepository
let showUserProfileUseCase: ShowUserProfileUseCase
let authenticateUserUseCase: AuthenticateUserUseCase
let createUserUseCase: CreateUserUseCase

describe("shoe user profile", () => {

    beforeEach(() => {
        inMemoryUsersRepository = new InMemoryUsersRepository()
        showUserProfileUseCase = new ShowUserProfileUseCase(inMemoryUsersRepository)
        authenticateUserUseCase = new AuthenticateUserUseCase(inMemoryUsersRepository)
        createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
    })

    it("should be able to show the user profile", async () => {
        await createUserUseCase.execute({
            name: "user test",
            email: "usertest@email.com",
            password: "1234",
        })

        const authentication = await authenticateUserUseCase.execute({
            email: "usertest@email.com",
            password: "1234"
        })

        const user_id = authentication.user.id

        const user = await showUserProfileUseCase.execute(user_id as string)

        expect(user).toHaveProperty("id")
        expect(user.email).toBe("usertest@email.com")

    })
})