import { ICreateContactDTO } from '../dtos/ICreateContactDTO'

interface IContactsRepository {
  create(data: ICreateContactDTO): Promise<void>
  findByUserId(user_id: string): Promise<any>
}

export { IContactsRepository }
