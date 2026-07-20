import API from "../api/axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import loadRazorpay from "../utils/loadRazorpay";
function Ordernow() {
  const location = useLocation();
  const nav = useNavigate();

  const item = location.state?.item;
  const qty = location.state?.qty || 1;
  const total = location.state?.total || 0;

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    city: "",
    address: "",
    payment: "",
  });

  const [error, setError] = useState({});

  const nameRegex = /^[A-Za-z\s]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mobileRegex = /^[0-9]{10}$/;
  const addressRegex = /^(?=.*[A-Za-z])[A-Za-z0-9\s,.-]{10,}$/;
  const cityRegex = /^[A-Za-z\s]+$/;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  // ✅ SMART VALIDATION (same pattern as Checkout)
  const validate = () => {
    let isError = false;

    let err = {
      name: "",
      email: "",
      mobile: "",
      city: "",
      address: "",
      payment: "",
    };

    if (!form.name) {
      isError = true;
      err.name = "Name is required";
    } else if (!nameRegex.test(form.name)) {
      isError = true;
      err.name = "Only letters allowed";
    }

    if (!form.email) {
      isError = true;
      err.email = "Email is required";
    } else if (!emailRegex.test(form.email)) {
      isError = true;
      err.email = "Invalid email format";
    }

    if (!form.mobile) {
      isError = true;
      err.mobile = "Mobile is required";
    } else if (!mobileRegex.test(form.mobile)) {
      isError = true;
      err.mobile = "Must be 10 digits";
    }

    if (!form.city) {
      isError = true;
      err.city = "City is required";
    } else if (!cityRegex.test(form.city)) {
      isError = true.err.city = "Only letters allowed";
    }

    if (!form.address) {
      isError = true;
      err.address = "Address is required";
    } else if (/^[0-9\s]+$/.test(form.address)) {
      isError = true;
      err.address = "Address cannot be only numbers";
    } else if (!addressRegex.test(form.address)) {
      isError = true;
      err.address = "Invalid address format";
    }

    if (!form.payment) {
      isError = true;
      err.payment = "Select payment method";
    }

    setError(err);
    return !isError;
  };
  const saveOrder = async (paymentType, paymentStatus, razorpayData = {}) => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    return await API.post(
      "/api/orders",
      {
        ...form,

        userEmail: currentUser.email,

        cartItems: [
          {
            ...item,
            qty,
          },
        ],

        total,

        payment: paymentType,

        paymentStatus,

        razorpayOrderId: razorpayData.razorpay_order_id || "",

        razorpayPaymentId: razorpayData.razorpay_payment_id || "",

        razorpaySignature: razorpayData.razorpay_signature || "",

        status: "Placed",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  };
  const handleCOD = async () => {
    try {
      await saveOrder("COD", "Pending");

      toast.success("Order Placed Successfully 🎉");

      nav("/");
    } catch (error) {
      console.log(error);

      toast.error("Failed to place order");
    }
  };
  const handleRazorpay = async () => {
    const loaded = await loadRazorpay();

    if (!loaded) {
      toast.error("Razorpay SDK failed to load");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const { data } = await API.post(
        "/api/payment/create-order",
        {
          amount: total,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: data.order.amount,

        currency: data.order.currency,

        name: "Food Ordering App",

        description: "Order Payment",

        order_id: data.order.id,

        prefill: {
          name: form.name,
          email: form.email,
          contact: form.mobile,
        },

        theme: {
          color: "#16a34a",
        },

        handler: async function (response) {
          try {
            const verify = await API.post(
              "/api/payment/verify",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              },
            );

            if (!verify.data.success) {
              toast.error("Payment Verification Failed");
              return;
            }

            // ✅ Save Order
            await saveOrder("Razorpay", "Paid", response);

            // ✅ Success Message
            toast.success("Payment Successful 🎉");

            // ✅ Redirect
            nav("/");
          } catch (error) {
            console.log(error);
            toast.error("Payment Verification Failed");
          }
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", function () {
        toast.error("Payment Failed");
      });

      razorpay.open();
    } catch (error) {
      console.log(error);

      toast.error("Payment Failed");
    }
  };
  const handleSubmit = async () => {
    if (!validate()) return;

    if (form.payment === "COD") {
      return handleCOD();
    }

    return handleRazorpay();
  };

  if (!item) {
    return (
      <div className="container text-center py-5">
        <h2>No Order Found ❌</h2>
        <button className="btn btn-dark mt-3" onClick={() => nav("/")}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="card border-0 shadow-lg rounded-5 p-5">
        {/* HEADER */}
        <div className="text-center mb-5">
          <h1 className="fw-bold display-5">🍔 Order Now</h1>
          <p className="text-secondary fs-5">Complete your order</p>
        </div>

        <div className="row g-5">
          {/* LEFT FORM */}
          <div className="col-lg-7">
            <h3 className="fw-bold mb-4">👤 Customer Details</h3>

            <input
              name="name"
              className="form-control rounded-4 p-3"
              placeholder="Full Name"
              onChange={handleChange}
            />
            <small className="text-danger">{error.name}</small>

            <input
              name="email"
              className="form-control rounded-4 p-3 mt-3"
              placeholder="Email"
              onChange={handleChange}
            />
            <small className="text-danger">{error.email}</small>

            <input
              name="mobile"
              className="form-control rounded-4 p-3 mt-3"
              placeholder="Mobile"
              onChange={handleChange}
            />
            <small className="text-danger">{error.mobile}</small>

            <input
              name="city"
              className="form-control rounded-4 p-3 mt-3"
              placeholder="City"
              onChange={handleChange}
            />
            <small className="text-danger">{error.city}</small>

            <textarea
              name="address"
              className="form-control rounded-4 p-3 mt-3"
              rows="4"
              placeholder="🏠 Example: Flat 101, ABC Apartment, MG Road, Pune - 411001 (Min 10 chars)"
              onChange={handleChange}
            ></textarea>
            <small className="text-danger">{error.address}</small>

            <h4 className="mt-4 fw-bold">Payment</h4>

            <div className="border p-3 rounded-3 mt-2">
              <input
                type="radio"
                name="payment"
                value="COD"
                onChange={handleChange}
              />{" "}
              COD
            </div>

            <div className="border p-3 rounded-3 mt-2">
              <input
                type="radio"
                name="payment"
                value="UPI"
                onChange={handleChange}
              />{" "}
              UPI
            </div>

            <div className="border p-3 rounded-3 mt-2">
              <input
                type="radio"
                name="payment"
                value="CARD"
                onChange={handleChange}
              />{" "}
              Card
            </div>

            <small className="text-danger">{error.payment}</small>
          </div>

          {/* RIGHT SUMMARY */}
          <div className="col-lg-5">
            <div className="bg-light p-4 rounded-4 shadow-sm">
              <h3 className="fw-bold mb-4">🛒 Order Summary</h3>

              <div className="d-flex justify-content-between mb-3">
                <span>{item.name}</span>
                <span>₹{parseInt(item.price?.slice(1) || 0)}</span>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <span>Qty</span>
                <span>{qty}</span>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <span>Total</span>
                <span className="text-success">₹{total}</span>
              </div>

              <button
                className="btn btn-success w-100 mt-3"
                onClick={handleSubmit}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ordernow;
