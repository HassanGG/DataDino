import DatasetCard from "common/components/dataset-card"
import Page from "common/components/page"
import moment from "moment"
import { DatasetService } from "common/services/dataset.service"
import { useQuery } from "react-query"
import { Dataset } from "common/data/dataset"
import QueryComponent from "common/components/query-component"

export const LandingPage = () => {
  const query = useQuery("new-datasets", DatasetService.getAll)
  const onData = (datasets: Dataset[]) => {
    const newestDatasets = datasets
      .sort((a, b) => moment(b.uploadedAt).diff(moment(a.uploadedAt)))
      .slice(0, 10)

    return (
      <>
        {newestDatasets.map(dataset => (
          <DatasetCard key={dataset.id} dataset={dataset} />
        ))}
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
