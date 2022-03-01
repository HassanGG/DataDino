import { OrderItem } from "./order"

export interface User {
  id: String
  token: String
  displayName?: String
  email: String
  isOwner: boolean
  cart?: OrderItem[]
}
