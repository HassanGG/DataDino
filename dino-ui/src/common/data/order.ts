export interface Order {
  id: string
  customerId: string
  state: OrderState
  items: OrderItem[]
  total: number
  purchasedAt: number
}

export interface OrderItem {
  datasetId: string
  datapointCount: number
}

export enum OrderState {
  New = "New",
  Cancelled = "Cancelled",
  Delivered = "Delivered",
}

export type Cart = OrderItem[]
