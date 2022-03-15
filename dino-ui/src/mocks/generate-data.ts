import { faker } from "@faker-js/faker"
import { DatasetMeta } from "common/data/dataset"

export const generateDataset = (): DatasetMeta => {
  const min = faker.datatype.number({ min: 10, max: 400 })
  const max = faker.datatype.number({ min, max: 500 })

  return {
    id: faker.datatype.uuid(),
    name: faker.company.bsNoun(),
    description: faker.lorem.sentences(4),
    datapointPrice: faker.datatype.float({ min: 1, max: 100, precision: 0.01 }),
    datapointCount: faker.datatype.number({ min: 10, max: 1000 }),
    datapointMax: max,
    datapointMin: min,
    uploadedAt: faker.time.recent() as number,
    archived: faker.datatype.boolean(),
  }
}
