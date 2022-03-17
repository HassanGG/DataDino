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
import { Field, Form, Formik } from "formik"
import { EditDatasetForm } from "./Dataset.types"
import Loading from "common/components/loading"

export const DatasetPage = () => {
  const { datasetId } = useParams() as { datasetId: string }
  const { user, cart, setCart } = useContext(UserContext)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const isAdmin = user?.isAdmin ?? false
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

    const titleButton = (() => {
      if (!isAdmin) return <></>
      if (isEditing)
        return (
          <>
            {isLoading ? (
              <div className="fs-6">
                <Loading />
              </div>
            ) : (
              <div className="d-flex gap-2 mb-2">
                <button type="submit" className="btn btn-light btn-sm mt-2">
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm mt-2"
                  onClick={() => {
                    return setIsEditing(false)
                  }}
                >
                  Cancel
                </button>
              </div>
            )}
          </>
        )

      return (
        <button
          type="button"
          className="btn btn-light btn-sm mt-2 mb-2"
          onClick={() => setIsEditing(true)}
        >
          Edit
        </button>
      )
    })()

    const title = (() => {
      if (!isEditing) return dataset.name

      return (
        <Field
          className="form-control w-50 fw-bold fs-5"
          name="name"
          placeholder="Name"
          required
        />
      )
    })()

    const description = (() => {
      if (!isEditing) return dataset.description

      return (
        <Field
          className="form-control"
          component="textarea"
          rows={4}
          name="description"
          placeholder="Description (Optional)"
        />
      )
    })()

    const datapointSelection = (() => {
      if (!isEditing && dataset.archived)
        return (
          <small className="h6 text-muted">
            This dataset has been archived and is not currently available.
          </small>
        )
      if (!isEditing)
        return (
          <>
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
                const value = Number.parseInt((e.target as any).value)
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
          </>
        )

      return (
        <div className="d-flex gap-2 align-items-end">
          <div className="me-3">
            <div className="fw-bold">Datapoint price</div>
            <Field
              className="form-control"
              name="datapointPrice"
              type="number"
              placeholder="Datapoint price"
              required
            />
          </div>
          <div className="d-flex align-items-center mb-1">
            <div className="p fw-bold mb-1 me-2">Archived: </div>
            <Field name="archived" id="archivedCheckbox" type="checkbox" />
          </div>
        </div>
      )
    })()

    const initialValues: EditDatasetForm = {
      name: dataset.name,
      datapointPrice: dataset.datapointPrice,
      archived: dataset.archived,
      description: dataset.description,
    }

    const onSubmit = async (values: EditDatasetForm) => {
      setIsEditing(false)
      setIsLoading(true)
      const { name, datapointPrice, archived, description } = values

      await DatasetService.patch({
        id: dataset.id,
        name,
        datapointPrice,
        archived,
        description,
      })

      query.refetch()
      setIsLoading(false)
    }

    return (
      <>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          <Form>
            <div className="row g-0">
              <div className="col-md-7 card-body">
                <h1 className="card-title d-flex justify-content-between align-items-center gap-3">
                  {title}
                  {titleButton}
                </h1>
                <p className="card-text d-flex flex-column gap-1">
                  <small className="text-muted">
                    Uploaded {format(dataset.uploadedAt)}
                  </small>
                  <small className="text-muted">
                    {dataset.datapointMin} &le; Values &le;{" "}
                    {dataset.datapointMax}{" "}
                  </small>
                </p>
                <p className="card-text mt-4 mb-5">{description}</p>
                {datapointSelection}
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
          </Form>
        </Formik>
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
