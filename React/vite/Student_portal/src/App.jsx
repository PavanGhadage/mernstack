import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./Components/Navbar";
// import CourseList from "./Components/CourseList";
import { CourseList } from "./Components/CourseList.jsx";
import Coursedetails from "./Components/Coursedetails";
import Notfount from "./Components/Notfount";

class App extends Component {
  state = {
    courses: [
      { id: 1, name: "HTML Basics", duration: "4 Weeks", price: 1999 },
      { id: 2, name: "CSS Mastery", duration: "6 Weeks", price: 2499 },
      {
        id: 3,
        name: "JavaScript Fundamentals",
        duration: "8 Weeks",
        price: 3499,
      },
    ],
  };

  render() {
    return (
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={<CourseList courses={this.state.courses} />}
          />
          <Route
            path="/course/:id"
            element={<Coursedetails courses={this.state.courses} />}
          />
          <Route path="*" element={<Notfount />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
