import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      
      addToCart: (product) => {
        const { cart } = get()
        const existingItem = cart.find(item => item.id === product.id)
        
        if (existingItem) {
          set({
            cart: cart.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          })
        } else {
          set({
            cart: [...cart, { ...product, quantity: 1 }],
          })
        }
      },
      
      removeFromCart: (productId) => {
        const { cart } = get()
        set({
          cart: cart.filter(item => item.id !== productId),
        })
      },
      
      updateQuantity: (productId, quantity) => {
        const { cart } = get()
        if (quantity <= 0) {
          set({
            cart: cart.filter(item => item.id !== productId),
          })
        } else {
          set({
            cart: cart.map(item =>
              item.id === productId ? { ...item, quantity } : item
            ),
          })
        }
      },
      
      clearCart: () => {
        set({ cart: [] })
      },
      
      getCartTotal: () => {
        const { cart } = get()
        return cart.reduce((total, item) => total + item.price * item.quantity, 0)
      },
      
      getCartCount: () => {
        const { cart } = get()
        return cart.reduce((count, item) => count + item.quantity, 0)
      },
    }),
    {
      name: 'beauty-brush-cart',
    }
  )
)
