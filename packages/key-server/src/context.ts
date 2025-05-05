import type { pino } from 'pino'
import { Database } from './db'

export type AppContext = {
  db: Database
  logger: pino.Logger
}
