import { Dataset } from "common/data/dataset"
import { useStyle } from "common/utils/css"
import style from "./DatasetCard.module.css"
import { format } from "timeago.js"
import aveta from "aveta"
import truncate from "truncate"

export const DatasetCard = ({ dataset }: { dataset: Dataset }) => {
  const _style = useStyle({
    [style.card]: true,
    "card mb-3": true,
  })

  return (
    <>
      <div className={_style}>
        <div className="row g-0">
          <div className="col-md-5">
            <div className="card-body text-center">
              <h5 className="card-title fs-4 fw-bold">
                ${Math.round(dataset.datapointPrice)}
              </h5>
              <p className="card-text fs-6 fst-italic text-nowrap">
                / datapoint
              </p>

              <h5 className="card-title fs-4 fw-bold">
                {aveta(dataset.datapointCount)}
              </h5>
              <p className="card-text fs-6 fst-italic text-nowrap">
                datapoints
              </p>
            </div>
          </div>
          <div className="col-md-7">
            <div className="card-body">
              <h5 className="card-title">{dataset.name}</h5>
              <p className="card-text">
                {dataset.description && truncate(dataset.description, 100)}
              </p>
              <p className="card-text">
                <small className="text-muted">
                  Uploaded {format(dataset.uploadedAt)}
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
