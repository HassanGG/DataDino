export interface DatasetMeta {
  id: string
  name: string
  description?: string
  datapointPrice: number
  datapointCount: number
  datapointMax: number
  datapointMin: number
  uploadedAt: string
  archived: boolean
}
