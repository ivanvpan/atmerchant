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
    // console.log('Persisting session', sess)
    console.log('Persisting session')
    session = sess
  },
})

export async function getSessionAgent(
  req: IncomingMessage | Request,
  res: ServerResponse | Response,
) {
  if (!session) {
    const result = await agent.login({
      identifier: 'ivanp@fastmail.fm',
      password: '7SjHUpcEDuRvRBuP34LOv1HG',
    })
    console.log('logged in')
  }
  // } else {
  //   const resumedSession = await agent.resumeSession(session)
  //   console.log('resumed session', resumedSession)
  // }

  return agent
}
