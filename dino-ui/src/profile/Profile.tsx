import Page from "common/components/page"
import QueryComponent from "common/components/query-component"
import { UserContext } from "common/contexts/user.context"
import { Order, OrderState } from "common/data/order"
import { OrderService } from "common/services/order.service"
import { useContext } from "react"
import { useQuery } from "react-query"
import { useNavigate } from "react-router-dom"
import moment from "moment"
import { DatasetService } from "common/services/dataset.service"
import { DatasetMeta } from "common/data/dataset"

export const ProfilePage = () => {
  const navigate = useNavigate()
  const { user, setUser } = useContext(UserContext)
  const query = useQuery(["order", user?.id], () => {
    if (!user) return Promise.resolve([])
    return OrderService.getAll({ customerId: user.id })
  })
  const datasetsQuery = useQuery("datasets", DatasetService.getAll)

  const signOut = () => {
    setUser(null)
    navigate("/")
  }

  const downloadDatapoints = async (
    datasetId: string,
    datapointCount: number,
  ) => {
    const datapoints = await DatasetService.getDatapoints({
      id: datasetId,
      datapointCount,
    })

    const json = [JSON.stringify(datapoints)]
    const blob = new Blob(json, { type: "text/plain;charset=utf-8" })
    const url = window.URL.createObjectURL(blob)

    const a = document.createElement("a")
    document.body.appendChild(a)
    a.style.setProperty("display", "none")
    a.href = url
    a.download = `data-dino-download__${datasetId}__${datapointCount}.txt`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const onOrdersData = (orders: Order[]) => {
    const orderRows = orders.map((order, index) => {
      const prettyPurchasedAt = moment(new Date(order.purchasedAt)).format(
        "DD/MM/YYYY",
      )
      const prettyTotal = "$" + order.total.toFixed(2)

      const onDatasetsData = (datasets: DatasetMeta[]) => {
        const orderItemRows = order.items.map(orderItem => {
          const dataset = datasets.find(({ id }) => id === orderItem.datasetId)
          if (!dataset) throw "Dataset corresponding to order item not found"

          return (
            <tr>
              <td>{dataset.name}</td>
              <td>{orderItem.datapointCount}</td>
              <td
                className="btn btn-link"
                onClick={() =>
                  downloadDatapoints(dataset.id, orderItem.datapointCount)
                }
              >
                Click me
              </td>
            </tr>
          )
        })

        return <>{orderItemRows}</>
      }

      return (
        <>
          <tr className="table-light">
            <th scope="row">{index + 1}</th>
            <td>{order.state}</td>
            <td>{prettyPurchasedAt}</td>
            <td>{prettyTotal}</td>
          </tr>
          {/* TODO: change this to OrderState.Delivered; this is for testing */}
          {order.state === OrderState.New && (
            <tr>
              <td colSpan={4}>
                <table className="table table-borderless table-sm mb-0 caption-top">
                  <caption>
                    Your order is ready! Click the link(s) below to download
                    your datapoints:
                  </caption>
                  <thead>
                    <tr>
                      <td className="fw-bold">Dataset Name</td>
                      <td className="fw-bold">Datapoint Count</td>
                      <td className="fw-bold">Link</td>
                    </tr>
                  </thead>
                  <tbody>
                    <QueryComponent
                      query={datasetsQuery}
                      onData={onDatasetsData}
                    />
                  </tbody>
                </table>
              </td>
            </tr>
          )}
        </>
      )
    })

    return (
      <>
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
      </>
    )
  }

  return (
    <Page showBar>
      <div className="h1">Profile</div>
      <div className="d-flex gap-5 align-items-start">
        <div className="d-flex flex-column">
          <small className="text-muted">Email</small>
          {user?.email}
          <small className="text-muted mt-3">Display Name</small>
          {user?.displayName ?? "None"}
        </div>
        <button type="button" className="btn btn-dark" onClick={signOut}>
          Sign out
        </button>
      </div>
      <small className="text-muted">Orders</small>
      <QueryComponent query={query} onData={onOrdersData} />
    </Page>
  )
}
