import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage";
import Addjob from "./Components/Addjob";
import Update from "./Components/Update";
import Navbar from "./Components/Navbar";
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Addproducts" element={<Addjob />} />
          <Route path="/edit/:id" element={<Update />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
