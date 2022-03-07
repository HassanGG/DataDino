import DatasetCard from "common/components/dataset-card"
import Page from "common/components/page"
import { DatasetService } from "common/services/dataset.service"
import { useQuery } from "react-query"
import QueryComponent from "common/components/query-component"
import { Dataset } from "common/data/dataset"
import { useState } from "react"

export const DatasetsPage = () => {
  const [input, setInput] = useState("")
  const query = useQuery("datasets", DatasetService.getAll)
  const onData = (datasets: Dataset[]) => {
    const filteredDatasets = datasets.filter(({ name }) =>
      name.toLowerCase().includes(input.toLowerCase())
    )
    return (
      <>
        <div className="input-group flex-nowrap">
          <button
            className="btn btn-light border"
            type="button"
            id="button-addon1"
          >
            <i className="bi bi-search"></i>
          </button>
          <input
            onBlur={e => setInput((e.target as any).value)}
            onKeyUp={e =>
              e.key === "Enter" && setInput((e.target as any).value)
            }
            type="text"
            className="form-control"
            placeholder="Search..."
            aria-label="Search"
            aria-describedby="addon-wrapping"
          />
        </div>
        <div className="d-flex flex-wrap gy-2" style={{ columnGap: "16px" }}>
          {filteredDatasets.map(dataset => (
            <DatasetCard key={dataset.id} dataset={dataset} />
          ))}
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
