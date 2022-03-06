import DatasetCard from 'common/components/dataset-card'
import Page from 'common/components/page'
import { DatasetService } from 'common/services/dataset.service'
import { useQuery } from 'react-query'

export const Datasets = () => {
	const { data: datasets, isLoading } = useQuery("datasets", DatasetService.getAll, {
		staleTime: 2000
	})

	if (isLoading) {
		return <h1>Loading...</h1>
	}

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
