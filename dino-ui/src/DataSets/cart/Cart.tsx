import Page from "common/components/page"
import { DatasetService } from "common/services/dataset.service"
import QueryComponent from "common/components/query-component"
import { CartContext } from "common/contexts/cart.context"
import { DatasetMeta } from "common/data/dataset"
import DatasetCard from "common/components/dataset-card"
import { useStyle } from "common/utils/css"
import { useContext } from "react"
import { useQueries } from "react-query"

export const CartPage = () => {
  const { cart, setCart } = useContext(CartContext)
  const datasetQueries = useQueries(
    (cart ?? []).map(({ datasetId }) => {
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
    const newCart = (cart ?? []).map(item =>
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
    const newCart = (cart ?? []).filter(item => item.datasetId !== id)
    setCart(newCart)
  }

  const alreadyInCart = ({ id }: DatasetMeta) =>
    Boolean(cart?.find(item => item.datasetId === id))

  const onData = (dataset: DatasetMeta) => {
    const cartItem = cart?.find(({ datasetId }) => datasetId === dataset.id)
    if (!cartItem)
      return <div>Could not find cart item with dataset ID: {dataset.id}</div>

    return (
      <>
        <div className="d-flex gap-4">
          <DatasetCard dataset={dataset} />
          <div className="d-flex flex-column gap-2 w-25">
            <h4 className="mt-5">
              Selected datapoints:
              <small className="text-muted ms-2">
                {cartItem.datapointCount}
              </small>
            </h4>
            <input
              type="range"
              className="form-range"
              min="1"
              max={dataset.datapointCount}
              defaultValue={cartItem.datapointCount}
              onInputCapture={e => updateCart(dataset, (e.target as any).value)}
            ></input>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => removeFromCart(dataset)}
            >
              Remove from cart
            </button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Page showBar>
        <div>
          {datasetQueries?.length === 0 ? (
            <div className="h3">Your cart is empty!</div>
          ) : (
            datasetQueries.map(query => (
              <QueryComponent query={query} onData={onData} />
            ))
          )}
        </div>
      </Page>
    </>
  )
}
