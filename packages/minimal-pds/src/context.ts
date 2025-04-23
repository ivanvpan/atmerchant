import type { pino } from 'pino'

export type AppContext = {
  logger: pino.Logger
}
