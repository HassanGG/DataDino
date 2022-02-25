export interface Order {
  id: String
  customerId: String
  state: OrderState
  items: OrderItem[]
  total: number
  purchasedAt: number
}

export interface OrderItem {
  datasetId: String
  datapointCount: number
}

export enum OrderState {
  Pending = "Pending",
  Complete = "Complete",
  Cancelled = "Cancelled",
  Error = "Error",
}