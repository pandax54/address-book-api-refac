import { Router } from 'express'

import contactsRouter from './contactsRoutes'
import sessionsRouter from './sessionsRoutes'
import usersRouter from './usersRoutes'

const router = Router()

router.use('/user', usersRouter)
router.use('/login', sessionsRouter)
router.use('/contact', contactsRouter)

export default router
