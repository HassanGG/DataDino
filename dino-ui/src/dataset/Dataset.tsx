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
import { useState } from "react"

export const DatasetPage = () => {
  const [datapointCount, setDatapointCount] = useState(1)
  const { datasetId } = useParams() as { datasetId: string }

  const query = useQuery(`dataset-${datasetId}`, () =>
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
            <h4 className="mt-5">
              How many datapoints would you like?
              <small className="text-muted ms-2">{datapointCount}</small>
            </h4>
            <input
              type="range"
              className="form-range"
              min="1"
              max={dataset.datapointCount}
              onInputCapture={e => setDatapointCount((e.target as any).value)}
            ></input>
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
      <Page>
        <QueryComponent query={query} onData={onData} />
      </Page>
    </>
  )
}
