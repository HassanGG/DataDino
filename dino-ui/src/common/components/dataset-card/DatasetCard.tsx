import { Dataset } from "common/data/dataset"
import { useStyle } from "common/utils/css"
import style from "./DatasetCard.module.css"
import { format } from 'timeago.js'
import aveta from 'aveta'

export const DatasetCard = ({ dataset }: { dataset: Dataset }) => {
    const _style = useStyle({
        [style.card]: true,
        "card mb-3": true
    })

    return <>
        <div className={_style}>
            <div className="row g-0">
                <div className="col-md-4">
                    <div className="card-body">
                        <h5 className="card-title text-center fs-4 fw-bold">${ dataset.datapointPrice }</h5>
                        <p className="card-text fs-6 fst-italic text-nowrap">/ datapoint</p>

                        <h5 className="card-title text-center fs-4 fw-bold">{ aveta(dataset.datapointCount) }</h5>
                        <p className="card-text fs-6 fst-italic text-nowrap">datapoints</p>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{ dataset.name }</h5>
                        <p className="card-text">{ dataset.description }</p>
                        <p className="card-text"><small className="text-muted">Uploaded { format(dataset.uploadedAt) }</small></p>
                    </div>
                </div>
            </div>
        </div>
    </>
}