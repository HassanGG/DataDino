import { rest } from "msw"
import datasetJson from "./mock-data/dataset.json"

const delay = Math.floor(Math.random() * 800) + 200

let datasets = Object.fromEntries(
  datasetJson.map(dataset => [dataset.id, dataset])
)

interface LoginReqType {
  email: string
  password: string
}

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

  // Users

  rest.post<LoginReqType>("/dino-backend/login", (req, res, ctx) => {
    const user = {
      displayName: "This user",
      id:"12349-49314993jfie",
      isOwner:req.body.password === "admin"
    }

    return res(ctx.status(200), ctx.delay(delay), ctx.json(user))
  })
]
