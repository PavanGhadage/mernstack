import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

function AdminLayout() {
  return (
    <div className="d-flex">
      <AdminSidebar />

      <div
        className="flex-grow-1"
        style={{
          marginLeft: window.innerWidth > 768 ? "260px" : "0",
          minHeight: "100vh",
          padding: "20px",
          width: "100%",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
