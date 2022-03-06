import { Dataset } from "common/data/dataset"
import { useStyle } from "common/utils/css"
import style from "./DatasetCard.module.css"
import { NavLink } from "react-router-dom"
import { format } from "timeago.js"
import aveta from "aveta"
import truncate from "truncate"

export const DatasetCard = ({ dataset }: { dataset: Dataset }) => {
  const _style = useStyle({
    [style.card]: true,
    "card mb-3": true,
  })

  const link = `/datasets/${dataset.id}`

  return (
    <>
      <div className={_style}>
        <div className="row g-0">
          <div className="col-md-5 card-body text-center">
            <h5 className="card-title fs-4 fw-bold">
              ${Math.round(dataset.datapointPrice)}
            </h5>
            <p className="card-text fs-6 fst-italic text-nowrap">/ datapoint</p>

            <h5 className="card-title fs-4 fw-bold">
              {aveta(dataset.datapointCount)}
            </h5>
            <p className="card-text fs-6 fst-italic text-nowrap">datapoints</p>
          </div>
          <div className="col-md-7 card-body">
            <h5 className="card-title">{dataset.name}</h5>
            <p className="card-text">
              {dataset.description && truncate(dataset.description, 100)}
            </p>
            <p className="card-text">
              <small className="text-muted">
                Uploaded {format(dataset.uploadedAt)}
              </small>
            </p>
            <NavLink to={link} className="stretched-link">
              More
            </NavLink>
          </div>
        </div>
      </div>
    </>
  )
}
