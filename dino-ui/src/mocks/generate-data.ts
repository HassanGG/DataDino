import { faker } from "@faker-js/faker"
import { DatasetMeta } from "common/data/dataset"
import { Order, OrderState } from "common/data/order"

export const generateDataset = (): DatasetMeta => {
  const min = faker.datatype.number({ min: 10, max: 400 })
  const max = faker.datatype.number({ min, max: 500 })

  return {
    id: faker.datatype.uuid(),
    name: faker.company.bsNoun(),
    description: faker.lorem.sentences(4),
    datapointPrice: faker.datatype.float({ min: 1, max: 100, precision: 0.01 }),
    datapointCount: faker.datatype.number({ min: 40, max: 1000 }),
    datapointMax: max,
    datapointMin: min,
    uploadedAt: faker.time.recent() as number,
    archived: faker.datatype.boolean(),
  }
}

// All orders generated are for the test account
export const generateOrder = (datasetIds: string[]): Order => {
  return {
    id: faker.datatype.uuid(),
    customerId: "0987654321",
    state: faker.random.arrayElement(Object.values(OrderState)),
    total: faker.datatype.number({ min: 10, max: 100000, precision: 0.01 }),
    purchasedAt: faker.time.recent() as number,
    items: Array.from(Array(faker.datatype.number({ min: 1, max: 5 }))).map(
      () => {
        return {
          datasetId: faker.random.arrayElement(datasetIds),
          datapointCount: faker.datatype.number({ min: 1, max: 40 }),
        }
      },
    ),
  }
}
