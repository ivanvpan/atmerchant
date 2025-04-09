import type { AppContext } from '#/context'
import type { Server } from '#/lexicon'
import applyWrites from './lexicon/atproto/applyWrites'
import listGroups from './lexicon/merchant/listGroups'
import putGroup from './lexicon/merchant/putGroup'

export * as health from './health'

export default function (server: Server, ctx: AppContext) {
  listGroups(server, ctx)
  putGroup(server, ctx)
  applyWrites(server, ctx)
  return server
}
