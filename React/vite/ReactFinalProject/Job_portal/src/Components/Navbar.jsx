import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  const navStyle = ({ isActive }) =>
    `text-decoration-none px-3 py-2 rounded fw-semibold ${
      isActive ? "bg-light text-dark" : "text-white"
    }`;

  return (
    <nav className="navbar navbar-dark bg-dark w-100 m-0 px-4 py-3">
      <div className="d-flex justify-content-between align-items-center w-100">
        <h1 className="text-white m-0 fw-bold">Job Portal</h1>

        <div className="d-flex gap-3">
          <NavLink to="/" className={navStyle}>
            Home
          </NavLink>

          <NavLink to="/addproducts" className={navStyle}>
            Add Product
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
