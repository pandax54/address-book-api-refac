import AppError from '../../../shared/errors/AppError'
import BCryptHashProvider from '../../../users/providers/implementations/BCryptHashProvider'
import { JWTAuthentication } from '../../../users/providers/implementations/JWTAuthenticationProvider'
import { UsersRepositoryInMemory } from '../../../users/repositories/in-memory/UsersRepositoryInMemory'
import { AuthenticateUserUseCase } from '../../../users/useCases/authenticateUsers/AuthenticateUserUseCase'
import { CreateUserUseCase } from '../../../users/useCases/createUsers/CreateUserUseCase'
import { ContactRepositoryInMemory } from '../../repositories/in-memory/ContactRepositoryInMemory'
import { CreateContactUseCase } from './CreateContactUseCase'

let createUserUseCase: CreateUserUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let hashProvider: BCryptHashProvider
let jWTAuthentication: JWTAuthentication
let authenticateUserUseCase: AuthenticateUserUseCase
let createContactUseCase: CreateContactUseCase
let contactRepositoryInMemory: ContactRepositoryInMemory
describe('Create new Contact', () => {
  beforeEach(() => {
    contactRepositoryInMemory = new ContactRepositoryInMemory()
    createContactUseCase = new CreateContactUseCase(contactRepositoryInMemory)
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
  it('should be able to create new contact after create a new account', async () => {
    const user = {
      email: 'Fake User',
      password: '123456',
    }
    await createUserUseCase.execute({
      email: user.email,
      password: user.password,
    })

    const createdUser = await usersRepositoryInMemory.findByEmail(user.email)

    if (createdUser) {
      await createContactUseCase.execute({
        user_id: createdUser.id,
        first_name: 'souza',
        last_name: 'Ribeiro',
        phone_number: '(55)27998753750',
        address:
          'Rua Desemb. carlos xavier paes barreto, 73 apto 101. Mata da Praia',
      })
    }
  })

  it('should be able to create new contact after login', async () => {
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
      password: user.password,
    })

    const createdUser = await usersRepositoryInMemory.findByEmail(user.email)

    if (createdUser) {
      await createContactUseCase.execute({
        user_id: createdUser.id,
        first_name: 'souza',
        last_name: 'Ribeiro',
        phone_number: '(55)27998753750',
        address:
          'Rua Desemb. carlos xavier paes barreto, 73 apto 101. Mata da Praia',
      })
    }
  })

  it('should not be able to allow an unauthenticate user to create a new contact', () => {
    expect(async () => {
      await createContactUseCase.execute({
        user_id: 'fakeUser',
        first_name: 'souza',
        last_name: 'Ribeiro',
        phone_number: '(55)27998753750',
        address:
          'Rua Desemb. carlos xavier paes barreto, 73 apto 101. Mata da Praia',
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
