import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

function AddProduct() {
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

  //forhandling input value change
  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  //form submission
  const validateForm = () => {
    let newErrors = {
      name: "",
      description: "",
      price: "",
      quantity: "",
    };
    const handleSubmit = async (e) => {
      e.preventDefault();

      if (!validateForm()) return;

      try {
        setLoading(true);

        const response = await axios.post(
          "http://localhost:5000/api/products",
          product,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        alert(response.data.message);

        navigate("/products");
      } catch (error) {
        alert(error.response?.data?.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };
    //error handling at timme of submission

    if (!product.name.trim()) {
      newErrors.name = "Product Name is required";
    } else if (!/^[A-Za-z0-9 ]{3,50}$/.test(product.name)) {
      newErrors.name =
        "Name should be 3-50 characters and contain only letters and numbers";
    }

    if (!product.description.trim()) {
      newErrors.description = "Description is required";
    } else if (product.description.length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }

    if (!product.price) {
      newErrors.price = "Price is required";
    } else if (!/^[0-9]+(\.[0-9]{1,2})?$/.test(product.price)) {
      newErrors.price = "Enter a valid price";
    } else if (Number(product.price) <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    if (!product.quantity) {
      newErrors.quantity = "Quantity is required";
    } else if (!/^[0-9]+$/.test(product.quantity)) {
      newErrors.quantity = "Quantity must be a whole number";
    } else if (Number(product.quantity) <= 0) {
      newErrors.quantity = "Quantity must be greater than 0";
    }
    if (!image) {
      setMessage("Please select a product image.");
      return;
    }

    setErrors(newErrors);

    return Object.values(newErrors).every((value) => value === "");
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
      formData.append("image", image);

      const response = await axios.post(
        "http://localhost:5000/api/products",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert(response.data.message);

      navigate("/products");
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 py-10">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-2">Add Product</h1>

          <p className="text-gray-500 mb-8">
            Fill in the details below to create a new product.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block mb-2 font-medium">Product Name</label>

                <input
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  placeholder="Enter Product Name"
                  className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}

              <div>
                <label className="block mb-2 font-medium">Price</label>

                <input
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  placeholder="Enter Price"
                  className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">{errors.price}</p>
            )}

            <div className="mt-5">
              <label className="block mb-2 font-medium">Description</label>

              <textarea
                rows="4"
                name="description"
                value={product.description}
                onChange={handleChange}
                placeholder="Enter Description"
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}

            <div className="mt-5">
              <label className="block mb-2 font-medium">Quantity</label>

              <input
                type="number"
                name="quantity"
                value={product.quantity}
                onChange={handleChange}
                placeholder="Enter Quantity"
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {errors.quantity && (
              <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>
            )}
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
                className="px-6 py-3 rounded-lg border border-gray-400 hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
              >
                {loading ? "Saving..." : "Save Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddProduct;
