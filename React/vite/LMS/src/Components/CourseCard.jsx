import { Link } from "react-router-dom";

function CourseCard({ course }) {
  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{course.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{course.instructor}</h6>
        <p className="card-text">{course.description}</p>

        <Link to={`/course/${course.id}`} className="btn btn-primary">
          View Course
        </Link>
      </div>
    </div>
  );
}

export default CourseCard;
