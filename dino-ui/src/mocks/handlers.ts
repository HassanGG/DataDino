import { Order, OrderItem, OrderState } from "common/data/order"
import { User } from "common/data/user"
import { rest } from "msw"
import { generateDataset } from "./generate-data"

const delay = Math.floor(Math.random() * 400) + 200

const datasets = Object.fromEntries(
  Array.from(Array(100)).map(() => {
    const dataset = generateDataset()
    return [dataset.id, dataset]
  }),
)

type FullUser = User & { password: string }

const orders: { [key: string]: Order } = {}
const users: { [key: string]: FullUser } = {
  "1234567890": {
    id: "1234567890",
    isOwner: true,
    displayName: "OWNER BITCH",
    email: "admin@gmail.com",
    password: "admin",
  },
  "0987654321": {
    id: "0987654321",
    isOwner: false,
    displayName: "bah",
    email: "test@gmail.com",
    password: "test",
  },
}

interface SignUpReq {
  email: string
  password: string
}

interface OrderPostReq {
  customerId: string
  items: OrderItem[]
  total: number
  purchasedAt: number
}

export const handlers = [
  rest.get("/dino-backend/", (_, res, ctx) => {
    return res(ctx.status(200))
  }),

  // Datasets

  rest.get("/dino-backend/datasets", (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(delay),
      ctx.json(Object.values(datasets)),
    )
  }),

  rest.get("/dino-backend/datasets/:id", (req, res, ctx) => {
    const id =
      typeof req.params.id == "string" ? req.params.id : req.params.id[0]
    const dataset = datasets[id]

    return res(ctx.status(200), ctx.delay(delay), ctx.json(dataset))
  }),

  // Orders

  rest.get("/dino-backend/orders", (req, res, ctx) => {
    const _customerId = req.url.searchParams.get("customerId")

    if (_customerId) {
      const _orders = Object.fromEntries(
        Object.entries(orders).filter(
          ([, { customerId }]) => customerId === _customerId,
        ),
      )

      return res(
        ctx.status(200),
        ctx.delay(delay),
        ctx.json(Object.values(_orders)),
      )
    }

    return res(
      ctx.status(200),
      ctx.delay(delay),
      ctx.json(Object.values(orders)),
    )
  }),

  rest.get("/dino-backend/orders/:id", (req, res, ctx) => {
    const id =
      typeof req.params.id == "string" ? req.params.id : req.params.id[0]
    const order = orders[id]

    return res(ctx.status(200), ctx.delay(delay), ctx.json(order))
  }),

  rest.post<OrderPostReq>("/dino-backend/orders", (req, res, ctx) => {
    const order: Order = {
      id: Math.random().toString(36).substring(2, 9),
      customerId: req.body.customerId,
      state: OrderState.New,
      items: req.body.items,
      total: req.body.total,
      purchasedAt: req.body.purchasedAt,
    }

    orders[order.id] = order

    return res(ctx.status(200), ctx.delay(delay), ctx.json(order.id))
  }),

  // Users

  rest.get("/dino-backend/users/login", (req, res, ctx) => {
    const _email = req.url.searchParams.get("email")
    const _password = req.url.searchParams.get("password")

    const _userEntry = Object.entries(users).find(
      ([, { email, password }]) => email === _email && password === _password,
    )

    if (!_userEntry)
      return res(ctx.status(404), ctx.delay(delay), ctx.json("No user found"))

    const [, _user] = _userEntry

    return res(ctx.status(200), ctx.delay(delay), ctx.json(_user))
  }),

  rest.post<SignUpReq>("/dino-backend/users", (req, res, ctx) => {
    const user: FullUser = {
      displayName: "This user",
      id: Math.random().toString(36).substring(2, 9),
      isOwner: false,
      email: req.body.email,
      password: req.body.password,
    }

    users[user.id] = user

    return res(ctx.status(200), ctx.delay(delay), ctx.json(user.id))
  }),
]
