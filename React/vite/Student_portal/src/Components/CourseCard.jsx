import React, { Component } from "react";
import { Link } from "react-router-dom";

class CourseCard extends Component {
  render() {
    const { id, name, duration, price } = this.props.course;

    return (
      <div className="col-md-6 col-lg-4">
        <div className="card h-100 shadow-lg border-0 rounded-4">
          <div className="card-body text-center p-4">
            <h4 className="fw-bold text-primary">{name}</h4>
            <p className="text-muted mb-2">{duration}</p>
            <h5 className="text-success mb-3">₹{price}</h5>

            <Link
              to={`/course/${id}`}
              className="btn btn-primary px-4 rounded-pill"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default CourseCard;
