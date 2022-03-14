import { createContext, useEffect } from "react"
import { User } from "common/data/user"
import { useLocalStorage, useSessionStorage } from "react-use-storage"
import { Cart } from "common/data/order"

const USER_KEY = "dino-ui-session-storage-user-data"
const GUEST_CART_KEY = "dino-ui-guest-user-key"

interface UserContext {
  user: User | null
  setUser: (u: User | null) => void
  cart: Cart
  setCart: (cart: Cart) => void
}

export const UserContext = createContext<UserContext>({} as any)

export const UserContextProvider = (props: any) => {
  const [user, setUser] = useSessionStorage<User | null>(USER_KEY)
  const [guestCart, setGuestCart] = useLocalStorage<Cart>(GUEST_CART_KEY, [])
  const [userCart, setUserCart] = useLocalStorage<Cart>(
    user?.id ?? GUEST_CART_KEY,
    [],
  )

  const cart = user === null ? guestCart : userCart
  const setCart = user === null ? setGuestCart : setUserCart

  useEffect(() => {
    // A user has just signed in; migrate cart from guest.
    if (user !== null) {
      if (Boolean(guestCart.length)) setCart(guestCart)
      setGuestCart([])
    }
  }, [user])

  return (
    <UserContext.Provider value={{ user, setUser, cart, setCart }}>
      {props.children}
    </UserContext.Provider>
  )
}
