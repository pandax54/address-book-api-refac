import { celebrate, Segments, Joi } from 'celebrate'
import { Router } from 'express'

import { CreateUserController } from '../../../../users/useCases/createUsers/CreateUserController'
import { ListProfileUserController } from '../../../../users/useCases/listProfileUsers/ListProfileUserController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const createUserController = new CreateUserController()
const listProfileUserController = new ListProfileUserController()

const usersRouter = Router()

usersRouter.get('/me', ensureAuthenticated, listProfileUserController.handle)

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  createUserController.handle,
)

export default usersRouter
