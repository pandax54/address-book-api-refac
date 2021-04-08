import { container } from 'tsyringe'

import { IContactsRepository } from '../../contacts/repositories/IContactsRepository'
import { FirebaseRepository } from '../../contacts/repositories/implementations/ContactsRepository'
import { UsersRepository } from '../../users/repositories/implementations/UsersRepository'
import { IUsersRepository } from '../../users/repositories/IUsersRepository'
import '../../users/providers'

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
)

container.registerSingleton<IContactsRepository>(
  'FirebaseRepository',
  FirebaseRepository,
)
