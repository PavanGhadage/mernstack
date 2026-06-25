import React from "react";

function Header({ sidebarOpen, setSidebarOpen }) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <div
      className="d-flex justify-content-between align-items-center px-2 px-md-4 shadow-sm"
      style={{
        height: "80px",
        background: "#fff",
        position: "sticky",
        top: "0",
        zIndex: "999",
      }}
    >
      {/* Menu */}
      <button
        className="btn border-0 fs-4"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        ☰
      </button>

      {/* Right Side */}
      <div className="d-flex align-items-center gap-2 gap-md-4">
        <div
          style={{
            fontSize: "24px",
            cursor: "pointer",
          }}
        >
          ✉️
        </div>

        <div
          style={{
            fontSize: "20px",
            cursor: "pointer",
          }}
        >
          🔔
        </div>

        <img
          src={
            currentUser?.profileImage ||
            "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          }
          alt="profile"
          className="rounded-circle border"
          style={{
            width: window.innerWidth < 768 ? "40px" : "50px",
            height: window.innerWidth < 768 ? "40px" : "50px",
            objectFit: "cover",
          }}
        />
      </div>
    </div>
  );
}

export default Header;
