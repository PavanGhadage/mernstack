import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function VerifyOTP() {
  const navigate = useNavigate();

  const email = localStorage.getItem("resetEmail");

  const [otp, setOtp] = useState("");

  const [loading, setLoading] = useState(false);

  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    if (!email) {
      navigate("/forgot");
    }
  }, []);

  useEffect(() => {
    if (seconds === 0) return;

    const timer = setTimeout(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [seconds]);

  const verifyOTP = async (e) => {
    e.preventDefault();

    if (!otp.trim()) {
      return toast.error("Please Enter OTP");
    }

    try {
      setLoading(true);

      const res = await API.post("/api/users/verify-otp", {
        email,
        otp,
      });

      toast.success(res.data.message);

      localStorage.setItem("resetOTP", otp);

      navigate("/reset-password");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const resendOTP = async () => {
    try {
      await API.post("/api/users/send-otp", {
        email,
      });

      toast.success("OTP Sent Again");

      setSeconds(60);
    } catch (err) {
      toast.error("Failed To Send OTP");
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
        className="bg-white shadow rounded-4 p-5 w-100"
        style={{
          maxWidth: "450px",
        }}
      >
        <h2 className="text-center text-danger fw-bold">Verify OTP</h2>

        <p className="text-center text-muted">OTP sent to</p>

        <p className="text-center fw-bold">{email}</p>

        <form onSubmit={verifyOTP}>
          <div className="mb-3">
            <label className="form-label">Enter OTP</label>

            <input
              type="text"
              maxLength={6}
              className="form-control form-control-lg text-center"
              placeholder="123456"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>

          <button className="btn btn-danger w-100 btn-lg" disabled={loading}>
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <div className="text-center mt-3">
          {seconds > 0 ? (
            <p className="text-muted">Resend OTP in {seconds}s</p>
          ) : (
            <button className="btn btn-link" onClick={resendOTP}>
              Resend OTP
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default VerifyOTP;
