import API from "../api/axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

function Forgot() {
  const nav = useNavigate();

  const [users, setUsers] = useState([]);
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmpassword: "",
  });

  const [showPass, setShowPass] = useState(false);
  const [showConPass, setShowConPass] = useState(false);

  const [error, setError] = useState({
    email: "",
    password: "",
    confirmpassword: "",
  });

  const validate = () => {
    let isError = false;
    let err = { email: "", password: "", confirmpassword: "" };

    if (!data.email.trim()) {
      err.email = "Email is required";
      isError = true;
    }

    if (!data.password.trim()) {
      err.password = "Password is required";
      isError = true;
    }

    if (!data.confirmpassword.trim()) {
      err.confirmpassword = "Confirm password is required";
      isError = true;
    } else if (data.password !== data.confirmpassword) {
      err.confirmpassword = "Passwords do not match";
      isError = true;
    }

    setError(err);
    return isError;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) return;

    try {
      // GET users
      const res = await API.get("/api/users");
      const allUsers = res.data;

      const user = allUsers.find((u) => u.email === data.email);

      if (!user) {
        setError({ ...error, email: "User not found" });
        return;
      }

      // UPDATE pass
      await API.patch(`/api/users/${user._id}`, {
        ...user,
        password: data.password,
      });

      toast.success("Password Updated Successfully ✅");
      nav("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className="container-fluid min-vh-100 d-flex justify-content-center align-items-center"
      style={{
        background: "linear-gradient(to right, #ff512f, #dd2476)",
      }}
    >
      <div
        className="bg-white p-5 rounded-4 shadow-lg w-100"
        style={{ maxWidth: "450px" }}
      >
        <h1 className="text-center fw-bold text-danger mb-2">Reset Password</h1>

        <p className="text-center text-muted mb-4">
          Enter email and new password
        </p>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control form-control-lg rounded-3"
              placeholder="Enter email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
            {error.email && (
              <small className="text-danger">{error.email}</small>
            )}
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label fw-semibold">New Password</label>
            <div className="position-relative">
              <input
                type={showPass ? "text" : "password"}
                className="form-control form-control-lg rounded-3 pe-5"
                placeholder="Enter new password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />

              <span
                className="position-absolute top-50 end-0 translate-middle-y me-3"
                style={{ cursor: "pointer" }}
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {error.password && (
              <small className="text-danger">{error.password}</small>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="form-label fw-semibold">Confirm Password</label>

            <div className="position-relative">
              <input
                type={showConPass ? "text" : "password"}
                className="form-control form-control-lg rounded-3 pe-5"
                placeholder="Confirm password"
                value={data.confirmpassword}
                onChange={(e) =>
                  setData({
                    ...data,
                    confirmpassword: e.target.value,
                  })
                }
              />

              <span
                className="position-absolute top-50 end-0 translate-middle-y me-3"
                style={{ cursor: "pointer" }}
                onClick={() => setShowConPass(!showConPass)}
              >
                {showConPass ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {error.confirmpassword && (
              <small className="text-danger">{error.confirmpassword}</small>
            )}
          </div>

          {/* Button */}
          <button className="btn btn-danger w-100 btn-lg fw-semibold rounded-3">
            Update Password
          </button>

          {/* Back */}
          <p
            className="text-center mt-3 text-muted"
            style={{ cursor: "pointer" }}
            onClick={() => nav("/login")}
          >
            Back to <span className="text-danger fw-bold">Login</span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Forgot;
