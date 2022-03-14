import { fetchJson } from "common/utils/fetch-json"
import { Order, OrderItem, OrderState } from "common/data/order"

const baseUrl = "http://localhost:3000/dino-backend/orders"

export const OrderService = new (class {
  async getAll({ customerId }: { customerId?: string }): Promise<Order[]> {
    const url = baseUrl + (customerId ? `?customerId=${customerId}` : "")
    return fetchJson(url)
  }

  async get({ id }: { id: string }): Promise<Order> {
    return fetchJson(`${baseUrl}/${id}`)
  }

  async post({
    customerId,
    items,
    total,
    purchasedAt,
  }: {
    customerId: string
    items: OrderItem[]
    total: number
    purchasedAt: number
  }): Promise<string | undefined> {
    const body = JSON.stringify({
      customerId,
      items,
      total,
      purchasedAt,
    })
    const init: RequestInit = {
      method: "post",
      body,
    }

    return fetchJson(baseUrl, init)
  }

  async patch({ id, state }: { id: string; state: OrderState }): Promise<void> {
    const body = JSON.stringify({
      state,
    })
    const init: RequestInit = {
      method: "patch",
      body,
    }

    return fetchJson(`${baseUrl}/${id}`, init)
  }
})()
