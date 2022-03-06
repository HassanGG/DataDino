import "common/style/theme.css"
import "common/style/typography.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Landing from "landing"
import Datasets from "datasets"
import Docs from "docs"
import Demo from "demo"
import Login from "login"
import DatasetProvider from "common/shared/DatasetContext"

if (process.env.REACT_APP_MOCKING === "enabled") {
	require("mocks")
}

const App = () => {
	return (
		<Router>
			<DatasetProvider>
				<Routes>
					<Route path='/' element={<Landing />} />
					<Route path='/datasets' element={<Datasets />} />
					<Route path='/docs' element={<Docs />} />
					<Route path='/demo' element={<Demo />} />
					<Route path='/login' element={<Login />} />
				</Routes>
			</DatasetProvider>
		</Router>
	)
}

export default App
