import { useParams } from "react-router-dom";
import { courses } from "../MyData.js";

function LessonView() {
  const { courseId, lessonId } = useParams();

  const course = courses.find(c => c.id === Number(courseId));
  const lesson = course?.lessons.find(l => l.id === Number(lessonId));

  if (!lesson) return <h2>Lesson not found</h2>;

  return (
    <div className="card shadow">
      <div className="card-body">
        <h3 className="card-title">{lesson.title}</h3>
        <p className="card-text">{lesson.content}</p>
      </div>
    </div>
  );
}

export default LessonView;