import { rest } from "msw"
import datasetJson from "./mock-data/dataset.json"

const delay = Math.floor(Math.random() * 800) + 200

var datasets = Object.fromEntries(
  datasetJson.map(dataset => [dataset.id, dataset])
)

export const handlers = [
  rest.get("/", (_, res, ctx) => {
    return res(ctx.status(200))
  }),

  // Datasets

  rest.get("/datasets", (_, res, ctx) => {
    return res(ctx.status(200), ctx.delay(delay), ctx.json(datasetJson))
  }),

  rest.get("/datasets/:id", (req, res, ctx) => {
    const id =
      typeof req.params.id == "string" ? req.params.id : req.params.id[0]
    const dataset = datasets[id]

    return res(ctx.status(200), ctx.delay(delay), ctx.json(dataset))
  }),

  // Orders

  // ...
]
