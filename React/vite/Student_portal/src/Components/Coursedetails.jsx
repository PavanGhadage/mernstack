import React, { Component } from "react";

class CourseDetails extends Component {
  render() {
    const id = window.location.pathname.split("/")[2];
    const course = this.props.courses.find((c) => c.id == id);

    if (!course) {
      return (
        <div className="container text-center mt-5">
          <h2 className="text-danger">Course Not Found</h2>
        </div>
      );
    }

    return (
      <div className="container mt-5">
        <div className="card shadow-lg border-0 rounded-4 p-4 col-md-8 mx-auto">
          <h2 className="text-primary fw-bold mb-3">{course.name}</h2>
          <h5 className="text-muted">Duration: {course.duration}</h5>
          <h4 className="text-success mt-3">Price: ₹{course.price}</h4>

          <button className="btn btn-success mt-4 rounded-pill px-4">
            Enroll Now
          </button>
        </div>
      </div>
    );
  }
}

export default CourseDetails;