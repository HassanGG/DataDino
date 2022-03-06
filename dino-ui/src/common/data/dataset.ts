export interface Dataset {
  id: string
  name: string
  description?: string
  datapointPrice: number
  datapointCount: number
  uploadedAt: string
  archived: boolean
}
