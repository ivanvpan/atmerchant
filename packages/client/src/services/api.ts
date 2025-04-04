import * as Lexicon from '@nosh/lexicon'
import type { XyzNoshdeliveryMerchantGetMerchants } from '@nosh/lexicon'

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
  // // Login
  // async login(handle: string) {
  //   const response = await fetch('/oauth/initiate', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     credentials: 'include',
  //     body: JSON.stringify({ handle }),
  //   })

  //   if (!response.ok) {
  //     const error = await response.json()
  //     throw new Error(error.error || 'Login failed')
  //   }

  //   return response.json()
  // },

  // // Logout
  // async logout() {
  //   const response = await fetch('/oauth/logout', {
  //     method: 'POST',
  //     credentials: 'include',
  //   })

  //   if (!response.ok) {
  //     throw new Error('Logout failed')
  //   }

  //   return response.json()
  // },

  // Create status
  getMerchants(params: XyzNoshdeliveryMerchantGetMerchants.InputSchema) {
    return agent.xyz.noshdelivery.merchant.getMerchants(params)
  },

  createMerchant() {
    return agent.xyz.noshdelivery.merchant.createMerchant(undefined)
  },
}

export default api
