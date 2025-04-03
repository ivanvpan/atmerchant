import { AppContext } from '#/context'
import { Server } from '#/lexicon'

export default function (server: Server, ctx: AppContext) {
  server.xyz.noshdelivery.merchant.getMerchants({
    handler: async ({ params }) => {
      return {
        encoding: 'application/json',
        body: {
          merchants: ["Test"],
        },
      }
    },
  })
}
