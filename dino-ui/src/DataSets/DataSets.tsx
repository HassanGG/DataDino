import DatasetCard from 'common/components/dataset-card'
import Page from 'common/components/page'
import { DatasetContext } from 'common/shared/DatasetContext'
import { useContext } from 'react'

export const Datasets = () => {
	const { datasets } = useContext(DatasetContext)

	return (
		<>

			<Page>
				{datasets?.map((dataset) => (
					<DatasetCard key={dataset.id} dataset={dataset} />
				))}
			</Page>
		</>
	)
}
