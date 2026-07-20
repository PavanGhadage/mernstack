import React, { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Forgot() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/api/users/send-otp", {
        email,
      });

      toast.success(res.data.message);

      localStorage.setItem("resetEmail", email);

      navigate("/verify-otp");
    } catch (err) {
      console.log(err);

      toast.error(err.response?.data?.message || "Failed to send OTP");
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
        <h2 className="text-center text-danger fw-bold">Forgot Password</h2>

        <p className="text-center text-muted mb-4">
          Enter your registered email.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>

            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {error && <small className="text-danger">{error}</small>}
          </div>

          <button className="btn btn-danger w-100 btn-lg" disabled={loading}>
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>

          <p
            className="text-center mt-3"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Back to
            <span className="text-danger fw-bold"> Login</span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Forgot;
