import React from "react";
import { Link } from "react-router-dom";

function ProtectedRoute({ children }) {
  const user = localStorage.getItem("isLogin");

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-10 text-center max-w-md w-full animate-bounce">
          <div className="text-7xl mb-4">🔒</div>

          <h1 className="text-4xl font-extrabold text-gray-800 mb-3">
            Access Denied
          </h1>

          <p className="text-gray-600 text-lg mb-6">
            Oops! You need to login first to continue your delicious food
            journey 🍔🍕
          </p>

          <Link
            to="/login"
            className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-full text-lg font-bold shadow-lg hover:scale-105 transition-all duration-300 text-decoration-none"
          >
            🚀 Go To Login
          </Link>
        </div>
      </div>
    );
  }

  return children;
}

export default ProtectedRoute;
