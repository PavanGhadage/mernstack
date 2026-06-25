// import React from "react";
// import { NavLink, useNavigate } from "react-router-dom";

// function AdminSidebar() {
//   const navigate = useNavigate();

//   const logout = () => {
//     localStorage.removeItem("isLogin");
//     localStorage.removeItem("currentUser");
//     navigate("/login");
//     window.location.reload();
//   };

//   const navStyle = ({ isActive }) =>
//     isActive
//       ? "text-warning text-decoration-none fw-bold"
//       : "text-white text-decoration-none";

//   return (
//     <div
//       className="bg-dark text-white p-3"
//       style={{
//         width: "260px",
//         height: "100vh",
//         position: "fixed",
//         left: 0,
//         top: 0,
//       }}
//     >
//       <h3 className="text-center mb-4">🍔 Admin Panel</h3>

//       <ul className="list-unstyled d-flex flex-column gap-4">
//         <li>
//           <NavLink to="/admin" className={navStyle}>
//             📊 Dashboard
//           </NavLink>
//         </li>

//         <li>
//           <NavLink to="/admin/users" className={navStyle}>
//             👥 Users
//           </NavLink>
//         </li>

//         <li>
//           <NavLink to="/admin/restaurants" className={navStyle}>
//             🍔 Restaurants
//           </NavLink>
//         </li>

//         <li>
//           <NavLink to="/admin/orders" className={navStyle}>
//             📦 Orders
//           </NavLink>
//         </li>

//         <li>
//           <NavLink to="/admin/messages" className={navStyle}>
//             📩 Messages
//           </NavLink>
//         </li>
//         <NavLink to="/admin/profile" className="nav-link">
//           👤 Profile
//         </NavLink>
//       </ul>

//       <button className="btn btn-danger w-100 mt-auto" onClick={logout}>
//         Logout
//       </button>
//     </div>
//   );
// }

// export default AdminSidebar;
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function AdminSidebar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("isLogin");
    localStorage.removeItem("currentUser");
    navigate("/login");
    window.location.reload();
  };

  const navStyle = ({ isActive }) =>
    isActive
      ? "text-warning text-decoration-none fw-bold"
      : "text-white text-decoration-none";

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="btn btn-dark d-md-none position-fixed"
        style={{
          top: "10px",
          left: "10px",
          zIndex: 2000,
        }}
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      {/* Sidebar */}
      <div
        className="bg-dark text-white p-3"
        style={{
          width: "260px",
          height: "100vh",
          position: "fixed",
          left: window.innerWidth <= 768 ? (open ? "0" : "-260px") : "0",
          top: 0,
          zIndex: 1500,
          transition: "0.3s",
        }}
      >
        <h3 className="text-center mb-4">🍔 Admin Panel</h3>

        <ul className="list-unstyled d-flex flex-column gap-4">
          <li>
            <NavLink
              to="/admin"
              className={navStyle}
              onClick={() => setOpen(false)}
            >
              📊 Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/admin/users"
              className={navStyle}
              onClick={() => setOpen(false)}
            >
              👥 Users
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/admin/restaurants"
              className={navStyle}
              onClick={() => setOpen(false)}
            >
              🍔 Restaurants
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/admin/orders"
              className={navStyle}
              onClick={() => setOpen(false)}
            >
              📦 Orders
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/admin/messages"
              className={navStyle}
              onClick={() => setOpen(false)}
            >
              📩 Messages
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/admin/profile"
              className={navStyle}
              onClick={() => setOpen(false)}
            >
              👤 Profile
            </NavLink>
          </li>
        </ul>

        <button className="btn btn-danger w-100 mt-4" onClick={logout}>
          Logout
        </button>
      </div>
    </>
  );
}

export default AdminSidebar;
