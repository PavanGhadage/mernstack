import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/HomePage";
import { CourseD } from "./Pages/CoursesDetails";
import LessonView from "./Pages/LessonView";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/course/:courseId" element={<CourseD />} />

        <Route
          path="/course/:courseId/lesson/:lessonId"
          element={<LessonView />}
        />
      </Routes>
    </Router>
  );
}

export default App;
