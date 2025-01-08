import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/HomePage/Home";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <div className="w-full h-full flex flex-col items-center overflow-x-hidden">
        <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;
