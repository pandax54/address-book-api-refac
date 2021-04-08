import { celebrate, Segments, Joi } from 'celebrate'
import { Router } from 'express'

import { AuthenticateUserController } from '../modules/users/useCases/authenticateUsers/AuthenticateUserController'

const sessionsRouter = Router()

const authenticateUserController = new AuthenticateUserController()

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  authenticateUserController.handle,
)

export default sessionsRouter
