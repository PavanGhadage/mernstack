import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function AdminSidebar() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
  const [showSettings, setShowSettings] = useState(false);

  const token = localStorage.getItem("token");
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    handleNavigation();

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
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
    <>
      {/* Mobile Menu Button */}
      <button
        className="btn btn-dark position-fixed"
        style={{
          top: "10px",
          left: "10px",
          zIndex: 2000,
        }}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        ☰
      </button>

      {/* Sidebar */}
      <div
        className="bg-dark text-white p-3 shadow"
        style={{
          width: "260px",
          height: "100vh",
          position: "fixed",
          top: 0,
          left: sidebarOpen ? "0" : "-260px",
          transition: "0.3s ease",
          zIndex: 1500,
          overflowY: "auto",
        }}
      >
        <h3 className="text-center mb-4">🍔 Admin Panel</h3>

        <ul className="list-unstyled d-flex flex-column gap-4">
          <li>
            <NavLink
              to="/admin"
              className={navStyle}
              onClick={handleNavigation}
            >
              📊 Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/admin/users"
              className={navStyle}
              onClick={handleNavigation}
            >
              👥 Users
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/admin/restaurants"
              className={navStyle}
              onClick={handleNavigation}
            >
              🍔 Restaurants
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/admin/orders"
              className={navStyle}
              onClick={handleNavigation}
            >
              📦 Orders
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/admin/messages"
              className={navStyle}
              onClick={handleNavigation}
            >
              📩 Messages
            </NavLink>
          </li>

          {/* Settings */}
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
                      to="/admin/profile"
                      className={navStyle}
                      onClick={handleNavigation}
                    >
                      👤 Profile
                    </NavLink>
                  </li>

                  <li className="text-success">👋 {currentUser?.name}</li>

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

        {!token && (
          <div className="mt-auto">
            <NavLink
              to="/login"
              className="btn btn-warning w-100 rounded-pill"
              onClick={handleNavigation}
            >
              Login
            </NavLink>
          </div>
        )}
      </div>
    </>
  );
}

export default AdminSidebar;
