import { Link } from "react-router-dom";
import { FaExclamationTriangle, FaHome } from "react-icons/fa";

function NotFound() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6">
      <div className="bg-white shadow-lg rounded-2xl p-10 max-w-lg w-full text-center">
        <div className="flex justify-center mb-5">
          <div className="bg-red-100 p-5 rounded-full">
            <FaExclamationTriangle className="text-red-600" size={50} />
          </div>
        </div>

        <h1 className="text-7xl font-extrabold text-gray-800">404</h1>

        <h2 className="text-3xl font-semibold text-gray-700 mt-3">
          Page Not Found
        </h2>

        <p className="text-gray-500 mt-4">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>

        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          <FaHome />
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
