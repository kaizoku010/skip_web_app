import "./App.css";
import AminatedRoutes from "./logic/AminatedRoutes";
import { BrowserRouter as Router, Routes } from "react-router-dom"; // Import Router once
import "./atoms/mobile_view.css"
import 
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
