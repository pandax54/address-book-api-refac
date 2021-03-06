import AppError from '../../../shared/errors/AppError'
import BCryptHashProvider from '../../providers/implementations/BCryptHashProvider'
import { JWTAuthentication } from '../../providers/implementations/JWTAuthenticationProvider'
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory'
import { CreateUserUseCase } from './CreateUserUseCase'

let createUserUseCase: CreateUserUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let hashProvider: BCryptHashProvider
let jWTAuthentication: JWTAuthentication
describe('Create new account', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    hashProvider = new BCryptHashProvider()
    jWTAuthentication = new JWTAuthentication()
    createUserUseCase = new CreateUserUseCase(
      usersRepositoryInMemory,
      hashProvider,
      jWTAuthentication,
    )
  })
  it('should be able to create new account', async () => {
    const user = {
      email: 'fake@email.com',
      password: '123456',
    }
    await createUserUseCase.execute({
      email: user.email,
      password: user.password,
    })

    const userCreated = await usersRepositoryInMemory.findByEmail(user.email)

    expect(userCreated).toHaveProperty('id')
  })

  it('should not be able to create account with the same email', () => {
    expect(async () => {
      await createUserUseCase.execute({
        email: 'fake@email.com',
        password: '123456',
      })

      await createUserUseCase.execute({
        email: 'fake@email.com',
        password: '123456',
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
