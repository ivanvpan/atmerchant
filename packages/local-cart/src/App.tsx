import './App.css'
import CartView from './views/CartView'
import MerchantView from './views/MerchantView'
import { CartProvider } from './context/CartContext'

function App() {
  return (
    <CartProvider>
      <CartView />
      <MerchantView />
    </CartProvider>
  )
}

export default App
