import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Landing } from "./landing/Landing"
import { Datasets } from "./datasets/Datasets"

function App() {
  return <Router>
    <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route path="/datasets" element={<Datasets/>}/>
    </Routes>
  </Router>
}

export default App;
