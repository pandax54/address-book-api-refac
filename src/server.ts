import env from 'env-var'

import 'dotenv/config'
import { app } from './app'
import './database'
import logger from './logger'
import './modules/shared/container'

const port = env.get('PORT').required().asPortNumber()

app.listen(port, () =>
  logger.info(`Server running at http://localhost:${port}`),
)
