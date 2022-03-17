import Page from "common/components/page"
import QueryComponent from "common/components/query-component"
import { UserContext } from "common/contexts/user.context"
import { Order, OrderState } from "common/data/order"
import { OrderService } from "common/services/order.service"
import { useContext, useState } from "react"
import { useQuery } from "react-query"
import { useNavigate } from "react-router-dom"
import moment from "moment"
import { DatasetService } from "common/services/dataset.service"
import { Field, Form, Formik, useFormikContext } from "formik"
import { CreateDatasetForm } from "./Admin.types"
import Loading from "common/components/loading"
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  Label,
} from "recharts"

const FileField = () => {
  const { setFieldValue } = useFormikContext()

  return (
    <div className="w-50">
      <input
        className="form-control"
        type="file"
        accept=".csv"
        onChange={(event: any) => {
          const file = event.currentTarget.files[0]
          setFieldValue("file", file)
        }}
        required
      />
      <small className="text-muted">
        Files must consist of comma-delimited integers.
      </small>
    </div>
  )
}

export const AdminPage = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const { setUser } = useContext(UserContext)
  const query = useQuery(["order"], () => {
    return OrderService.getAll({})
  })

  const signOut = () => {
    setUser(null)
    navigate("/")
  }

  const updateOrderState = async (orderId: string, state: OrderState) => {
    await OrderService.patch({ id: orderId, state })
    query.refetch()
  }

  // We need both the orders and datasets for the rest of the
  // components on the page!
  const onOrdersData = (orders: Order[]) => {
    const orderRows = orders
      .sort((a, b) => b.purchasedAt - a.purchasedAt)
      .map((order, index) => {
        const prettyPurchasedAt = moment(new Date(order.purchasedAt)).format(
          "DD/MM/YYYY",
        )
        const prettyTotal = "$" + order.total.toFixed(2)

        return (
          <>
            <tr className="table-light">
              <th scope="row">{index + 1}</th>
              <td>{order.state}</td>
              <td>{prettyPurchasedAt}</td>
              <td>{prettyTotal}</td>
            </tr>
            {order.state === OrderState.New && (
              <tr>
                <td colSpan={4}>
                  <table className="table table-borderless table-sm mb-0 caption-top">
                    <caption>
                      Click the buttons below to either deliver or cancel this
                      order:
                    </caption>
                    <div className="d-flex gap-2 mb-2">
                      <div
                        className="btn btn-dark"
                        onClick={() =>
                          updateOrderState(order.id, OrderState.Delivered)
                        }
                      >
                        Deliver
                      </div>
                      <div
                        className="btn btn-outline-danger"
                        onClick={() =>
                          updateOrderState(order.id, OrderState.Cancelled)
                        }
                      >
                        Cancel
                      </div>
                    </div>
                  </table>
                </td>
              </tr>
            )}
          </>
        )
      })

    const initialValues: CreateDatasetForm = {
      name: "",
      datapointPrice: 0,
      archived: false,
      description: "",
    }

    const onSubmit = async (values: CreateDatasetForm) => {
      setIsLoading(true)
      const { file, name, datapointPrice, archived, description } = values
      if (!file) throw "File was not provided"

      const datasetId = await DatasetService.post({
        file,
        name,
        datapointPrice,
        archived,
        description,
        uploadedAt: Date.now(),
      })

      if (datasetId) {
        navigate("/datasets")
      }

      setIsLoading(false)
    }

    const graphData = orders
      .map(order => {
        return {
          date: order.purchasedAt,
          price: order.total,
        }
      })
      .sort((a, b) => a.date - b.date)

    return (
      <>
        <div className="h4 mt-3">Manage Orders</div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Status</th>
              <th scope="col">Purchased At</th>
              <th scope="col">Total Price</th>
            </tr>
          </thead>
          <tbody>{orderRows}</tbody>
        </table>

        <div className="h4 mt-3">Create Dataset</div>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          <Form className="d-flex flex-column align-items-start gap-3">
            <div className="d-flex gap-2">
              <Field
                className="form-control"
                name="name"
                placeholder="Name"
                required
              />
              <Field
                className="form-control"
                name="datapointPrice"
                type="number"
                placeholder="Datapoint price"
                required
              />
              <div className="d-flex align-items-center">
                <div className="p fw-bold mb-1 me-2">Archived: </div>
                <Field name="archived" id="archivedCheckbox" type="checkbox" />
              </div>
            </div>
            <Field
              className="form-control"
              component="textarea"
              rows={2}
              name="description"
              placeholder="Description (Optional)"
            />
            <FileField />

            {isLoading ? (
              <div className="fs-6">
                <Loading />
              </div>
            ) : (
              <button className="btn btn-dark mt-3" type="submit">
                Create
              </button>
            )}
          </Form>
        </Formik>

        <div className="h4 mt-3">Sales</div>
        <LineChart
          width={800}
          height={400}
          data={graphData}
          margin={{ left: 12 }}
        >
          <Line dataKey="price" fill="#3FBF3F" />
          <CartesianGrid stroke="#ccc" />
          <XAxis
            dataKey="date"
            tickFormatter={tick => moment(new Date(tick)).format("DD/MM/YYYY")}
          />

          <YAxis tickFormatter={tick => `$${tick}`}>
            <Label value="Price" position="insideTopLeft" offset={90} />
          </YAxis>
          <Tooltip />
        </LineChart>
      </>
    )
  }

  return (
    <Page showBar>
      <div className="h1 mb-0">Admin</div>
      <div>
        <button type="button" className="btn btn-dark" onClick={signOut}>
          Sign out
        </button>
      </div>
      <QueryComponent query={query} onData={onOrdersData} />
    </Page>
  )
}
