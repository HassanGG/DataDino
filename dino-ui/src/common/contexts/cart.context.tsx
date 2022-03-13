import { createContext } from "react"
import { UserContext } from "common/contexts/user.context"
import { Cart } from "common/data/order"
import { useContext } from "react"
import { useLocalStorage } from "react-use-storage"

interface CartContext {
  cart: Cart | undefined
  setCart: (cart: Cart) => void
}

export const CartContext = createContext<CartContext>({} as any)

export const CartContextProvider = (props: any) => {
  const { user } = useContext(UserContext)
  const key = user?.id ?? "dino-ui-guest-user-key"
  const [cart, setCart] = useLocalStorage<Cart>(key, [])

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {props.children}
    </CartContext.Provider>
  )
}
