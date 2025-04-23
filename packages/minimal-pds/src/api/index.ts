import type { AppContext } from '#/context'
import type { Server } from '#/lexicon'
import putRecord from './lexicon/atproto/putRecord'

export default function (server: Server, ctx: AppContext) {
  putRecord(server, ctx)
  return server
}
