import courses from "../Data/Courses";
import { useParams, Link } from "react-router-dom";

function LessonView() {
  const { courseId, lessonId } = useParams();

  const course = courses.find((c) => c.id === Number(courseId));
  const lesson = course?.lessons.find((l) => l.id === Number(lessonId));

  if (!lesson) return <h2>Lesson not found</h2>;

  return (
    <div className="card shadow p-4">
      <h3>{lesson.title}</h3>

      <p className="text-muted">Duration: {lesson.duration}</p>

      <hr />

      <p style={{ whiteSpace: "pre-line" }}>{lesson.content}</p>

      <Link to={`/course/${courseId}`} className="btn btn-secondary mt-3">
        Back to Course
      </Link>
    </div>
  );
}

export default LessonView;
