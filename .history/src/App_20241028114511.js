import "./App.css";
import AminatedRoutes from "./logic/AminatedRoutes";
import { BrowserRouter as Router, Routes } from "react-router-dom"; // Import Router once
import "./atoms/mobile_view.css"
import Mobilehome from "./atoms/Mobilehome";
function App() {


  return (
    <div className="App">
      <Router>
        <Mobilehome/>
        <AminatedRoutes/>
      </Router>
    </div>
  );
}

export default App;
