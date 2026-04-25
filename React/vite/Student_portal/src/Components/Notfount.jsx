import React, { Component } from "react";
import { Link } from "react-router-dom";

class NotFound extends Component {
  render() {
    return (
      <div className="container text-center mt-5">
        <h1 className="display-1 text-danger fw-bold">404</h1>
        <h3>Page Not Found</h3>
        <Link to="/" className="btn btn-primary mt-3 rounded-pill px-4">
          Go Home
        </Link>
      </div>
    );
  }
}

export default NotFound;