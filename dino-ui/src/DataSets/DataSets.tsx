import DatasetCard from "common/components/dataset-card"
import Page from "common/components/page"
import { DatasetService } from "common/services/dataset.service"
import { useQuery } from "react-query"
import QueryComponent from "common/components/query-component"
import { DatasetMeta } from "common/data/dataset"
import { useState } from "react"
import debounce from "lodash.debounce"

export const DatasetsPage = () => {
  const [input, setInput] = useState("")
  const [filterArchived, setFilterArchived] = useState(true)
  const query = useQuery("datasets", DatasetService.getAll)
  const onData = (datasets: DatasetMeta[]) => {
    const filteredDatasets = datasets.filter(({ name, archived }) => {
      const includesText = name.toLowerCase().includes(input.toLowerCase())
      const archiveFilter = (filterArchived && !archived) || !filterArchived

      return includesText && archiveFilter
    })
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
            className="form-control rounded-end"
            placeholder="Search..."
            aria-label="Search"
            aria-describedby="addon-wrapping"
          />
          <div className="form-check ms-5 mt-1">
            <input
              className="form-check-input"
              type="checkbox"
              defaultChecked={true}
              onChange={(e: any) => setFilterArchived(e.target.checked)}
              id="archiveFilterCheck"
            />
            <label
              className="form-check-label mb-1"
              htmlFor="archiveFilterCheck"
            >
              Filter Archived
            </label>
          </div>
        </div>
        <div className="d-flex flex-wrap gy-2 justify-content-around">
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
