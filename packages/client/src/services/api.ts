import * as Lexicon from '@nosh/lexicon'
import { schemaDict } from '@nosh/lexicon/src/lexicons'

class StatusphereAgent extends Lexicon.AtpBaseClient {
  constructor() {
    super(StatusphereAgent.fetchHandler)
  }

  private static fetchHandler: Lexicon.AtpBaseClient['fetchHandler'] = (
    path: string | URL | Request,
    options: RequestInit | undefined,
  ) => {
    return fetch(path, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
  }
}

const agent = new StatusphereAgent()

// API service
export const api = {
  // Create status
  listGroups(params: Lexicon.XyzNoshdeliveryV0MerchantListGroups.InputSchema) {
    return agent.xyz.noshdelivery.v0.merchant.listGroups(params)
  },

  createGroup({ name }: { name: string }) {
    return agent.com.atproto.repo.applyWrites({
      repo: 'did:plc:ufa7rl6agtfdqje6bant3wsb',
      validate: false,
      writes: [
        {
          $type: 'com.atproto.repo.applyWrites#create',
          collection: schemaDict.XyzNoshdeliveryV0MerchantGroup.id,
          value: { name },
        },
      ],
    })
  },
}

export default api
