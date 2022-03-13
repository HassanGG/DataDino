import DatasetCard from "common/components/dataset-card"
import Page from "common/components/page"
import { DatasetService } from "common/services/dataset.service"
import { useQuery } from "react-query"
import QueryComponent from "common/components/query-component"
import { DatasetMeta } from "common/data/dataset"
import React, { useState } from "react"
import debounce from "lodash.debounce"

export const DatasetsPage = () => {
  const [input, setInput] = useState("")
  const query = useQuery("datasets", DatasetService.getAll)
  const onData = (datasets: DatasetMeta[]) => {
    const filteredDatasets = datasets.filter(({ name }) =>
      name.toLowerCase().includes(input.toLowerCase()),
    )
    const debouncedSetInput = debounce(
      (event: any) => setInput(event.target.value),
      1200,
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
            onKeyUp={debouncedSetInput}
            onKeyDown={e =>
              e.key === "Enter" && setInput((e.target as any).value)
            }
            type="text"
            className="form-control"
            placeholder="Search..."
            aria-label="Search"
            aria-describedby="addon-wrapping"
          />
        </div>
        <div className="d-flex flex-wrap gy-2" style={{ columnGap: "30px" }}>
          {filteredDatasets.length === 0 ? (
            <div className="h3">No datasets found!</div>
          ) : (
            filteredDatasets.map(dataset => (
              <DatasetCard key={dataset.id} dataset={dataset} />
            ))
          )}
        </div>
      </>
    )
  }

  return (
    <>
      <Page showBar>
        <QueryComponent query={query} onData={onData} />
      </Page>
    </>
  )
}
