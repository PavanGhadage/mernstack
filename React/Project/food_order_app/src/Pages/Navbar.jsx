import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const [show, setShow] = useState(false);

  const nav = useNavigate();

  const isLogin = localStorage.getItem("isLogin");

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const logout = () => {
    localStorage.removeItem("isLogin");
    localStorage.removeItem("currentUser");

    nav("/login");

    window.location.reload();
  };

  const navStyle = ({ isActive }) =>
    isActive
      ? "text-warning text-decoration-none fw-bold"
      : "text-white text-decoration-none";

  const mobileNavStyle = ({ isActive }) =>
    isActive
      ? "text-warning text-decoration-none d-block py-2 fw-bold"
      : "text-white text-decoration-none d-block py-2";

  return (
    <nav className="bg-dark p-3 shadow">
      {/* TOP NAVBAR */}
      <div className="d-flex justify-content-between align-items-center">
        {/* LOGO */}
        <NavLink
          to="/"
          className="text-white text-decoration-none fs-3 fw-bold"
        >
          🍔 FoodieHub
        </NavLink>

        {/* HAMBURGER */}
        <button
          className="btn btn-light d-lg-none"
          onClick={() => setShow(!show)}
        >
          ☰
        </button>

        {/* DESKTOP MENU */}
        <ul className="list-unstyled d-none d-lg-flex gap-4 mb-0 align-items-center">
          <li>
            <NavLink to="/" className={navStyle}>
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/cart" className={navStyle}>
              Cart
            </NavLink>
          </li>

          <li>
            <NavLink to="/orders" className={navStyle}>
              Orders
            </NavLink>
          </li>

          <li>
            <NavLink to="/about" className={navStyle}>
              About
            </NavLink>
          </li>

          <li>
            <NavLink to="/contact" className={navStyle}>
              Contact
            </NavLink>
          </li>

          {/* HELLO USER */}
          <li
            className="fw-bold px-4 py-2 rounded-pill"
            style={{
              background: "linear-gradient(to right, #ff512f, #f09819)",
              color: "white",
              fontSize: "18px",
              letterSpacing: "1px",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
              fontFamily: "cursive",
            }}
          >
            👋 {isLogin ? `Hello, ${currentUser?.name}` : "Hello, User"}
          </li>

          {/* LOGIN / LOGOUT */}
          <li>
            {isLogin ? (
              <button className="btn btn-danger rounded-pill" onClick={logout}>
                Logout
              </button>
            ) : (
              <NavLink to="/login" className="btn btn-warning rounded-pill">
                Login
              </NavLink>
            )}
          </li>
        </ul>
      </div>

      {/* MOBILE MENU */}
      {show && (
        <ul className="list-unstyled mt-3 d-lg-none">
          <li>
            <NavLink
              to="/"
              className={mobileNavStyle}
              onClick={() => setShow(false)}
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/cart"
              className={mobileNavStyle}
              onClick={() => setShow(false)}
            >
              Cart
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/orders"
              className={mobileNavStyle}
              onClick={() => setShow(false)}
            >
              Orders
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/about"
              className={mobileNavStyle}
              onClick={() => setShow(false)}
            >
              About
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/contact"
              className={mobileNavStyle}
              onClick={() => setShow(false)}
            >
              Contact
            </NavLink>
          </li>

          {/* HELLO USER MOBILE */}
          <li
            className="fw-bold py-2 px-3 rounded-4 text-center mt-3"
            style={{
              background: "linear-gradient(to right, #ff512f, #f09819)",
              color: "white",
              fontSize: "18px",
              fontFamily: "cursive",
            }}
          >
            👋 {isLogin ? `Hello, ${currentUser?.name}` : "Hello, User"}
          </li>

          {/* LOGIN / LOGOUT MOBILE */}
          <li className="mt-3">
            {isLogin ? (
              <button
                className="btn btn-danger w-100 rounded-pill"
                onClick={() => {
                  logout();
                  setShow(false);
                }}
              >
                Logout
              </button>
            ) : (
              <NavLink
                to="/login"
                className="btn btn-warning w-100 rounded-pill"
                onClick={() => setShow(false)}
              >
                Login
              </NavLink>
            )}
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
