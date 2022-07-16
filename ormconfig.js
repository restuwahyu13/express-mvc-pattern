const path = require('path')

const pathEntitiesDir = !['production', 'staging'].includes(process.env.NODE_ENV) ? 'src/entities/*.ts' : 'dist/entities/*.js'
const pathMigrationDir = !['production', 'staging'].includes(process.env.NODE_ENV) ? 'src/databases/migrations' : 'dist/databases/migrations'

const entitiesDir = path.resolve(process.cwd(), pathEntitiesDir)
const migrationsDir = path.resolve(process.cwd(), pathMigrationDir)

module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [entitiesDir],
  migrations: [migrationsDir],
  synchronize: !['production', 'staging'].includes(process.env.NODE_ENV) ? true : false,
  logger: !['production', 'staging'].includes(process.env.NODE_ENV) ? 'advanced-console' : undefined,
  logging: !['production', 'staging'].includes(process.env.NODE_ENV) ? true : false,
  cli: {
    entitiesDir: entitiesDir,
    migrationsDir: migrationsDir
  }
}
