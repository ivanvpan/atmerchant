import type { AppContext } from '#/context'
import type { Server } from '#/lexicon'
import applyWrites from './lexicon/atproto/applyWrites'
import listGroups from './lexicon/merchant/listGroups'
// import createMerchant from './lexicon/merchant/createMerchant'

export * as health from './health'

export default function (server: Server, ctx: AppContext) {
  listGroups(server, ctx)
  applyWrites(server, ctx)
  return server
}
