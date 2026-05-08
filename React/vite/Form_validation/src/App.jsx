import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Components/Homepage";
import Showdata from "./Components/Showdata";

function App() {
  return (
    <>
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/showdata" element={<Showdata />} />
        </Routes>
      </BrowserRouter> */}
      <Homepage />
    </>
  );
}

export default App;
