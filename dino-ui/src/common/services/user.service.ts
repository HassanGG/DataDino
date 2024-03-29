import { User } from "common/data/user"
import { fetchJson } from "common/utils/fetch-json"

const baseUrl = "http://localhost:8080/dino-backend/users"

export const UserService = new (class {
  async signUp({
    displayName,
    email,
    password,
  }: {
    displayName?: string
    email: string
    password: string
  }): Promise<string | undefined> {
    const body = JSON.stringify({
      displayName,
      email,
      password,
    })
    const init: RequestInit = {
      method: "POST",
      body,
    }
    return fetchJson(baseUrl, init, true)
  }

  async login({
    email,
    password,
  }: {
    email: string
    password: string
  }): Promise<User | undefined> {
    return fetchJson(`${baseUrl}/login?email=${email}&password=${password}`)
  }
})()
