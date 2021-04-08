import { inject, injectable } from 'tsyringe'

import { IContactsRepository } from '../../repositories/IContactsRepository'

interface IRequest {
  user_id: string
  first_name: string
  last_name: string
  phone_number: string
  address: string
  created_at: string
}

@injectable()
class CreateContactUseCase {
  constructor(
    @inject('FirebaseRepository')
    private contactsRepository: IContactsRepository,
  ) {}

  async execute({
    user_id,
    first_name,
    last_name,
    phone_number,
    address,
    created_at,
  }: IRequest): Promise<void> {
    await this.contactsRepository.create({
      user_id,
      first_name,
      last_name,
      phone_number,
      address,
      created_at,
    })
  }
}

export { CreateContactUseCase }
