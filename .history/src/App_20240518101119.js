import "./App.css";
import AminatedRoutes from "./logic/AminatedRoutes";
import { BrowserRouter as Router, Routes } from "react-router-dom"; // Import Router once

function App() {

  // TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration


  return (
    <div className="App">
      <Router>
        <Aminated Routes/>
      </Router>
    </div>
  );
}

export default App;
