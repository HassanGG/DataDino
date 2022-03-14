import Page from "common/components/page"
import { DatasetService } from "common/services/dataset.service"
import { useQuery } from "react-query"
import QueryComponent from "common/components/query-component"
import { DatasetMeta } from "common/data/dataset"
import { useParams } from "react-router-dom"
import { format } from "timeago.js"
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Label,
} from "recharts"
import aveta from "aveta"
import { useState, useContext } from "react"
import { UserContext } from "common/contexts/user.context"

export const DatasetPage = () => {
  const { datasetId } = useParams() as { datasetId: string }
  const { cart, setCart } = useContext(UserContext)
  const cartItem = cart.find(item => item.datasetId === datasetId)
  const alreadyInCart = Boolean(cartItem)
  const [datapointCount, setDatapointCount] = useState(
    cartItem ? cartItem.datapointCount : 1,
  )

  const query = useQuery(["dataset", datasetId], () =>
    DatasetService.get({ id: datasetId }),
  )

  const onData = (dataset: DatasetMeta) => {
    const graphData = Array.from(Array(11).keys()).map(base => {
      const percentage = base / 10
      const quantity = Math.round(dataset.datapointCount * percentage)
      const price = Math.round(dataset.datapointPrice * quantity)

      return {
        percentage,
        price,
      }
    })

    const addToCart = () => {
      const newCart = [
        ...cart,
        {
          datasetId,
          datapointCount,
        },
      ]

      setCart(newCart)
    }

    const updateCart = (datapointCount: number) => {
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

    const removeFromCart = () => {
      const newCart = cart.filter(item => item.datasetId !== datasetId)
      setCart(newCart)
    }

    return (
      <>
        <div className="row g-0">
          <div className="col-md-7 card-body">
            <h1 className="card-title">{dataset.name}</h1>
            <p className="card-text">
              <small className="text-muted">
                Uploaded {format(dataset.uploadedAt)}
              </small>
            </p>
            <p className="card-text mt-4 mb-5">{dataset.description}</p>
            <small className="h6 text-muted">
              How many datapoints would you like?
            </small>
            <div className="h3">{datapointCount}</div>
            <input
              type="range"
              className="form-range"
              min="1"
              max={dataset.datapointCount}
              defaultValue={datapointCount}
              onInputCapture={e => {
                const value = (e.target as any).value
                setDatapointCount(value)
                updateCart(value)
              }}
            ></input>
            {alreadyInCart ? (
              <button
                type="button"
                className="btn btn-dark"
                onClick={removeFromCart}
              >
                Remove
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-dark"
                onClick={addToCart}
              >
                Add to cart
              </button>
            )}
          </div>
          <div className="col-md-5 card-body ml-4">
            <BarChart width={350} height={400} data={graphData}>
              <Bar dataKey="price" fill="#3FBF3F" />
              <CartesianGrid stroke="#ccc" />
              <XAxis
                dataKey="percentage"
                tickFormatter={tick => `${tick * 100}%`}
              >
                <Label
                  value="% Datapoints"
                  position="insideBottom"
                  offset={60}
                />
              </XAxis>
              <YAxis tickFormatter={tick => `$${aveta(tick)}`}>
                <Label value="Price" position="insideTopLeft" offset={90} />
              </YAxis>
              <Tooltip />
            </BarChart>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Page showBar>
        <QueryComponent query={query} onData={onData} />
      </Page>
    </>
  )
}
