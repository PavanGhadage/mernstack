import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="container text-center py-5">
      <h1 className="display-1 fw-bold text-danger">404</h1>

      <h3 className="mb-3">Page Not Found</h3>

      <p className="text-secondary">
        The page you are looking for does not exist.
      </p>

      <Link to="/" className="btn btn-primary mt-3">
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;
