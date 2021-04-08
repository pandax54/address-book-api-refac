import { ICreateUserDTO } from '../dtos/ICreateUserDTO'
import { User } from '../entities/User'

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>
  findById(id: string): Promise<User | undefined>
  findByEmail(email: string): Promise<User | undefined>
}

export { IUsersRepository }
