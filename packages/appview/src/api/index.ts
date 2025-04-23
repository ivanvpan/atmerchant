import type { AppContext } from '#/context'
import type { Server } from '#/lexicon'
import applyWrites from './lexicon/atproto/applyWrites'
import listGroups from './lexicon/merchant/listGroups'
import putGroup from './lexicon/merchant/putGroup'
import getGroup from './lexicon/merchant/getGroup'
import listLocations from './lexicon/merchant/listLocations'
import putLocation from './lexicon/merchant/putLocation'
import putCatalogObject from './lexicon/catalog/putCatalogObject'
export * as health from './health'

export default function (server: Server, ctx: AppContext) {
  listGroups(server, ctx)
  putGroup(server, ctx)
  getGroup(server, ctx)
  listLocations(server, ctx)
  putLocation(server, ctx)
  putCatalogObject(server, ctx)
  return server
}
