import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Sidebar({ sidebarOpen }) {
  const nav = useNavigate();

  const [showSettings, setShowSettings] = useState(false);

  const isLogin = localStorage.getItem("isLogin");

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

  return (
    <div
      className="bg-dark text-white d-flex flex-column p-3 shadow"
      style={{
        width: "260px",
        height: "100vh",
        position: "fixed",
        left: sidebarOpen ? "0" : "-260px",
        transition: "0.3s ease",
        top: 0,
      }}
    >
      {/* LOGO */}
      <div className="text-center mb-5">
        <NavLink
          to="/"
          className="text-white text-decoration-none fs-3 fw-bold"
        >
          🍔 FoodieHub
        </NavLink>
      </div>

      {/* MENU */}
      <ul className="list-unstyled d-flex flex-column gap-4">
        <li>
          <NavLink to="/" className={navStyle}>
            🏠 Home
          </NavLink>
        </li>

        <li>
          <NavLink to="/cart" className={navStyle}>
            🛒 Cart
          </NavLink>
        </li>

        <li>
          <NavLink to="/orders" className={navStyle}>
            📦 Orders
          </NavLink>
        </li>

        <li>
          <NavLink to="/about" className={navStyle}>
            ℹ️ About
          </NavLink>
        </li>

        <li>
          <NavLink to="/contact" className={navStyle}>
            📞 Contact
          </NavLink>
        </li>

        {/* SETTINGS */}
        {isLogin && (
          <li>
            <div
              className="text-white"
              style={{
                cursor: "pointer",
                userSelect: "none",
              }}
              onClick={() => setShowSettings(!showSettings)}
            >
              ⚙️ Settings {showSettings ? "▲" : "▼"}
            </div>

            {showSettings && (
              <ul className="list-unstyled mt-3 ms-3 d-flex flex-column gap-3">
                <li>
                  <NavLink to="/profile" className={navStyle}>
                    👤 Profile
                  </NavLink>
                </li>

                <li>
                  <button className="btn btn-danger btn-sm" onClick={logout}>
                    🚪 Logout
                  </button>
                </li>
              </ul>
            )}
          </li>
        )}
      </ul>

      {/* LOGIN BUTTON */}
      <div className="mt-auto">
        {!isLogin && (
          <NavLink to="/login" className="btn btn-warning w-100 rounded-pill">
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
