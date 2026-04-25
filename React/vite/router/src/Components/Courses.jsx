import React from "react";
import courses from "../data";

const Courses = () => {
  return (
    <div className="container mt-5">

      <h2 className="text-center mb-4">Our Courses</h2>

      <div className="row">

        {courses.map((course, index) => {
          return (

            <div className="col-md-3 mb-4" key={index}>

              <div className="card shadow">

                <div className="card-body">

                  <h5 className="card-title">{course.name}</h5>

                  <p>{course.description}</p>

                  <p><b>Duration:</b> {course.duration}</p>

                  <p><b>Fee:</b> {course.fee}</p>

                  <button className="btn btn-primary w-100">
                    Enroll Now
                  </button>

                </div>

              </div>

            </div>

          );
        })}

      </div>

    </div>
  );
};

export default Courses;