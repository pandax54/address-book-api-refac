import { celebrate, Segments, Joi } from 'celebrate'
import { Router } from 'express'

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { CreateContactController } from '../modules/contacts/useCases/createContacts/CreateContactController'
import { ListContactsController } from '../modules/contacts/useCases/listContacts/ListContactsController'

const contactsRouter = Router()

const createContactController = new CreateContactController()
const listContactsController = new ListContactsController()

contactsRouter.get('/', ensureAuthenticated, listContactsController.handle)

contactsRouter.post(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      first_name: Joi.string().max(30).required(),
      last_name: Joi.string().max(30).required(),
      phone_number: Joi.string().max(17).required(),
      address: Joi.string().required(),
      created: Joi.date().default(Date.now),
    },
  }),
  createContactController.handle,
)

export default contactsRouter
