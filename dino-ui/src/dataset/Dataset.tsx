import DatasetCard from "common/components/dataset-card"
import Page from "common/components/page"
import Label from "common/components/label"
import { DatasetService } from "common/services/dataset.service"
import { useQuery } from "react-query"
import QueryComponent from "common/components/query-component"
import { Dataset } from "common/data/dataset"
import { useParams } from "react-router-dom"
import { format } from "timeago.js"
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  ReferenceLine,
} from "recharts"

type PriceData = { quantity: number; price: number }

export const DatasetPage = () => {
  const { datasetId } = useParams() as { datasetId: string }

  const query = useQuery(`dataset-${datasetId}`, () =>
    DatasetService.get({ id: datasetId })
  )

  const onData = (dataset: Dataset) => {
    const graphData = Array.from(Array(11).keys()).map(base => {
      const percentage = base / 10
      const quantity = Math.round(dataset.datapointCount * percentage)
      const price = Math.round(dataset.datapointPrice * percentage)

      return {
        quantity,
        price,
      }
    })

    console.log(graphData)

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
            <p className="card-text mt-4">{dataset.description}</p>
          </div>
          <div className="col-md-5 card-body ml-4">
            <BarChart width={350} height={400} data={graphData}>
              <Bar dataKey="quantity" fill="#8884d8" />
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="price" />
              <YAxis />
              <Tooltip />
            </BarChart>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Page>
        <QueryComponent query={query} onData={onData} />
      </Page>
    </>
  )
}
