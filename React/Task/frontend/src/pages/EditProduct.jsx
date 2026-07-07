import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [image, setImage] = useState(null);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProduct(res.data.product);
    } catch (error) {
      alert(error.response?.data?.message || "Unable to fetch product");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct({
      ...product,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validateForm = () => {
    let newErrors = {
      name: "",
      description: "",
      price: "",
      quantity: "",
    };

    if (!product.name.trim()) {
      newErrors.name = "Product name is required";
    } else if (!/^[A-Za-z][A-Za-z0-9\s-]{2,49}$/.test(product.name)) {
      newErrors.name = "Enter a valid product name";
    }

    if (!product.description.trim()) {
      newErrors.description = "Description is required";
    } else if (product.description.length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }

    if (!product.price) {
      newErrors.price = "Price is required";
    } else if (Number(product.price) <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    if (!product.quantity) {
      newErrors.quantity = "Quantity is required";
    } else if (Number(product.quantity) <= 0) {
      newErrors.quantity = "Quantity must be greater than 0";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((v) => v === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);
      const formData = new FormData();

      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("price", product.price);
      formData.append("quantity", product.quantity);

      if (image) {
        formData.append("image", image);
      }

      const res = await axios.put(
        `http://localhost:5000/api/products/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert(res.data.message);
      navigate("/products");
    } catch (error) {
      alert(error.response?.data?.message || "Unable to update product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 py-10">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-2">Edit Product</h1>
          <p className="text-gray-500 mb-8">Update product details.</p>

          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block mb-2 font-medium">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block mb-2 font-medium">Price</label>
                <input
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                />
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                )}
              </div>
            </div>

            <div className="mt-5">
              <label className="block mb-2 font-medium">Description</label>
              <textarea
                rows="4"
                name="description"
                value={product.description}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description}
                </p>
              )}
            </div>

            <div className="mt-5">
              <label className="block mb-2 font-medium">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={product.quantity}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />
              {errors.quantity && (
                <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>
              )}
            </div>
            <div className="mt-5">
              <label className="block mb-2 font-medium">Product Image</label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="w-full border rounded-lg p-3"
              />
            </div>
            <div className="flex justify-end gap-3 mt-8">
              <button
                type="button"
                onClick={() => navigate("/products")}
                className="px-6 py-3 rounded-lg border hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
              >
                {loading ? "Updating..." : "Update Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditProduct;
