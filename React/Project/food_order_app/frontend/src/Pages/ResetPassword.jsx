import React, { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function ResetPassword() {
  const navigate = useNavigate();

  const email = localStorage.getItem("resetEmail");
  const otp = localStorage.getItem("resetOTP");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  React.useEffect(() => {
    if (!email || !otp) {
      navigate("/forgot");
    }
  }, [email, otp, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password.trim()) {
      return toast.error("Password is required");
    }

    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);

      const res = await API.post("/api/users/reset-password", {
        email,
        otp,
        password,
      });

      toast.success(res.data.message);

      localStorage.removeItem("resetEmail");
      localStorage.removeItem("resetOTP");

      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container-fluid min-vh-100 d-flex justify-content-center align-items-center"
      style={{
        background: "linear-gradient(to right,#ff512f,#dd2476)",
      }}
    >
      <div
        className="bg-white shadow-lg rounded-4 p-5 w-100"
        style={{ maxWidth: "450px" }}
      >
        <h2 className="text-center text-danger fw-bold">Reset Password</h2>

        <p className="text-center text-muted mb-4">Create your new password</p>

        <form onSubmit={handleSubmit}>
          {/* New Password */}
          <div className="mb-3">
            <label className="form-label fw-semibold">New Password</label>

            <div className="position-relative">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control form-control-lg pe-5"
                placeholder="Enter New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <span
                className="position-absolute top-50 end-0 translate-middle-y me-3"
                style={{ cursor: "pointer" }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="form-label fw-semibold">Confirm Password</label>

            <div className="position-relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="form-control form-control-lg pe-5"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <span
                className="position-absolute top-50 end-0 translate-middle-y me-3"
                style={{ cursor: "pointer" }}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <button className="btn btn-danger btn-lg w-100" disabled={loading}>
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
