import { describe, beforeAll, afterAll, it, expect } from '@jest/globals'
import { Server } from '../src/index'
import { AtpAgent } from '@atproto/api'

describe('PDS Server', () => {
  let server: Server
  let client: AtpAgent

  beforeAll(async () => {
    // Start the server
    server = await Server.create()

    // Create an XRPC client pointing to the server
    client = new AtpAgent({
      service: `http://localhost:${process.env.PORT || 3001}`,
    })
  })

  afterAll(async () => {
    if (server) {
      await server.close()
    }
  })

  it('should start and list records', async () => {
    // Not an awesome test. There is no health check endpoint.
    const response = await client.com.atproto.repo.listRecords({
      repo: 'did:plc:ufa7rl6agtfdqje6bant3wsb',
      collection: 'xyz.noshdelivery.v0.merchant.location',
    })
    expect(response.data.records).toEqual([])
  })
})
