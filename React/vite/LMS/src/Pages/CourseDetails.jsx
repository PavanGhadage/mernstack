import { useParams } from "react-router-dom";
import { courses } from "../MyData.js";
import { LessonList } from "../Components/LessonList";
import { useState } from "react";

function CourseDetails() {
  const { courseId } = useParams();
  const [showLessons, setShowLessons] = useState(true);

  const course = courses.find((c) => c.id === Number(courseId));

  if (!course) return <h2>Course not found</h2>;

  return (
    <div>
      <h2>{course.title}</h2>
      <p className="text-muted">{course.instructor}</p>
      <p>{course.description}</p>

      <button
        className="btn btn-secondary mb-3"
        onClick={() => setShowLessons(!showLessons)}
      >
        {showLessons ? "Hide Lessons" : "Show Lessons"}
      </button>

      {showLessons && (
        <LessonList lessons={course.lessons} courseId={courseId} />
      )}
    </div>
  );
}

export { CourseDetails };
