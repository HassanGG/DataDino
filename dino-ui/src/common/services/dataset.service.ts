import { Dataset } from "common/data/dataset"

export const DatasetService = class {
  async getAll(): Promise<Dataset[]> {
    return Promise.resolve([])
  }

  async get({ id }: { id: string }): Promise<Dataset | undefined> {
    return Promise.resolve(undefined);
  }
}