import Page from "common/components/page"
import { DatasetService } from "common/services/dataset.service"
import QueriesComponent from "common/components/queries-component"

import { DatasetMeta } from "common/data/dataset"
import DatasetCard from "common/components/dataset-card"
import { useContext } from "react"
import { useQueries } from "react-query"
import { useNavigate } from "react-router-dom"
import { UserContext } from "common/contexts/user.context"

export const CartPage = () => {
  const navigate = useNavigate()
  const { cart, setCart } = useContext(UserContext)
  const datasetQueries = useQueries(
    cart.map(({ datasetId }) => {
      return {
        queryKey: ["dataset", datasetId],
        queryFn: () => DatasetService.get({ id: datasetId }),
      }
    }),
  )

  const updateCart = (
    { id: datasetId }: DatasetMeta,
    datapointCount: number,
  ) => {
    const newCart = cart.map(item =>
      item.datasetId === datasetId
        ? {
            datasetId,
            datapointCount,
          }
        : item,
    )

    setCart(newCart)
  }

  const removeFromCart = ({ id }: DatasetMeta) => {
    const newCart = cart.filter(item => item.datasetId !== id)
    setCart(newCart)
  }

  const onData = (datasets: DatasetMeta[]) => {
    const cartRows = datasets.map(dataset => {
      const cartItem = cart.find(({ datasetId }) => datasetId === dataset.id)
      if (!cartItem)
        return <div>Could not find cart item with dataset ID: {dataset.id}</div>

      const price = (cartItem.datapointCount * dataset.datapointPrice).toFixed(
        2,
      )

      return (
        <>
          <div className="d-flex gap-5">
            <DatasetCard dataset={dataset} />
            <div className="d-flex flex-column gap-2 w-25">
              <small className="h6 text-muted">Selected datapoints:</small>
              <div className="h3">{cartItem.datapointCount}</div>
              <input
                type="range"
                className="form-range"
                min="1"
                max={dataset.datapointCount}
                defaultValue={cartItem.datapointCount}
                onInputCapture={e =>
                  updateCart(dataset, (e.target as any).value)
                }
              ></input>
              <button
                type="button"
                className="btn btn-dark width-min-content"
                onClick={() => removeFromCart(dataset)}
              >
                Remove
              </button>
            </div>
            <div>
              <small className="h6 text-muted">Price:</small>
              <div className="h3">${price}</div>
            </div>
          </div>
        </>
      )
    })

    const totalPrice = datasets
      .reduce((acc, { id, datapointPrice }) => {
        const cartItem = cart.find(({ datasetId }) => datasetId === id)
        const datapointCount = cartItem?.datapointCount ?? 0
        return acc + datapointCount * datapointPrice
      }, 0)
      .toFixed(2)

    const toCheckout = () => navigate("/datasets/checkout")

    return (
      <>
        {cartRows}
        <div className="d-flex gap-4 border-top pt-3 mb-5 mt-2">
          <div style={{ width: "340px" }} />
          <div className="d-flex flex-column gap-2 w-25" />
          <div className="d-flex flex-column flex-grow-1 ms-5 me-5">
            <small className="h6 text-muted">Total:</small>
            <div className="h2">${totalPrice}</div>
            <button
              type="button"
              className="btn btn-dark mt-2"
              onClick={toCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Page showBar>
        <div className="mb-5">
          {datasetQueries?.length === 0 ? (
            <div className="h3">Your cart is empty!</div>
          ) : (
            <QueriesComponent queries={datasetQueries} onData={onData} />
          )}
        </div>
      </Page>
    </>
  )
}
