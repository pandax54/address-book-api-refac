import { getRepository, Repository } from 'typeorm'

import { ICreateUserDTO } from '../../../dtos/ICreateUserDTO'
import { IUsersRepository } from '../../../repositories/IUsersRepository'
import { User } from '../../typeorm/entities/User'

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>
  constructor() {
    this.repository = getRepository(User)
  }
  async create({ email, password }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({
      email,
      password,
    })

    await this.repository.save(user)

    return user
  }
  async findById(id: string): Promise<User | undefined> {
    return this.repository.findOne(id)
  }
  async findByEmail(email: string): Promise<User | undefined> {
    return this.repository.findOne({ email })
  }
}

export { UsersRepository }
