import { describe, beforeAll, afterAll, it, expect } from '@jest/globals'
import { Server } from '../src/index'
import { AtpAgent } from '@atproto/api'

describe('PDS Server', () => {
  let server: Server
  let client: AtpAgent

  beforeAll(async () => {
    // Start the server
    console.log('Starting server')
    server = await Server.create()
    console.log('Server started')
    
    // Create an XRPC client pointing to the server
    client = new AtpAgent({
      service: `http://localhost:${process.env.PORT || 3001}`,
    })
  })

  afterAll(async () => {
    // Clean up by closing the server
    await server.close()
  })

  it('should start and respond to basic XRPC calls', async () => {
    // Make a simple XRPC call to check if the server is responding
    // This is a basic health check - you may want to replace this with
    // a more specific endpoint from your API
    const response = await client.api.com.atproto.server.getSession()
    expect(response).toBeDefined()
  })
})
