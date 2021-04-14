import { ICreateContactDTO } from '../../dtos/ICreateContactDTO'
import { IContactsRepository } from '../IContactsRepository'
import { Contact } from './ContactInMemory'

class ContactRepositoryInMemory implements IContactsRepository {
  contacts: Contact[] = []
  async create(data: ICreateContactDTO): Promise<void> {
    const contact = new Contact()

    Object.assign(contact, {
      ...contact,
      data,
    })

    this.contacts.push(contact)
  }
  async findByUserId(user_id: string): Promise<any> {
    return this.contacts.find(contact => contact.user_id === user_id)
  }
}

export { ContactRepositoryInMemory }
