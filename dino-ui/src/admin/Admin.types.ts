export interface CreateDatasetForm {
  name: string
  datapointPrice: number
  archived: boolean
  description?: string
  file?: File
}
