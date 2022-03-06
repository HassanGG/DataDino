import DatasetCard from "common/components/dataset-card"
import Page from "common/components/page"
import moment from "moment"
import { DatasetService } from "common/services/dataset.service"
import { useQuery } from "react-query"

export const Landing = () => {
  const {
    data: datasets,
    isLoading,
    isError,
  } = useQuery("datasets", DatasetService.getAll)

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  if (isError) {
    return <h1>No error</h1>
  }

  if (!datasets) {
    return <h1>No datasets...</h1>
  }

  const newestDatasets = datasets
    .sort((a, b) => moment(b.uploadedAt).diff(moment(a.uploadedAt)))
    .slice(0, 10)

  return (
    <>
      <Page largeNavbar>
        {newestDatasets.map(dataset => (
          <DatasetCard key={dataset.id} dataset={dataset} />
        ))}
      </Page>
    </>
  )
}
