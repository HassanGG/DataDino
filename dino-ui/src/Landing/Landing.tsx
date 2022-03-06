import DatasetCard from "common/components/dataset-card"
import Page from "common/components/page"
import moment from "moment"
import { DatasetContext } from "common/shared/DatasetContext"
import { useContext } from "react"

export const Landing = () => {
	const { datasets } = useContext(DatasetContext)

	const newestDatasets =
		datasets && datasets
			.sort((a, b) => moment(b.uploadedAt).diff(moment(a.uploadedAt)))
			.slice(0, 10)

	return (
		<>
			<Page largeNavbar>
				{newestDatasets?.map((dataset) => (
					<DatasetCard key={dataset.id} dataset={dataset} />
				))}
			</Page>
		</>
	)
}
