import AppError from '../../../shared/errors/AppError'
import BCryptHashProvider from '../../providers/implementations/BCryptHashProvider'
import { JWTAuthentication } from '../../providers/implementations/JWTAuthenticationProvider'
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory'
import { CreateUserUseCase } from '../createUsers/CreateUserUseCase'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

let createUserUseCase: CreateUserUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let hashProvider: BCryptHashProvider
let jWTAuthentication: JWTAuthentication
let authenticateUserUseCase: AuthenticateUserUseCase
describe('Authenticate account', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    hashProvider = new BCryptHashProvider()
    jWTAuthentication = new JWTAuthentication()
    createUserUseCase = new CreateUserUseCase(
      usersRepositoryInMemory,
      hashProvider,
      jWTAuthentication,
    )
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      hashProvider,
      jWTAuthentication,
    )
  })
  it('should be able to authenticate an account', async () => {
    const user = {
      email: 'Fake User',
      password: '123456',
    }
    await createUserUseCase.execute({
      email: user.email,
      password: user.password,
    })

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    })

    expect(result).toHaveProperty('token')
  })

  it('should not be able to authenticate an unregistered user', () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'NotRegisteredUser@email.com',
        password: '12345',
      })
    }).rejects.toBeInstanceOf(AppError)
  })
  it('should not be able to authenticate an user with incorrect password', () => {
    expect(async () => {
      const user = {
        email: 'Fake User',
        password: '123456',
      }
      await createUserUseCase.execute({
        email: user.email,
        password: user.password,
      })

      await authenticateUserUseCase.execute({
        email: user.email,
        password: 'incorrectPassword',
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
