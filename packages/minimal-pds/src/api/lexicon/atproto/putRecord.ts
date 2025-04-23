import { AppContext } from '#/context'
import { Server } from '#/lexicon'

export default function (server: Server, ctx: AppContext) {
  server.com.atproto.repo.putRecord({
    handler: async ({ input, req, res }) => {
      const body ={
        uri: 'at://',
        cid: 'cid',
        commit: {
          cid: 'cid',
          rev: 'tid'
        },
        validationStatus: 'valid'
      }
      return {
        encoding: 'application/json',
        body,
      }
    },
  })
}
