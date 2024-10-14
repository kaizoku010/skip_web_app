import "./App.css";
import AminatedRoutes from "./logic/AminatedRoutes";
import { BrowserRouter as Router, Routes } from "react-router-dom"; // Import Router once
import { DataPoint } from "./logic/DataPoint";
import "./amobile_view"

function App() {


  return (
    <div className="App">
      <Router>
        <AminatedRoutes/>
      </Router>
    </div>
  );
}

export default App;
