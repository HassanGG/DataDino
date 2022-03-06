import { fetchJson } from "common/utils/fetch-json"
import { Dataset } from "common/data/dataset"

const baseUrl = "http://localhost:3000/datasets"

export const DatasetService = new (class {
  async getAll(): Promise<Dataset[]> {
    return await fetchJson(baseUrl)
  }

  async get({ id }: { id: string }): Promise<Dataset | undefined> {
    return await fetchJson(`${baseUrl}/${id}`)
  }

  async post({
    name,
    description,
    datapointPrice,
    datapointCount,
  }: {
    name: string
    description?: string
    datapointPrice: number
    datapointCount: number
  }): Promise<string | undefined> {
    const body = JSON.stringify({
      name,
      description,
      datapointPrice,
      datapointCount,
    })
    const init: RequestInit = {
      method: "post",
      body,
    }

    return await fetchJson(baseUrl, init)
  }

  async patch({
    id,
    name,
    description,
    datapointPrice,
    datapointCount,
  }: {
    id: string
    name?: string
    description?: string
    datapointPrice?: number
    datapointCount?: number
  }): Promise<void> {
    const body = JSON.stringify({
      name,
      description,
      datapointPrice,
      datapointCount,
    })
    const init: RequestInit = {
      method: "patch",
      body,
    }

    await fetchJson(`${baseUrl}/${id}`, init)
  }
})()
