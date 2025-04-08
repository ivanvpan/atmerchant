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
        console.log('Write response', JSON.stringify(response))
        // Response
        // {
        //   "data": {
        //     "commit": {
        //       "cid": "bafyreihbiblrdlz3ea4d3axjsyhpbo4trhjyao4kwqz6aahag5h7minyxm",
        //       "rev": "3lmd3zlcw622y"
        //     },
        //     "results": [
        //       {
        //         "$type": "com.atproto.repo.applyWrites#createResult",
        //         "cid": "bafyreigvurkt2kdswcbmcd3clfgpaxf77tvzdjgi7edfc7fsmkuv3a5ciy",
        //         "uri": "at://did:plc:ufa7rl6agtfdqje6bant3wsb/xyz.noshdelivery.v0.merchant.group/3lmd3zlcnes2y"
        //       }
        //     ]
        //   },
        //   "headers": {
        //     "access-control-allow-origin": "*",
        //     "alt-svc": "h3=\":443\"; ma=2592000",
        //     "cache-control": "private",
        //     "content-length": "331",
        //     "content-type": "application/json; charset=utf-8",
        //     "date": "Tue, 08 Apr 2025 18:26:51 GMT",
        //     "etag": "W/\"14b-ASSsYc84cUV/BFxaYq7smoW5Izk\"",
        //     "server": "Caddy",
        //     "vary": "Authorization, Accept-Encoding",
        //     "x-powered-by": "Express"
        //   },
        //   "success": true
        // }
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
