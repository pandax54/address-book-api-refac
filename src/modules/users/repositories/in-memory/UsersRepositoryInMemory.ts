import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'
import { User } from '../../infra/typeorm/entities/User'
import { IUsersRepository } from '../IUsersRepository'

class UsersRepositoryInMemory implements IUsersRepository {
  categories: User[] = []
  async create({ email, password }: ICreateUserDTO): Promise<User> {
    const user = new User()

    Object.assign(user, {
      email,
      password,
    })
    this.categories.push(user)

    return user
  }
  async findById(id: string): Promise<User | undefined> {
    return this.categories.find(user => user.id === id)
  }
  async findByEmail(email: string): Promise<User | undefined> {
    return this.categories.find(user => user.email === email)
  }
}

export { UsersRepositoryInMemory }
