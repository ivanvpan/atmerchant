import { getSessionAgent } from '#/session'

export async function createSyncRepoIngester() {
  const agent = await getSessionAgent()
  const { CarReader, CarWriter } = await import('@ipld/car')
  const { decode } = await import('@ipld/dag-cbor')
  const repo = await agent.com.atproto.sync.getRepo({
    did: 'did:plc:ufa7rl6agtfdqje6bant3wsb',
  })
  console.log('repo', repo)
  const car = await CarReader.fromBytes(repo.data)
  for await (const block of car.blocks()) {
    const decoded: any = decode(block.bytes)
    if (decoded.$type) {
      console.log('record!', decoded)
    }
  }
}
