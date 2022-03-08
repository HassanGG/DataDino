import { OrderItem } from "common/data/order"
import { User } from "common/data/user"
import { fetchJson } from "common/utils/fetch-json"

const baseUrl = "dino-backend"

export const UserService = new (class {
  async signUp({
  displayName,
  email,
  password,
  cartItem,
  }: {
    displayName?: string
    email: string
    password: string
    cartItem: OrderItem[]
  }): Promise<string | undefined> {
    const body = JSON.stringify({
      displayName,
      email,
      password,
      cartItem
    })
    const init: RequestInit = {
      method: "post",
      body,
    }
    return fetchJson(`${baseUrl}/users`, init)
  }

  async login({
    email,
    password
  }: {
    email: string,
    password: string
  }): Promise<User | undefined> {
    const body = JSON.stringify({
      email,
      password
    })
    const init: RequestInit = {
      method: "post",
      body,
    }
    return fetchJson(`${baseUrl}/login`, init)
  }

})()