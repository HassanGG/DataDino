import { fetchJson } from "common/utils/fetch-json"
import { DatasetMeta } from "common/data/dataset"

const baseUrl = "http://localhost:3000/dino-backend/datasets"

export const DatasetService = new (class {
  async getAll(): Promise<DatasetMeta[]> {
    return fetchJson(baseUrl)
  }

  async get({ id }: { id: string }): Promise<DatasetMeta> {
    return fetchJson(`${baseUrl}/${id}`)
  }

  async post({
    name,
    description,
    datapointPrice,
    uploadedAt,
    archived,
    file,
  }: {
    name: string
    description?: string
    datapointPrice: number
    uploadedAt: number
    archived?: boolean
    file: Blob
  }): Promise<string | undefined> {
    const body = JSON.stringify({
      name,
      description,
      datapointPrice,
      uploadedAt,
      archived,
      file,
    })
    const init: RequestInit = {
      method: "post",
      body,
    }

    return fetchJson(baseUrl, init)
  }

  async patch({
    id,
    name,
    description,
    datapointPrice,
    file,
  }: {
    id: string
    name?: string
    description?: string
    datapointPrice?: number
    file?: Blob
  }): Promise<void> {
    const body = JSON.stringify({
      name,
      description,
      datapointPrice,
      file,
    })
    const init: RequestInit = {
      method: "patch",
      body,
    }

    return fetchJson(`${baseUrl}/${id}`, init)
  }

  async getDatapoints({
    id,
    datapointCount,
  }: {
    id: string
    datapointCount: number
  }): Promise<number[]> {
    return fetchJson(`${baseUrl}/${id}/data?datapointCount=${datapointCount}`)
  }
})()
