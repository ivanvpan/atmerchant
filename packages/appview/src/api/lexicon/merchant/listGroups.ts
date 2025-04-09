import { AppContext } from '#/context'
import { Server } from '#/lexicon'
import { dbMerchantGroupToMerchantGroupView } from '#/controllers/merchant'
import { findAllMerchantGroups } from '#/db'

export default function (server: Server, ctx: AppContext) {
  server.xyz.noshdelivery.v0.merchant.listGroups({
    handler: async () => {
      const groups = await findAllMerchantGroups(ctx.db)
      return {
        encoding: 'application/json',
        body: {
          groups: groups.map(dbMerchantGroupToMerchantGroupView),
        },
        }
      }
    })
  }