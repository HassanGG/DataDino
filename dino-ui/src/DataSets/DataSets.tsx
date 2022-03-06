import DatasetCard from "common/components/dataset-card"
import Page from "common/components/page"
import { DatasetService } from "common/services/dataset.service"
import { useQuery } from "react-query"
import QueryComponent from "common/components/query-component"
import { Dataset } from "common/data/dataset"

export const Datasets = () => {
  const query = useQuery("datasets", DatasetService.getAll)
  const onData = (datasets: Dataset[]) => {
    return (
      <>
        {datasets.map(dataset => (
          <DatasetCard key={dataset.id} dataset={dataset} />
        ))}
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
