import React, { Component } from "react";
import Page1 from "./Components/Page1";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";

import {
  students,
  mernStudents as mern,
  pythonStudents as python,
} from "./array";

export class App extends Component {
  constructor() {
    super();

    this.state = {
      showAll: true,
      showMern: false,
      showPython: false,
    };
  }

  render() {
    return (
      <>
        <h1 className="text-primary bg-dark p-2 text-center">
          Student Registry App
        </h1>

        <div className="container">
          <div className="btn-group mb-3">
            <button
              className="btn btn-warning"
              onClick={() => {
                this.setState({
                  showAll: true,
                  showMern: false,
                  showPython: false,
                });
              }}
            >
              All Students
            </button>

            <button
              className="btn btn-primary"
              onClick={() => {
                this.setState({
                  showAll: false,
                  showMern: true,
                  showPython: false,
                });
              }}
            >
              MERN Students
            </button>

            <button
              className="btn btn-info"
              onClick={() => {
                this.setState({
                  showAll: false,
                  showMern: false,
                  showPython: true,
                });
              }}
            >
              Python FS Students
            </button>
          </div>

          <div className="d-flex flex-row flex-wrap justify-content-around">
            {this.state.showAll === true
              ? students.map((val, index) => (
                  <Page1
                    key={index}
                    name={val.name}
                    course={val.course}
                    mobile={val.mobile}
                    email={val.email}
                    img={val.imgpath}
                  />
                ))
              : this.state.showMern === true
                ? mern.map((val, index) => (
                    <Page1
                      key={index}
                      name={val.name}
                      course={val.course}
                      mobile={val.mobile}
                      email={val.email}
                      img={val.imgpath}
                    />
                  ))
                : this.state.showPython === true
                  ? python.map((val, index) => (
                      <Page1
                        key={index}
                        name={val.name}
                        course={val.course}
                        mobile={val.mobile}
                        email={val.email}
                        img={val.imgpath}
                      />
                    ))
                  : null}
          </div>
        </div>
      </>
    );
  }
}

export default App;
