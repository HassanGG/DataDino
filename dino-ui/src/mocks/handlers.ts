import { rest } from "msw"
import datasetJson from "./mock-data/dataset.json"
import { Response } from "common/data/response"

const delay = Math.floor(Math.random() * 800) + 200

export const handlers = [
  rest.get<Response>("/", (req, res, ctx) => {
    return res(ctx.status(200))
  }),

  rest.get<Response>("/datasets", (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(delay), ctx.json(datasetJson))
  }),

  rest.get<Response>("/datasets/:id", (req, res, ctx) => {
    const randomDataset =
      datasetJson[Math.floor(Math.random() * datasetJson.length)]

    const updated = { ...randomDataset, id: req.id }
    return res(ctx.status(200), ctx.delay(delay), ctx.json(updated))
  }),
]
