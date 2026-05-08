import { courses } from "../MyData.js";

import CourseCard from "../Components/CourseCard";

function Home() {
  return (
    <div>
      <h2 className="mb-4">All Courses</h2>

      <div className="row">
        {courses.map((course) => (
          <div className="col-md-4" key={course.id}>
            <CourseCard course={course} />
          </div>
        ))}
      </div>
    </div>
  );
}

export { Home };
