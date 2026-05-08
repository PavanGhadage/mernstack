import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Addproduct from "./Components/Addproduct";
import Updatedata from "./Components/Updatedata";
import Navbar from "./Components/Navbar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addproduct" element={<Addproduct />} />
          <Route path="/updateproduct/:id" element={<Updatedata />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
