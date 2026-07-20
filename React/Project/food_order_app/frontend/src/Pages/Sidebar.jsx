import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const nav = useNavigate();

  const [showSettings, setShowSettings] = useState(false);

  const token = localStorage.getItem("token");
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const logout = () => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    nav("/login");
    window.location.reload();
  };

  const navStyle = ({ isActive }) =>
    isActive
      ? "text-warning text-decoration-none fw-bold"
      : "text-white text-decoration-none";
  const handleNavigation = () => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

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
          onClick={handleNavigation}
        >
          🍔 FoodieHub
        </NavLink>
      </div>

      {/* MENU */}
      <ul className="list-unstyled d-flex flex-column gap-4">
        <li>
          <NavLink to="/" className={navStyle} onClick={handleNavigation}>
            🏠 Home
          </NavLink>
        </li>

        <li>
          <NavLink to="/cart" className={navStyle} onClick={handleNavigation}>
            🛒 Cart
          </NavLink>
        </li>

        <li>
          <NavLink to="/orders" className={navStyle} onClick={handleNavigation}>
            📦 Orders
          </NavLink>
        </li>

        <li>
          <NavLink to="/about" className={navStyle} onClick={handleNavigation}>
            ℹ️ About
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/contact"
            className={navStyle}
            onClick={handleNavigation}
          >
            📞 Contact
          </NavLink>
        </li>

        {/* SETTINGS */}
        {token && (
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
                  <NavLink
                    to="/profile"
                    className={navStyle}
                    onClick={handleNavigation}
                  >
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
        {!token && (
          <NavLink
            to="/login"
            className="btn btn-warning w-100 rounded-pill"
            onClick={handleNavigation}
          >
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
