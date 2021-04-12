import { inject, injectable } from 'tsyringe'

import AppError from '../../../shared/errors/AppError'
import { IAuthentication } from '../../providers/IAuthentication'
import { IHashProvider } from '../../providers/IBCryptHashProvider'
import { IUsersRepository } from '../../repositories/IUsersRepository'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  token: string
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
    @inject('TokenProvider')
    private jWTAuthentication: IAuthentication,
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const checkAccountEmail = await this.usersRepository.findByEmail(email)

    if (checkAccountEmail) {
      throw new AppError('Account already registered!', 409)
    }

    const hashedPassword = await this.hashProvider.generateHash(password)

    const user = await this.usersRepository.create({
      email,
      password: hashedPassword,
    })

    const token = await this.jWTAuthentication.generate(user.id)

    return { token }
  }
}

export { CreateUserUseCase }
