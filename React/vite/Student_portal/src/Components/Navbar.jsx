import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-primary navbar-expand-lg shadow">
        <div className="container">
          <Link className="navbar-brand fw-bold fs-3" to="/">
            Student Portal
          </Link>
        </div>
      </nav>
    );
  }
}

export default Navbar;