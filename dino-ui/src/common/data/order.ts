export interface Order {
  id: string;
  customerId: string;
  state: OrderState;
  items: OrderItem[];
  total: number;
  purchasedAt: string;
}

export interface OrderItem {
  datasetId: string;
  datapointCount: number;
}

export enum OrderState {
  Complete = "Complete",
  Error = "Error",
  Refunded = "Refunded",
}
