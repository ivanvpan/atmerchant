import { AppContext } from '#/context'
import { Server } from '#/lexicon'
import { dbMerchantLocationToMerchantLocationView } from '#/controllers/merchant'
import { findMerchantLocationsByGroupTid } from '#/db'
import { InvalidRequestError } from '@atproto/xrpc-server'

export default function (server: Server, ctx: AppContext) {
  server.xyz.noshdelivery.v0.merchant.listLocations({
    handler: async ({ params }) => {
      if (!params?.groupTid) {
        throw new InvalidRequestError('groupUri is required')
      }
      const locations = await findMerchantLocationsByGroupTid(ctx.db, params.groupTid)
      return {
        encoding: 'application/json',
        body: {
          locations: locations.map(dbMerchantLocationToMerchantLocationView),
        },
      }
    },
  })
}