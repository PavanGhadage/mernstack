import { Link } from "react-router-dom";

function LessonList({ lessons, courseId }) {
  return (
    <div>
      <h4>Lessons</h4>
      <ul className="list-group">
        {lessons.map((lesson) => (
          <li key={lesson.id} className="list-group-item">
            <Link to={`/course/${courseId}/lesson/${lesson.id}`}>
              {lesson.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export { LessonList };
