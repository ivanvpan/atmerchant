import { Catalogs } from '../tools/catalog'
import { useCart } from '../context/CartContext'
import { useCatalog } from '../tools/useCatalog'

function CollectionView({ collectionId, catalogs }: { collectionId: string; catalogs: Catalogs }) {
  const collection = catalogs.collections[collectionId]
  return (
    <div>
      <h3>{collection.name}</h3>
      {collection.items?.map((itemId) => {
        const item = catalogs.items[itemId]
        if (!item) {
          return `Missing item ${itemId}`
        }
        return <ItemView key={itemId} itemId={itemId} catalogs={catalogs} />
      })}
    </div>
  )
}

function ItemView({ itemId, catalogs }: { itemId: string; catalogs: Catalogs }) {
  const item = catalogs.items[itemId]
  const { addItem } = useCart()

  const handleAddToCart = () => {
    addItem({
      id: item.id,
      itemId: item.id,
      quantity: 1,
      modifierGroups: [],
    })
  }

  return (
    <div>
      {item.name}: ${item.priceMoney.amount}
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  )
}

function CatalogView({ catalogId, catalogs }: { catalogId: string; catalogs: Catalogs }) {
  const catalog = catalogs.catalogs[catalogId]
  return (
    <div>
      <h2>{catalog.name}</h2>
      {Object.keys(catalog.collections).map((collectionId) => (
        <CollectionView key={collectionId} collectionId={collectionId} catalogs={catalogs} />
      ))}
    </div>
  )
}

function MerchantView() {
  const { catalogs } = useCatalog()
  return (
    <>
      <h3>Catalogs</h3>
      {Object.keys(catalogs.catalogs).map((catalogId) => (
        <div key={catalogId}>
          <CatalogView key={catalogId} catalogId={catalogId} catalogs={catalogs} />
        </div>
      ))}
    </>
  )
}

export default MerchantView
