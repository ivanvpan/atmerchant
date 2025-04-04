import type { IncomingMessage, ServerResponse } from 'node:http'
import type { Request, Response } from 'express'
import { AtpAgent, AtpSessionData, AtpSessionEvent } from '@atproto/api'
import type { AppContext } from '#/context'

let session: AtpSessionData | undefined = undefined

// const LOCAL_PDS_URL = 'http://localhost:2583'
const PDS_URL = 'https://shored.boats'
const agent = new AtpAgent({
  service: PDS_URL,
  persistSession: (evt: AtpSessionEvent, sess?: AtpSessionData) => {
    console.log('Persisting session', sess)
    session = sess
  },
})

export async function getSessionAgent(
  // req: IncomingMessage | Request,
  // res: ServerResponse | Response,
  // ctx: AppContext,
) {
  if (!session) {
    await agent.login({
      identifier: 'ivanp@fastmail.fm',
      password: '7SjHUpcEDuRvRBuP34LOv1HG',
    })
  } else {
    await agent.resumeSession(session)
  }

  return agent
}
