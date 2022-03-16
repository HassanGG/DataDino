import { fetchJson } from "common/utils/fetch-json"
import { DatasetMeta } from "common/data/dataset"
import { fileToBase64 } from "./helpers"

const baseUrl = "http://localhost:8080/dino-backend/datasets"

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
    file: File
  }): Promise<string | undefined> {
    const encodedFile = await fileToBase64(file)

    const body = JSON.stringify({
      name,
      description,
      datapointPrice,
      uploadedAt,
      archived,
      file: encodedFile,
    })

    const init: RequestInit = {
      method: "POST",
      body,
    }

    return fetchJson(baseUrl, init, true)
  }

  async patch({
    id,
    name,
    description,
    datapointPrice,
    archived,
    file,
  }: {
    id: string
    name?: string
    description?: string
    datapointPrice?: number
    archived?: boolean
    file?: File
  }): Promise<void> {
    const body = JSON.stringify({
      name,
      description,
      datapointPrice,
      archived,
      file,
    })
    const init: RequestInit = {
      method: "PATCH",
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
