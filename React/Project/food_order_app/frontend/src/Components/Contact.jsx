import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    date: "",
    message: "",
  });

  const [error, setError] = useState({});

  const nameRegex = /^[A-Za-z\s]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let err = {};
    let isError = false;

    if (!form.name) {
      err.name = "Name is required";
      isError = true;
    } else if (!nameRegex.test(form.name)) {
      err.name = "Only letters allowed";
      isError = true;
    }

    if (!form.email) {
      err.email = "Email is required";
      isError = true;
    } else if (!emailRegex.test(form.email)) {
      err.email = "Invalid email format";
      isError = true;
    }

    if (!form.message) {
      err.message = "Message is required";
      isError = true;
    } else if (form.message.length < 10) {
      err.message = "Message must be at least 10 characters";
      isError = true;
    }
    if (!form.date) {
      err.date = "Date is required";
      isError = true;
    }

    setError(err);
    return !isError;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    await axios.post("http://localhost:5000/api/contact", form);

    toast.success("Message Sent Successfully 📩");
    setForm({
      name: "",
      email: "",
      date: "",
      message: "",
    });
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          {/* HEADER */}
          <div className="text-center mb-4">
            <h1 className="fw-bold display-6 display-md-5">📞 Contact Us</h1>
            <p className="text-secondary">
              We would love to hear from you. Send us your feedback or
              questions.
            </p>
          </div>

          {/* FORM CARD */}
          <div className="card shadow-lg border-0 rounded-5 p-3 p-md-4">
            {/* NAME */}
            <label className="fw-bold mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="form-control rounded-4 p-3"
              placeholder="Enter your full name"
            />
            <small className="text-danger">{error.name}</small>

            {/* EMAIL */}
            <label className="fw-bold mt-3 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="form-control rounded-4 p-3"
              placeholder="Enter your email"
            />
            <small className="text-danger">{error.email}</small>

            {/* MESSAGE */}
            <label className="fw-bold mt-3 mb-1">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows="4"
              className="form-control rounded-4 p-3"
              placeholder="Write your message here..."
            ></textarea>
            <small className="text-danger">{error.message}</small>
            {/* DATE */}
            <label className="fw-bold mt-3 mb-1">Date</label>

            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="form-control rounded-4 p-3"
            />

            <small className="text-danger">{error.date}</small>

            {/* BUTTON */}
            <button
              onClick={handleSubmit}
              className="btn btn-success w-100 mt-4 py-3 rounded-pill fw-bold"
            >
              Send Message 🚀
            </button>
          </div>

          {/* EXTRA INFO */}
          <div className="text-center mt-4 text-secondary">
            <p>📍 Pune, Maharashtra, India</p>
            <p>📞 +91 9876543210</p>
            <p>📧 support@foodieexpress.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
