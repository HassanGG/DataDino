export interface Order {
  id: String
  customerId: String
  state: OrderState
  items: OrderItem[]
  total: number
  purchasedAt: String
}

export interface OrderItem {
  datasetId: String
  datapointCount: number
}

export enum OrderState {
  Complete = "Complete",
  Error = "Error",
  Refunded = "Refunded",
}