import { DatasetMeta } from "common/data/dataset"
import { useStyle } from "common/utils/css"
import style from "./DatasetCard.module.css"
import { NavLink } from "react-router-dom"
import { format } from "timeago.js"
import aveta from "aveta"
import truncate from "truncate"
import { SyntheticEvent } from "react"

export const DatasetCard = ({ dataset }: { dataset: DatasetMeta }) => {
  const _style = useStyle({
    "bg-light": dataset.archived,
    [style.card]: true,
    "card mb-3": true,
  })

  const linkStyle = useStyle({
    [style.disabled]: dataset.archived,
    "stretched-link": !dataset.archived,
  })

  const onLinkClick = (e: SyntheticEvent) => {
    if (dataset.archived) e.preventDefault()
  }

  const link = `/datasets/${dataset.id}`

  return (
    <>
      <div className={_style}>
        <div className="row g-0">
          <div className="col-md-5 card-body text-center d-flex flex-column">
            <h5 className="card-title fs-4 fw-bold">
              ${Math.round(dataset.datapointPrice)}
            </h5>
            <p className="card-text fs-6 fst-italic text-nowrap">/ datapoint</p>

            <h5 className="card-title fs-4 fw-bold">
              {aveta(dataset.datapointCount)}
            </h5>
            <p className="card-text fs-6 fst-italic text-nowrap">datapoints</p>

            {dataset.archived && <div className="fw-bold mt-5">Archived</div>}
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
            <NavLink to={link} className={linkStyle} onClick={onLinkClick}>
              More
            </NavLink>
          </div>
        </div>
      </div>
    </>
  )
}
