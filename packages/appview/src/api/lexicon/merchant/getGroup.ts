import { AppContext } from '#/context'
import { Server } from '#/lexicon'
import { dbMerchantGroupToMerchantGroupView } from '#/controllers/merchant'
import { findMerchantGroupByTid } from '#/db'


export default function (server: Server, ctx: AppContext) {
  server.xyz.noshdelivery.v0.merchant.getGroup({
    handler: async ({ params }) => {

      const group = await findMerchantGroupByTid(ctx.db, params.tid)
      if (!group) {
        throw new Error('Group not found') // TODO what's the right error here?
      }
      return {
        encoding: 'application/json',
        body: {
          group: dbMerchantGroupToMerchantGroupView(group)
        },
        }
      }
    })
  }