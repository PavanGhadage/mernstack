import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import { FaPlus, FaEye, FaEdit, FaTrash } from "react-icons/fa";

function ProductList() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts(response.data.products);
      setFilteredProducts(response.data.products);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const result = products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase()),
    );

    setFilteredProducts(result);
  }, [search, products]);

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `http://localhost:5000/api/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert(response.data.message);

      getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
            <h1 className="text-3xl font-bold">Products</h1>

            <Link
              to="/add-product"
              className="bg-blue-600 text-white px-5 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-700 w-fit"
            >
              <FaPlus />
              Add Product
            </Link>
          </div>
          <input
            type="text"
            placeholder="Search Product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-80 border rounded-lg p-3 mb-6 outline-none"
          />
          {/* //checl loadig */}
          {loading ? (
            <h2 className="text-center text-xl">Loading...</h2>
          ) : filteredProducts.length === 0 ? (
            <div className="bg-white rounded-xl shadow p-10 text-center">
              <h2 className="text-2xl font-semibold">No Products Found</h2>
            </div>
          ) : (
            <div className="overflow-x-auto bg-white rounded-xl shadow">
              <table className="w-full">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="p-4 text-left">#</th>

                    <th className="p-4 text-left">Image</th>

                    <th className="p-4 text-left">Product</th>

                    <th className="p-4 text-left">Price</th>

                    <th className="p-4 text-left">Quantity</th>

                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>
                {/* //table */}
                <tbody>
                  {filteredProducts.map((product, index) => (
                    <tr key={product.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">{index + 1}</td>

                      <td className="p-4">
                        <img
                          src={`http://localhost:5000/uploads/${product.image}`}
                          alt={product.name}
                          className="w-16 h-16 rounded-lg object-cover border"
                        />
                      </td>

                      <td className="p-4 font-medium">{product.name}</td>

                      <td className="p-4">₹ {product.price}</td>

                      <td className="p-4">{product.quantity}</td>

                      <td className="p-4">
                        <div className="flex justify-center gap-4">
                          <Link
                            to={`/view-product/${product.id}`}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <FaEye size={18} />
                          </Link>
                          {/* //only admin can update and delete */}
                          {(user.role === "admin" ||
                            product.user_id === user.id) && (
                            <>
                              <Link
                                to={`/edit-product/${product.id}`}
                                className="text-green-600 hover:text-green-800"
                              >
                                <FaEdit size={18} />
                              </Link>

                              <button
                                onClick={() => deleteProduct(product.id)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <FaTrash size={18} />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ProductList;
