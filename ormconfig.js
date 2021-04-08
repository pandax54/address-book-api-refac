// eslint-disable-next-line @typescript-eslint/no-var-requires
const env = require('env-var')

module.exports = {
  // url: env.get('DATABASE_URL').required().asString(),
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'root',
  password: 'password',
  database: 'bookAddress',
  synchronize: false,
  logging: false,
  migrations: ['./src/database/migrations/*.ts'],
  entities: ['./src/modules/**/entities/*.ts'],
  cli: {
    migrationsDir: './src/database/migrations',
  },
  extra: {
    ssl:
      env.get('ENV').asString() === 'dev'
        ? false
        : { rejectUnauthorized: false },
  },
}
