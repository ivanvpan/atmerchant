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
      // Ensure server is properly closed
      await server.close()
      // Give the server time to fully close
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }
  })

  it('should start and 404', async () => {
    // Not an awesome test. There is no health check endpoint.
    try {
      const response = await client.com.atproto.server.getSession()
    } catch (error) {
      expect(true).toBe(true)
      return
    }
    expect(true).toBe(false)
  })
})
