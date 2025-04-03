import type { AppContext } from '#/context'
import type { Server } from '#/lexicon'
import createItem from './lexicons/createItem'

export * as health from './health'

export default function (server: Server, ctx: AppContext) {
  createItem(server, ctx)
  return server
}
