import { AtUri } from '@atproto/uri'

function tidFromUri(uri: string) {
  const atUri = new AtUri(uri)
  return atUri.rkey
}

function typeFromUri(uri: string) {
  const atUri = new AtUri(uri)
  return atUri.collection
}

export { tidFromUri, typeFromUri }
