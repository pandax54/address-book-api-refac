import { container } from 'tsyringe'

import { FirebaseRepository } from '../../contacts/infra/repositories/implementations/ContactsRepository'
import { IContactsRepository } from '../../contacts/repositories/IContactsRepository'
import { UsersRepository } from '../../users/infra/repositories/implementations/UsersRepository'
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
