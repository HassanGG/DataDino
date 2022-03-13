import DatasetCard from "common/components/dataset-card"
import Page from "common/components/page"
import moment from "moment"
import { DatasetService } from "common/services/dataset.service"
import { useQuery } from "react-query"
import { DatasetMeta } from "common/data/dataset"
import QueryComponent from "common/components/query-component"
import { Link } from "react-router-dom"

export const LandingPage = () => {
  const query = useQuery("new-datasets", DatasetService.getAll)
  const onData = (datasets: DatasetMeta[]) => {
    const newestDatasets = datasets
      .sort((a, b) => moment(b.uploadedAt).diff(moment(a.uploadedAt)))
      .slice(0, 10)

    return (
      <>
        <div>
          <div className="d-flex justify-content-between align-items-center mt-4">
            <p className="h4 mb-3">
              New
              <small className="text-muted ms-2">
                <i className="bi bi-stars" />
              </small>
            </p>
            <Link to={"/datasets"} className="text-decoration-none text-dark">
              <p className="h6 mb-3">
                See all
                <small className="text-muted ms-2">
                  <i className="bi bi-arrow-right" />
                </small>
              </p>
            </Link>
          </div>
          <div className="d-flex gap-3 overflow-auto">
            {newestDatasets.map(dataset => (
              <DatasetCard key={dataset.id} dataset={dataset} />
            ))}
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Page largeNavbar>
        <QueryComponent query={query} onData={onData} />
      </Page>
    </>
  )
}
