import { OrderItem } from "./order"

export interface User {
  id: String
  token: String
  displayName?: String
  email: String
}

export interface Customer extends User {
  cart: OrderItem[]
}

export interface Owner extends User {}
