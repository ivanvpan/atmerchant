import {TID} from '@atproto/common'
import { InvalidRequestError, UpstreamFailureError } from '@atproto/xrpc-server'
import { AppContext } from '#/context'
import { getSessionAgent } from '#/session'
import { Server } from '#/lexicon'

export default function (server: Server, ctx: AppContext) {
  server.com.atproto.repo.applyWrites({
    handler: async ({ input, req, res }) => {
      ctx.logger.info('inside handler!')

      const agent = await getSessionAgent(req, res)
      agent.assertDid

      console.log('input', JSON.stringify(input))

      try {
        const response = await agent.com.atproto.repo.applyWrites(input.body)
        return {
          encoding: 'application/json',
          body: response.data,
        }
      } catch (err) {
        throw new UpstreamFailureError('Failed to write record')
      }
    },
  })
}
