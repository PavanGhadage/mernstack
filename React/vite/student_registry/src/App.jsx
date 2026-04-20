import React from "react";
import Page1 from "./components/Page1";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  const img = "/images/profilepic.webp";

  const students = [
    {
      name: "Rahul Sharma",
      email: "rahul.sharma@gmail.com",
      course: "MERN Stack",
      mobile: "9876543210",
      imgpath: img,
    },
    {
      name: "Priya Patil",
      email: "priya.patil@gmail.com",
      course: "Python Full Stack",
      mobile: "9123456780",
      imgpath: img,
    },
    {
      name: "Amit Verma",
      email: "amit.verma@gmail.com",
      course: "Java Full Stack",
      mobile: "9988776655",
      imgpath: img,
    },
    {
      name: "Sneha Kulkarni",
      email: "sneha.kulkarni@gmail.com",
      course: "Data Science",
      mobile: "9871234567",
      imgpath: img,
    },
    {
      name: "Rohit Deshmukh",
      email: "rohit.deshmukh@gmail.com",
      course: "MERN Stack",
      mobile: "9765432109",
      imgpath: img,
    },
    {
      name: "Neha Joshi",
      email: "neha.joshi@gmail.com",
      course: "Python Full Stack",
      mobile: "9898989898",
      imgpath: img,
    },
  ];

  return (
    <div className="container">
      <h1 className="text-center my-4">Student Registry App</h1>

      <div className="row">
        {students.map((val, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <Page1
              name={val.name}
              email={val.email}
              course={val.course}
              mobile={val.mobile}
              img={val.imgpath}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
