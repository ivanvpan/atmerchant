import { getSessionAgent } from '#/session'

interface ExtractedRecord {
  uri: string
  cid: string
  value: any
}

async function extractRecordsFromCar(carData: Uint8Array, did: string): Promise<ExtractedRecord[]> {
  const { CarReader } = await import('@ipld/car')
  const { decode } = await import('@ipld/dag-cbor')
  const car = await CarReader.fromBytes(carData)
  
  const records: ExtractedRecord[] = []
  const cidToPkey = new Map<string, string>()

  // First pass: build mapping of CIDs to record keys
  for await (const block of car.blocks()) {
    const decoded: any = decode(block.bytes)
    if (decoded.e) {
      for (const entry of decoded.e) {
        const pkey = new TextDecoder().decode(entry.k)
        cidToPkey.set(entry.v.toString(), pkey)
      }
    }
  }

  // Second pass: extract actual records
  for await (const block of car.blocks()) {
    const decoded: any = decode(block.bytes)
    if (decoded.$type) {
      const cid = block.cid.toString()
      const pkey = cidToPkey.get(cid)
      if (pkey) {
        // Parse the pkey using AtUri
        const rkey = pkey.split('/').pop()
        const recordUri = `at://${did}/${decoded.$type}/${rkey}`
        records.push({
          uri: recordUri,
          cid,
          value: decoded
        })
      }
    }
  }

  return records
}

export async function createSyncRepoIngester() {
  const agent = await getSessionAgent()
  const repo = await agent.com.atproto.sync.getRepo({
    did: 'did:plc:ufa7rl6agtfdqje6bant3wsb',
  })
  
  const records = await extractRecordsFromCar(repo.data, 'did:plc:ufa7rl6agtfdqje6bant3wsb')
  console.log('Extracted records:', records)
}
