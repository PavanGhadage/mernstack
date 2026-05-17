import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function LoginPage() {
  const nav = useNavigate();

  const [data, setData] = useState([]);

  const [showpass, setShowpass] = useState(false);

  const [logdata, setLogdata] = useState({
    email: "",
    password: "",
  });

  const [mailerror, setMailerror] = useState("");
  const [passerror, setPasserror] = useState("");

  // FETCH USERS
  useEffect(() => {
    const fetching = async () => {
      try {
        const result = await axios.get("http://localhost:3000/logincred");

        setData(result.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetching();
  }, []);

  // VALIDATION
  const validateform = () => {
    let iserror = false;

    setMailerror("");
    setPasserror("");

    // EMAIL
    if (!logdata.email.trim()) {
      setMailerror("Please enter email");
      iserror = true;
    } else if (!/\S+@\S+\.\S+/.test(logdata.email)) {
      setMailerror("Invalid email format");
      iserror = true;
    }

    // PASSWORD
    if (!logdata.password.trim()) {
      setPasserror("Please enter password");
      iserror = true;
    }

    if (iserror) return true;

    // CHECK EMAIL
    const emailExists = data.find((item) => item.email === logdata.email);

    if (!emailExists) {
      setMailerror("Email does not exist");
      return true;
    }

    // CHECK PASSWORD
    if (emailExists.password !== logdata.password) {
      setPasserror("Password is incorrect");
      return true;
    }

    return false;
  };

  // SUBMIT
  const submit = (e) => {
    e.preventDefault();

    const hasError = validateform();

    if (hasError) return;

    const userData = data.find((item) => item.email === logdata.email);

    localStorage.setItem("isLogin", true);

    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        name: userData.name,
        email: userData.email,
        mobile: userData.mobile,
      }),
    );

    alert("Login Successful ✅");

    nav("/");
  };

  return (
    <div
      className="container-fluid min-vh-100 d-flex justify-content-center align-items-center"
      style={{
        background: "linear-gradient(to right, #ff512f, #dd2476)",
      }}
    >
      <div
        className="p-5 shadow-lg w-100"
        style={{
          maxWidth: "500px",
          borderRadius: "25px",
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(15px)",
        }}
      >
        <h1 className="text-center fw-bold mb-2 text-white">Welcome Back</h1>

        <p className="text-center text-light mb-4">
          Login to continue ordering food
        </p>

        <form onSubmit={submit}>
          {/* EMAIL */}
          <div className="mb-3">
            <label className="form-label text-white fw-semibold">
              Email Address
            </label>

            <input
              type="email"
              className="form-control form-control-lg rounded-3"
              placeholder="Enter your email address"
              autoComplete="email"
              value={logdata.email}
              onChange={(e) => {
                setLogdata({
                  ...logdata,
                  email: e.target.value,
                });
              }}
            />

            {mailerror && (
              <small className="text-warning d-block mt-1 fw-semibold">
                {mailerror}
              </small>
            )}
          </div>

          {/* PASSWORD */}
          <div className="mb-3">
            <label className="form-label text-white fw-semibold">
              Password
            </label>

            <div className="position-relative">
              <input
                type={showpass ? "text" : "password"}
                className="form-control form-control-lg rounded-3 pe-5"
                placeholder="Enter your password"
                autoComplete="current-password"
                value={logdata.password}
                onChange={(e) => {
                  setLogdata({
                    ...logdata,
                    password: e.target.value,
                  });
                }}
              />

              <span
                className="position-absolute top-50 end-0 translate-middle-y me-3"
                style={{ cursor: "pointer" }}
                onClick={() => setShowpass(!showpass)}
              >
                {showpass ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>

            {passerror && (
              <small className="text-warning d-block mt-1 fw-semibold">
                {passerror}
              </small>
            )}
          </div>

          {/* REMEMBER */}
          <div className="d-flex justify-content-between mb-4 text-white">
            <div>
              <input type="checkbox" className="form-check-input me-2" />
              <label>Remember Me</label>
            </div>

            <span
              className="fw-semibold text-warning"
              style={{ cursor: "pointer" }}
              onClick={() => {
                nav("/forgot");
              }}
            >
              Forgot Password?
            </span>
          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className="btn btn-light btn-lg w-100 rounded-3 fw-bold text-danger"
          >
            Login
          </button>

          {/* SIGNUP */}
          <p
            className="text-center mt-4 text-white"
            style={{ cursor: "pointer" }}
            onClick={() => nav("/signup")}
          >
            Don't have an account?
            <span className="fw-bold ms-2 text-warning">Signup</span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
