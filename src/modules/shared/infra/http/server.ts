import env from 'env-var'

import 'dotenv/config'
import logger from '../../logger'
import { app } from './app'
import '../typeorm/database'
import '../../container'

const port = env.get('PORT').required().asPortNumber()

app.listen(port, () =>
  logger.info(`Server running at http://localhost:${port}`),
)
