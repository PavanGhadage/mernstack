import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaBoxOpen, FaPlusCircle } from "react-icons/fa";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    getProductCount();
  }, []);

  const getProductCount = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTotalProducts(response.data.totalProducts);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto px-5 py-8">
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome, {user?.name} 👋
            </h1>

            <p className="text-gray-500 mt-2">
              Manage your products quickly and efficiently from your dashboard.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <p className="text-gray-500 text-sm">Total Products</p>

              <h2 className="text-4xl font-bold mt-3 text-blue-600">
                {totalProducts}
              </h2>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <p className="text-gray-500 text-sm">Logged In User</p>

              <h2 className="text-2xl font-semibold mt-3">{user?.name}</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
