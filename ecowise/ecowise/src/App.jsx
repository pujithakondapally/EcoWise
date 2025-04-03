import { useState } from "react";
import "./App.css";
import Classification from "./components/Classification"; // Import the new component

function App() {
  return (
    <div className="App">
    <Classification /> {/* Render the Waste Classification component */}
    </div>
  );
}

export default App;
