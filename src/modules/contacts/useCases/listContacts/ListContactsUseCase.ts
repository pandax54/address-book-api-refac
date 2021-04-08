import { inject, injectable } from 'tsyringe'

import AppError from '../../../../errors/AppError'
import { IContactsRepository } from '../../repositories/IContactsRepository'

interface IResponse {
  object: {
    id: string
    user_id: string
    first_name: string
    last_name: string
    phone_number: string
    address: string
    created_at: string
  }
}

@injectable()
class ListContactsUseCase {
  constructor(
    @inject('FirebaseRepository')
    private contactsRepository: IContactsRepository,
  ) {}

  async execute(user_id: string): Promise<IResponse[]> {
    const list = await this.contactsRepository.findByUserId(user_id)

    if (!list) {
      throw new AppError('No contacts found', 404)
    }
    return list
  }
}

export { ListContactsUseCase }
