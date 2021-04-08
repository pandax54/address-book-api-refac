import { inject, injectable } from 'tsyringe'

import AppError from '../../../../errors/AppError'
import { IAuthentication } from '../../providers/IAuthentication'
import { IHashProvider } from '../../providers/IBCryptHashProvider'
import { IUsersRepository } from '../../repositories/IUsersRepository'

interface IRequest {
  email: string
  password: string
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
    @inject('TokenProvider')
    private jWTAuthentication: IAuthentication,
  ) {}

  async execute({ email, password }: IRequest): Promise<string> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Email/Password does not match.', 401)
    }

    const passwordMatched = this.hashProvider.compareHash(
      password,
      user.password,
    )

    if (!passwordMatched) {
      throw new AppError('Email/Password does not match.', 401)
    }

    const token = await this.jWTAuthentication.generate(user.id)

    return token
  }
}

export { AuthenticateUserUseCase }
