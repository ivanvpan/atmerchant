import * as Lexicon from '@nosh/lexicon'

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

  putGroup(params: Lexicon.XyzNoshdeliveryV0MerchantPutGroup.InputSchema) {
    return agent.xyz.noshdelivery.v0.merchant.putGroup(params)
  },

  getGroup(params: Lexicon.XyzNoshdeliveryV0MerchantGetGroup.QueryParams) {
    return agent.xyz.noshdelivery.v0.merchant.getGroup(params)
  },

  listLocations(
    params: Lexicon.XyzNoshdeliveryV0MerchantListLocations.QueryParams,
  ) {
    return agent.xyz.noshdelivery.v0.merchant.listLocations(params)
  },

  putLocation(
    params: Lexicon.XyzNoshdeliveryV0MerchantPutLocation.InputSchema,
  ) {
    return agent.xyz.noshdelivery.v0.merchant.putLocation(params)
  },
}

export default api
