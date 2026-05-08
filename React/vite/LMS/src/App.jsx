import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./Pages/Home";
import { CourseDetails } from "./Pages/CourseDetails";
import LessonView from "./Pages/LessonView";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/course/:courseId" element={<CourseDetails />} />
          <Route
            path="/course/:courseId/lesson/:lessonId"
            element={<LessonView />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
