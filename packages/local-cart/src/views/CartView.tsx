import { useCart } from '../context/CartContext'

function CartView() {
  const { cart, removeItem, updateQuantity } = useCart()

  return (
    <div>
      <h2>Cart</h2>
      {cart.cartItems.map((item) => (
        <div key={item.itemId}>
          <span>{item.itemId}</span>
          <span>${item.quantity}</span>
          <input
            type="number"
            value={item.quantity}
            onChange={(e) => updateQuantity(item.itemId, parseInt(e.target.value))}
            min="1"
          />
          <button onClick={() => removeItem(item.itemId)}>Remove</button>
        </div>
      ))}
      {cart.cartItems.length === 0 && <p>Your cart is empty</p>}
    </div>
  )
}

export default CartView
