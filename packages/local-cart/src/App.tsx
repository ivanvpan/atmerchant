import { useEffect, useState } from 'react'
import { AutomergeUrl, Doc, DocHandle, isValidAutomergeUrl, Repo } from '@automerge/automerge-repo'
import { IndexedDBStorageAdapter } from '@automerge/automerge-repo-storage-indexeddb'
import { BroadcastChannelNetworkAdapter } from '@automerge/automerge-repo-network-broadcastchannel' // broadcast in browser, across tabs for example
import './App.css'

// const LOCAL_STORAGE_INDEX = 'xyz.noshdelivery.cart:indexUrl'
const INDEX_DB_NAME = 'xyz.noshdelivery.cart'

const repo = new Repo({
  storage: new IndexedDBStorageAdapter(INDEX_DB_NAME),
  network: [new BroadcastChannelNetworkAdapter()],
})

interface CartDoc {
  text: string
}

function App() {
  const [text, setText] = useState('')
  const [doc, setDoc] = useState<DocHandle<CartDoc> | null>(null)
  useEffect(() => {
    const cartUrl = localStorage.getItem('xyz.noshdelivery.cart:cartUrl')
    let cartHandle

    if (isValidAutomergeUrl(cartUrl)) {
      cartHandle = repo.find<CartDoc>(cartUrl)
    } else {
      // create a new index doc
      cartHandle = repo.create<CartDoc>({
        text: 'Hello',
      })
      localStorage.setItem('xyz.noshdelivery.cart:cartUrl', cartHandle.url)
    }

    cartHandle.on('change', ({ doc }: { doc: CartDoc }) => {
      console.log('new text is ', doc.text)
      setText(doc.text)
    })
    setDoc(cartHandle || null)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
    doc?.change((d) => {
      d.text = e.target.value
    })
  }

  return (
    <>
      <input type="text" value={text} onChange={handleChange} />
      <p>{text}</p>
    </>
  )
}

export default App
