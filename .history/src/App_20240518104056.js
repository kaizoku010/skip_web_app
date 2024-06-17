import "./App.css";
import AminatedRoutes from "./logic/AminatedRoutes";
import { BrowserRouter as Router, Routes } from "react-router-dom"; // Import Router once
import { DataPoint } from "./logic/DataPoint";

function App() {

  // TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration


  return (
    <div className="App">
      <Router>
        <AminatedRoutes/>
      </Router>
    </div>
  );
}

export default App;
