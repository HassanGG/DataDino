import "common/style/theme.css"
import "common/style/typography.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Landing from "landing"
import Datasets from "datasets"
import Docs from "docs"
import Demo from "demo"
import Login from "login"

if (process.env.REACT_APP_MOCKING === "enabled") {
  import("mocks")
}

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/datasets" element={<Datasets />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
