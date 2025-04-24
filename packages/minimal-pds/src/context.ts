import type { pino } from 'pino'
import { Database, DatabaseSchema } from './db'

export type AppContext = {
  logger: pino.Logger
  db: Database<DatabaseSchema>
}
