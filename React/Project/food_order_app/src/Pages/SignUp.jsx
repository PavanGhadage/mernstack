import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

function SignUp() {
  const nav = useNavigate();

  const [showpass, setshowpass] = useState(false);
  const [showconpass, setshowconpass] = useState(false);

  const [users, setusers] = useState([]);

  const [data, setdata] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmpassword: "",
  });

  const [nameerror, setnameerror] = useState("");
  const [mailerror, setmailerror] = useState("");
  const [mobileerror, setmobileerror] = useState("");
  const [passerror, setpasserror] = useState("");
  const [conpasserror, setconpasserror] = useState("");

  // Fetch Users
  useEffect(() => {
    const fetchdata = async () => {
      try {
        // const result = await axios.get("http://localhost:3000/logincred");
        const result = await axios.get("http://localhost:5000/api/users");

        setusers(result.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchdata();
  }, []);

  // Validation
  const validateform = () => {
    let iserror = false;

    // Name
    if (!data.name.trim()) {
      iserror = true;
      setnameerror("Please enter your full name");
    } else if (!/^[A-Za-z ]+$/.test(data.name)) {
      iserror = true;
      setnameerror("Only alphabets allowed");
    } else {
      setnameerror("");
    }

    // Email
    if (!data.email.trim()) {
      iserror = true;
      setmailerror("Please enter email");
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      iserror = true;
      setmailerror("Invalid email format");
    } else {
      const alreadyuser = users.find((item) => item.email === data.email);

      if (alreadyuser) {
        iserror = true;
        setmailerror("Email already exists");
      } else {
        setmailerror("");
      }
    }

    // Mobile
    if (!data.mobile.trim()) {
      iserror = true;
      setmobileerror("Please enter mobile number");
    } else if (!/^[0-9]{10}$/.test(data.mobile)) {
      iserror = true;
      setmobileerror("Mobile number must be 10 digits");
    } else {
      setmobileerror("");
    }

    // Password
    if (!data.password.trim()) {
      iserror = true;
      setpasserror("Please enter password");
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(data.password)) {
      iserror = true;
      setpasserror("Password must contain uppercase, lowercase and number");
    } else {
      const alreadypassword = users.find(
        (item) => item.password === data.password,
      );

      if (alreadypassword) {
        iserror = true;
        setpasserror("Password already exists");
      } else {
        setpasserror("");
      }
    }

    // Confirm Password
    if (!data.confirmpassword.trim()) {
      iserror = true;
      setconpasserror("Please confirm password");
    } else if (data.confirmpassword !== data.password) {
      iserror = true;
      setconpasserror("Passwords do not match");
    } else {
      setconpasserror("");
    }

    return iserror;
  };

  // Submit
  const onSubmit = async (e) => {
    e.preventDefault();

    const haserror = validateform();

    if (haserror) return;

    try {
      await axios.post("http://localhost:5000/api/users/register", {
        name: data.name,
        email: data.email,
        mobile: data.mobile,
        password: data.password,
        role: "user",
      });

      toast.success("Registration Successful ✅");

      nav("/login");
    } catch (error) {
      console.log(error);
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
        style={{ maxWidth: "500px" }}
      >
        <h1 className="text-center fw-bold mb-2 text-danger">Create Account</h1>

        <p className="text-center text-muted mb-4">
          Signup to continue ordering food
        </p>

        <form onSubmit={onSubmit}>
          {/* Name */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name</label>

            <input
              type="text"
              className="form-control form-control-lg rounded-3"
              placeholder="Enter your full name"
              value={data.name}
              onChange={(e) =>
                setdata({
                  ...data,
                  name: e.target.value,
                })
              }
            />

            {nameerror && <small className="text-danger">{nameerror}</small>}
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Email Address</label>

            <input
              type="email"
              className="form-control form-control-lg rounded-3"
              placeholder="Enter your email"
              value={data.email}
              onChange={(e) =>
                setdata({
                  ...data,
                  email: e.target.value,
                })
              }
            />

            {mailerror && <small className="text-danger">{mailerror}</small>}
          </div>

          {/* Mobile */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Mobile Number</label>

            <input
              type="text"
              className="form-control form-control-lg rounded-3"
              placeholder="Enter mobile number"
              value={data.mobile}
              onChange={(e) =>
                setdata({
                  ...data,
                  mobile: e.target.value,
                })
              }
            />

            {mobileerror && (
              <small className="text-danger">{mobileerror}</small>
            )}
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>

            <div className="position-relative">
              <input
                type={showpass ? "text" : "password"}
                className="form-control form-control-lg rounded-3 pe-5"
                placeholder="Create password"
                value={data.password}
                onChange={(e) =>
                  setdata({
                    ...data,
                    password: e.target.value,
                  })
                }
              />

              <span
                className="position-absolute top-50 end-0 translate-middle-y me-3"
                style={{ cursor: "pointer" }}
                onClick={() => setshowpass(!showpass)}
              >
                {showpass ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>

            {passerror && <small className="text-danger">{passerror}</small>}
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="form-label fw-semibold">Confirm Password</label>

            <div className="position-relative">
              <input
                type={showconpass ? "text" : "password"}
                className="form-control form-control-lg rounded-3 pe-5"
                placeholder="Confirm password"
                value={data.confirmpassword}
                onChange={(e) =>
                  setdata({
                    ...data,
                    confirmpassword: e.target.value,
                  })
                }
              />

              <span
                className="position-absolute top-50 end-0 translate-middle-y me-3"
                style={{ cursor: "pointer" }}
                onClick={() => setshowconpass(!showconpass)}
              >
                {showconpass ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>

            {conpasserror && (
              <small className="text-danger">{conpasserror}</small>
            )}
          </div>

          <button className="btn btn-danger btn-lg w-100 rounded-3 fw-semibold">
            Signup
          </button>

          <p
            className="text-center mt-4 text-muted"
            style={{ cursor: "pointer" }}
            onClick={() => nav("/login")}
          >
            Already have an account?
            <span className="text-danger fw-semibold ms-2">Login</span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
