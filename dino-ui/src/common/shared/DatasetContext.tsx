import React, { createContext } from "react"
import { Dataset } from "common/data/dataset"
import { DatasetService } from "common/services/dataset.service"
import { useQuery } from "react-query"

interface DatasetContextType {
	datasets: Dataset[] | undefined
}

export const DatasetContext = createContext<DatasetContextType>({} as DatasetContextType)

const DatasetProvider = (props: any) => {
	// const [datasets, setDatasets] = useState<Dataset[]>([])

	// useEffect(() => {
	// 	const fetchDatasets = async () => {
	// 		const datasetService = new DatasetService()
	// 		const allDatasets = await datasetService.getAll()
	// 		setDatasets(allDatasets)
	// 	}
	// 	fetchDatasets()
	// }, [])
	const service = new DatasetService()
	const { data: datasets } = useQuery("datasets", service.getAll)

	return (
		<DatasetContext.Provider value={{ datasets }}>
			{props.children}
		</DatasetContext.Provider>
	)
}

export default DatasetProvider