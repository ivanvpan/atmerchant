import { Database } from '#/db'
import { getSessionAgent } from '#/session'
import { TID } from '@atproto/common'

interface ExtractedRecord {
  uri: string
  cid: string
  value: any
}

async function extractRecordsFromCar(
  carData: Uint8Array,
  did: string,
): Promise<ExtractedRecord[]> {
  const { CarReader } = await import('@ipld/car')
  const { decode } = await import('@ipld/dag-cbor')
  const { CID } = await import('multiformats/cid')
  const car = await CarReader.fromBytes(carData)

  const records: ExtractedRecord[] = []
  const cidToPkey = new Map<string, string>()

  // First pass: build mapping of CIDs to record keys
  for await (const block of car.blocks()) {
    const decoded: any = decode(block.bytes)
    // console.log(decoded)
    if (decoded.e) {
      for (const entry of decoded.e) {
        const pkey = new TextDecoder().decode(entry.k)
        cidToPkey.set(entry.v.toString(), pkey)
        if (pkey.includes('/')) {
          console.log('pkey', pkey, entry.v.toString())
        }
      }
    }
  }

  // Second pass: extract actual records
  for await (const block of car.blocks()) {
    const decoded: any = decode(block.bytes)
    // {
    //   e: [
    //     {
    //       k: [Uint8Array],
    //       p: 0,
    //       t: null,
    //       v: CID(bafyreiebeetyijmqmyn7t3enudmzlmj5nbqammkbx3meb3ilebpek35xpa)
    //     }
    //   ],
    //   l: null
    // }
    if (decoded.$type) {
      console.log(block.cid.toString(), decoded)
      const cid = block.cid.toString()
      const pkey = cidToPkey.get(cid)
      if (pkey) {
        // console.log('pkey', pkey)
        const rkey = pkey.split('/').pop()
        const recordUri = `at://${did}/${decoded.$type}/${rkey}`
        records.push({
          uri: recordUri,
          cid,
          value: decoded,
        })
      }
    }
  }

  return records
}

export async function bulkSyncFromCursor(repoDid: string, db: Database) {
  const agent = await getSessionAgent()

  const cursor = await db
    .selectFrom('cursor')
    .where('id', '=', 1)
    .select('seq')
    .executeTakeFirst()

  const repo = await agent.com.atproto.sync.getRepo({
    did: repoDid,
    // since: cursor?.seq ? String(cursor?.seq) : undefined
    // since: '3lmdubwjaqc2m',
  })

  const records = await extractRecordsFromCar(repo.data, repoDid)
  // console.log('Extracted records:', records)
}
