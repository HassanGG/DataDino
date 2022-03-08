import { OrderItem } from "./order"

export interface User {
  id: string
  displayName?: string
  email: string
  isOwner: boolean
  cart?: OrderItem[]
}
