import React from "react";
// import img from "/images/profilepic.webp";

function Page1({ name, email, course, mobile,key,img }) {
  return (
    <>
      <div className="card" style={{ width: "18rem", margin: 5 }}>
        <img src={img} className="card-img-top" alt="student" />

        <div className="card-body text-start">
          <h5 className="card-title">
            <strong>Name :</strong> {name}
          </h5>

          <p className="card-text">
            <strong>Email :</strong> {email}
          </p>

          <p>
            <strong>Mobile :</strong> {mobile}
          </p>

          <p>
            <strong>Course :</strong> {course}
          </p>
        </div>
      </div>
    </>
  );
}

export default Page1;
