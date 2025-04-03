import type { AppContext } from '#/context'
import type { Server } from '#/lexicon'
import getMerchants from './lexicon/merchant/getMerchants'

export * as health from './health'

export default function (server: Server, ctx: AppContext) {
  getMerchants(server, ctx)
  return server
}
