import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar"; 
import Classification from "./components/Classification";
import Extension from "./components/Extension";
import Exchange from "./components/Exchange";
import Home from "./components/Home"; // Add a home component
import Barcode from "./components/Barcode"

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Extension" element={<Extension />} />
          <Route path="/Classification" element={<Classification />} />
          <Route path="/Exchange" element={<Exchange />} />
          <Route path="/Barcode" element={<Barcode/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
