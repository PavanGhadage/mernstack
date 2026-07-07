import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import { FaArrowLeft, FaEdit } from "react-icons/fa";

function ViewProduct() {
  const { id } = useParams();

  const token = localStorage.getItem("token");

  const [product, setProduct] = useState({});

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        `http://localhost:5000/api/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setProduct(response.data.product);
    } catch (error) {
      setError(error.response?.data?.message || "Unable to fetch product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 mb-5 text-blue-600 hover:text-blue-800"
          >
            <FaArrowLeft />
            Back to Products
          </Link>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-3xl font-bold mb-8">Product Details</h1>

            {loading ? (
              <div className="flex justify-center py-10">
                <div className="h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : error ? (
              <div className="bg-red-100 text-red-600 p-3 rounded-lg">
                {error}
              </div>
            ) : (
              <>
                <div className="flex justify-center mb-8">
                  <img
                    src={`http://localhost:5000/uploads/${product.image}`}
                    alt={product.name}
                    className="w-72 h-72 object-cover rounded-xl border shadow-md"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-gray-500 font-medium">
                      Product Name
                    </label>

                    <p className="text-xl font-semibold mt-2">{product.name}</p>
                  </div>

                  <div>
                    <label className="text-gray-500 font-medium">Price</label>

                    <p className="text-xl font-semibold mt-2">
                      ₹ {product.price}
                    </p>
                  </div>

                  <div>
                    <label className="text-gray-500 font-medium">
                      Quantity
                    </label>

                    <p className="text-xl font-semibold mt-2">
                      {product.quantity}
                    </p>
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-gray-500 font-medium">
                      Description
                    </label>

                    <p className="mt-2 leading-7 text-gray-700">
                      {product.description}
                    </p>
                  </div>
                </div>

                <div className="mt-10 flex gap-4">
                  <Link
                    to="/products"
                    className="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-100 transition"
                  >
                    Back
                  </Link>

                  <Link
                    to={`/edit-product/${product.id}`}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                  >
                    Edit Product
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewProduct;
