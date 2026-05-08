import { Link } from "react-router-dom";

function CourseCard({ course }) {
  return (
   <div className="card shadow mb-4 h-100">
      <div className="card-body">
        <h5 className="card-title">{course.title}</h5>

        <p className="text-muted mb-1">{course.instructor}</p>

        <p className="mb-1">
          <strong>Duration:</strong> {course.duration}
        </p>

        <p className="card-text">{course.description}</p>

        <Link
          to={`/course/${course.id}`}
          className="btn btn-primary mt-2"
        >
          View Course
        </Link>
      </div>
    </div>

  );
}

export default CourseCard;
