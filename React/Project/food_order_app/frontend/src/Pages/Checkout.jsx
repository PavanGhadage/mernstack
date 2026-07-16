import API from "../api/axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function Checkout() {
  const location = useLocation();
  const nav = useNavigate();

  const cartItems = location.state?.cartItems || [];

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
    const name = e.target.name;
    const value = e.target.value;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const validate = () => {
    let iserror = false;

    let err = {
      name: "",
      email: "",
      mobile: "",
      city: "",
      address: "",
      payment: "",
    };

    if (!form.name) {
      iserror = true;
      err.name = "Name is required";
    }

    if (form.name && !nameRegex.test(form.name)) {
      iserror = true;
      err.name = "Only letters allowed in name";
    }

    if (!form.email) {
      iserror = true;
      err.email = "Email is required";
    } else if (!emailRegex.test(form.email)) {
      iserror = true;
      err.email = "Invalid email format";
    }

    if (!form.mobile) {
      iserror = true;
      err.mobile = "Mobile number is required";
    } else if (!mobileRegex.test(form.mobile)) {
      iserror = true;
      err.mobile = "Mobile must be 10 digits";
    }

    if (!form.city) {
      iserror = true;
      err.city = "City is required";
    } else if (!cityRegex.test(form.city)) {
      iserror = true;
      err.city = "City must contain only letters";
    }

    if (!form.address) {
      iserror = true;
      err.address = "Address is required";
    } else if (!addressRegex.test(form.address)) {
      iserror = true;
      err.address = "Invalid address format";
    }

    if (!form.payment) {
      iserror = true;
      err.payment = "Select payment method";
    }

    setError(err);
    return !iserror;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const currentUser = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    await API.post(
      "/api/orders",
      {
        ...form,

        cartItems: cartItems.map((item) => ({
          id: item._id,
          name: item.name,
          image: item.image,
          price: item.price,
          qty: item.qty,
        })),

        total,
        userEmail: currentUser.email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    toast.success("Order Placed Successfully 🎉");

    nav("/orders");
  };

  return (
    <div className="container-fluid container-lg py-4 py-md-5">
      <div className="card border-0 shadow-lg rounded-5 p-3 p-md-5">
        {/* HEADER */}
        <div className="text-center mb-5">
          <h1 className="fw-bold display-6 display-md-5">🧾 Checkout</h1>
          <p className="text-secondary fs-5">
            Fill all details to place your order
          </p>
        </div>

        <div className="row g-5">
          {/* LEFT SIDE */}
          <div className="col-12 col-lg-7">
            <h3 className="fw-bold mb-4">👤 Customer Details</h3>

            <input
              name="name"
              value={form.name}
              className="form-control rounded-4 p-3"
              placeholder="Full Name"
              onChange={handleChange}
            />
            <small className="text-danger">{error.name}</small>

            <input
              name="email"
              value={form.email}
              className="form-control rounded-4 p-3 mt-3"
              placeholder="Email Address"
              onChange={handleChange}
            />
            <small className="text-danger">{error.email}</small>

            <input
              name="mobile"
              value={form.mobile}
              className="form-control rounded-4 p-3 mt-3"
              placeholder="Mobile Number"
              onChange={handleChange}
            />
            <small className="text-danger">{error.mobile}</small>

            <input
              name="city"
              value={form.city}
              className="form-control rounded-4 p-3 mt-3"
              placeholder="City"
              onChange={handleChange}
            />
            <small className="text-danger">{error.city}</small>

            {/* ONLY CHANGE IS HERE */}
            <textarea
              name="address"
              value={form.address}
              className="form-control rounded-4 p-3 mt-3"
              rows="5"
              placeholder="🏠 Example: Flat 101, ABC Apartment, MG Road, Shivaji Nagar, Pune - 411001 (Min 10 chars, must include letters)"
              onChange={handleChange}
            ></textarea>

            <small className="text-danger">{error.address}</small>

            <h3 className="fw-bold mt-4">💳 Payment Method</h3>

            <div className="border rounded-4 p-3 mt-3 d-flex align-items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="COD"
                checked={form.payment === "COD"}
                onChange={handleChange}
              />{" "}
              Cash On Delivery
            </div>

            <div className="border rounded-4 p-3 mt-2 d-flex align-items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="UPI"
                checked={form.payment === "UPI"}
                onChange={handleChange}
              />{" "}
              UPI Payment
            </div>

            <div className="border rounded-4 p-3 mt-2 d-flex align-items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="CARD"
                checked={form.payment === "CARD"}
                onChange={handleChange}
              />{" "}
              Debit / Credit Card
            </div>

            <small className="text-danger">{error.payment}</small>
          </div>

          {/* RIGHT SIDE */}
          <div className="col-12 col-lg-5">
            <div className="bg-light rounded-5 p-4 shadow-sm">
              <h3 className="fw-bold mb-4">🛒 Order Summary</h3>

              {cartItems.map((item) => {
                const price = parseInt(item.price.slice(1));

                return (
                  <div
                    key={item._id}
                    className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3"
                  >
                    <span className="fw-semibold">{item.name}</span>

                    <div className="text-end">
                      <div className="fw-bold text-success">
                        ₹{price * item.qty}
                      </div>

                      <small className="text-secondary">
                        <small className="text-secondary">
                          ₹{price} × {item.qty}
                        </small>
                      </small>
                    </div>
                  </div>
                );
              })}

              <hr />

              <div className="d-flex justify-content-between mb-3">
                <span>Delivery Charge</span>
                <span>₹50</span>
              </div>

              <div className="d-flex justify-content-between fw-bold fs-4">
                <span>Total</span>
                <span className="text-success">₹{total + 50}</span>
              </div>

              <button
                className="btn btn-success w-100 rounded-pill fw-bold py-3 mt-4 shadow"
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

export default Checkout;
