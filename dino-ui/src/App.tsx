import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LandingPage from "./Landing/Landing"
import Datasets from "./DataSets/DataSets"

function App() {
  return <Router>
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/Datasets" element={<Datasets/>}/>
    </Routes>
  </Router>
}

export default App;
