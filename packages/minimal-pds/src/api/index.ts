import type { AppContext } from '#/context'
import type { Server } from '#/lexicon'
import applyWrites from './lexicon/atproto/applyWrites'
export * as health from './health'

export default function (server: Server, ctx: AppContext) {
  return server
}
