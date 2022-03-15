import "common/style/theme.css"
import "common/style/typography.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LandingPage from "landing"
import DatasetsPage from "datasets"
import CartPage from "datasets/cart"
import DatasetPage from "dataset"
import DocsPage from "docs"
import DemoPage from "demo"
import LoginPage from "login"
import ProfilePage from "profile"
import AdminPage from "admin"
import { UserContext } from "common/contexts/user.context"
import { useContext } from "react"
import {
  getUserNavbarItemName,
  UserNavbarItemName,
} from "common/components/navbar/Navbar.helper"
import SignUpPage from "signup"

if (process.env.REACT_APP_MOCKING === "enabled") {
  import("mocks")
}

const App = () => {
  const { user } = useContext(UserContext)
  const profileText = getUserNavbarItemName(user)

  const profileElement = (() => {
    switch (profileText) {
      case UserNavbarItemName.Login:
        return <LoginPage />
      case UserNavbarItemName.Admin:
        return <AdminPage />
      default:
        return <ProfilePage />
    }
  })()

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/datasets" element={<DatasetsPage />} />
        <Route path="/datasets/:datasetId" element={<DatasetPage />} />
        <Route path="/datasets/cart" element={<CartPage />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="/demo" element={<DemoPage />} />
        <Route
          path={`/${profileText.toLowerCase()}`}
          element={profileElement}
        />
        {!user && <Route path="/signup" element={<SignUpPage />} />}
      </Routes>
    </Router>
  )
}

export default App
