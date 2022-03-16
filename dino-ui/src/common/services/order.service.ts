import { fetchJson } from "common/utils/fetch-json"
import { Order, OrderItem, OrderState } from "common/data/order"

const baseUrl = "http://localhost:8080/dino-backend/orders"

export const OrderService = new (class {
  async getAll({ userId }: { userId?: string }): Promise<Order[]> {
    const url = baseUrl + (userId ? `?userId=${userId}` : "")
    return fetchJson(url)
  }

  async get({ id }: { id: string }): Promise<Order> {
    return fetchJson(`${baseUrl}/${id}`)
  }

  async post({
    userId,
    items,
    total,
    purchasedAt,
  }: {
    userId: string
    items: OrderItem[]
    total: number
    purchasedAt: number
  }): Promise<string | undefined> {
    const body = JSON.stringify({
      userId,
      items,
      total,
      purchasedAt,
    })
    const init: RequestInit = {
      method: "POST",
      body,
    }

    return fetchJson(baseUrl, init, true)
  }

  async patch({ id, state }: { id: string; state: OrderState }): Promise<void> {
    const body = JSON.stringify({
      state,
    })
    const init: RequestInit = {
      method: "PATCH",
      body,
    }

    return fetchJson(`${baseUrl}/${id}`, init)
  }
})()
