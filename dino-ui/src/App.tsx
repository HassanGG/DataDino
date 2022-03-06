import "common/style/theme.css"
import "common/style/typography.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LandingPage from "landing"
import DatasetsPage from "datasets"
import DatasetPage from "dataset"
import DocsPage from "docs"
import DemoPage from "demo"
import LoginPage from "login"

if (process.env.REACT_APP_MOCKING === "enabled") {
  import("mocks")
}

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/datasets" element={<DatasetsPage />} />
        <Route path="/datasets/:datasetId" element={<DatasetPage />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="/demo" element={<DemoPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  )
}

export default App
