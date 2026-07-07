import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    api: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const validateForm = () => {
    let newErrors = {
      email: "",
      password: "",
      api: "",
    };

    // Email Validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email";
    }

    // Password Validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    return Object.values(newErrors).every((value) => value === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData,
      );

      localStorage.setItem("token", response.data.token);

      localStorage.setItem("user", JSON.stringify(response.data.user));

      navigate("/dashboard");
    } catch (error) {
      setErrors({
        ...errors,
        api: error.response?.data?.message || "Unable to connect to backend",
      });
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

        {errors.api && (
          <p className="text-red-500 mb-3 text-center">{errors.api}</p>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 rounded mb-4"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mb-3">{errors.email}</p>
          )}

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-2 rounded mb-4"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mb-3">{errors.password}</p>
          )}
          <button className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700">
            Login
          </button>
        </form>

        <p className="text-center mt-5">
          Don't have an account?
          <Link to="/register" className="text-blue-600 ml-2">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
