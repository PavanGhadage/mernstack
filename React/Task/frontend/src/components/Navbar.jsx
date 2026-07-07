// Premium Navbar.jsx
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaBoxOpen,
  FaUserShield,
  FaUser,
} from "react-icons/fa";

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const link = ({ isActive }) =>
    `px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
      isActive
        ? "bg-blue-600 text-white shadow"
        : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
    }`;
  const navClass = ({ isActive }) =>
    `no-underline px-4 py-2 rounded-lg text-[16px] font-semibold transition-all duration-300 ${
      isActive ? "text-black bg-gray-100" : "text-black hover:bg-gray-100"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b shadow-sm">
      <div className="max-w-7xl mx-auto h-[72px] px-6 flex items-center justify-between">
        <div
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-3 cursor-pointer shrink-0"
        >
          <div className="h-11 w-11 rounded-2xl bg-blue-600 flex items-center justify-center text-white">
            <FaBoxOpen size={20} />
          </div>

          <div>
            <h1 className="text-xl font-bold text-gray-800 leading-none">
              Product Manager
            </h1>
          </div>
        </div>

        <NavLink to="/dashboard" className={navClass}>
          Dashboard
        </NavLink>

        <NavLink to="/products" className={navClass}>
          Products
        </NavLink>

        {user?.role === "admin" && (
          <NavLink to="/add-product" className={navClass}>
            Add Product
          </NavLink>
        )}

        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-3 bg-gray-50 rounded-2xl px-4 py-2">
            <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>

            <div>
              <p className="font-semibold text-gray-800 leading-none">
                {user?.name}
              </p>
              <span
                className={`inline-flex mt-1 items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${
                  user?.role === "admin"
                    ? "bg-green-100 text-green-700"
                    : "bg-sky-100 text-sky-700"
                }`}
              >
                {user?.role === "admin" ? (
                  <FaUserShield size={10} />
                ) : (
                  <FaUser size={10} />
                )}
                {user?.role === "admin" ? "Admin" : "User"}
              </span>
            </div>
          </div>

          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-xl font-medium transition"
          >
            Logout
          </button>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden text-2xl">
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t bg-white px-5 py-4 space-y-2">
          <NavLink
            onClick={() => setOpen(false)}
            to="/dashboard"
            className={link}
          >
            Dashboard
          </NavLink>
          <NavLink
            onClick={() => setOpen(false)}
            to="/products"
            className={link}
          >
            Products
          </NavLink>
          {user?.role === "admin" && (
            <NavLink
              onClick={() => setOpen(false)}
              to="/add-product"
              className={link}
            >
              Add Product
            </NavLink>
          )}
          <div className="pt-3 border-t flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-gray-800">{user?.name}</h3>
              <span
                className={`inline-flex items-center mt-1 px-3 py-1 rounded-full text-xs font-semibold ${
                  user?.role === "admin"
                    ? "bg-green-100 text-green-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {user?.role?.toUpperCase()}
              </span>
            </div>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
