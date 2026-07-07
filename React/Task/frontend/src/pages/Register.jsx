import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser({
      ...user,
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
      email: "",
      password: "",
    };

    //name
    if (!user.name.trim()) {
      newErrors.name = "Name is required";
    } else if (!/^[A-Za-z ]{3,30}$/.test(user.name)) {
      newErrors.name = "Name should contain only letters (3-30 characters)";
    }

    //mail
    if (!user.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(user.email)
    ) {
      newErrors.email = "Enter a valid email";
    }

    //pass
    if (!user.password) {
      newErrors.password = "Password is required";
    } else if (
      !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,20}$/.test(user.password)
    ) {
      newErrors.password =
        "Password must be 6-20 characters and contain letters & numbers";
    }

    setErrors(newErrors);

    return Object.values(newErrors).every((value) => value === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        user,
      );

      alert(response.data.message);

      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">
      <div className="bg-white w-full max-w-md shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Register</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-medium mb-2">Name</label>

            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              placeholder="Enter Name"
              className="w-full border rounded-lg p-3"
            />

            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2">Email</label>

            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Enter Email"
              className="w-full border rounded-lg p-3"
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="mb-6">
            <label className="block font-medium mb-2">Password</label>

            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="Enter Password"
              className="w-full border rounded-lg p-3"
            />

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center mt-6">
          Already have an account?{" "}
          <Link to="/" className="text-blue-600 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
