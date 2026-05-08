import { useState } from "react";
import LessonL from "../Components/LessonList";
import { useParams, Link } from "react-router-dom";
import courses from "../Data/Courses";

function CourseD() {
  const { courseId } = useParams();

  const course = courses.find((c) => c.id === Number(courseId));

  if (!course) return <h2>Course not found</h2>;

  return (
    <div>
      <h2>{course.title}</h2>
      <p className="text-muted">{course.instructor}</p>
      <p>
        <strong>Duration:</strong> {course.duration}
      </p>
      <p>{course.description}</p>

      <h4 className="mt-4">Lessons</h4>

      <ul className="list-group">
        {course.lessons.map((lesson) => (
          <li key={lesson.id} className="list-group-item">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <strong>{lesson.title}</strong>
                <br />
                <small className="text-muted">{lesson.duration}</small>
              </div>

              <Link
                to={`/course/${course.id}/lesson/${lesson.id}`}
                className="btn btn-sm btn-outline-primary"
              >
                Open
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export { CourseD };
