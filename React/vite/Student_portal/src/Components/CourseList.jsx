import React, { Component } from "react";
import CourseCard from "./CourseCard";

class CourseList extends Component {
  render() {
    return (
      <div className="container my-5">
        <h2 className="text-center mb-4 fw-bold text-primary">
          Available Courses
        </h2>

        <div className="row g-4">
          {this.props.courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    );
  }
}

export {CourseList} 