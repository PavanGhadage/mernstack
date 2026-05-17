import React from "react";
import { useNavigate } from "react-router-dom";

function About() {
  const nav = useNavigate();
  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      {/* HERO SECTION */}
      <div className="container text-center mb-10">
        <h1 className="display-4 fw-bold text-dark">🍔 About Foodie Express</h1>
        <p className="text-secondary fs-5 mt-2">
          Delivering happiness through delicious food 🚀
        </p>
      </div>

      {/* MAIN CARD */}
      <div className="container">
        <div className="card border-0 shadow-lg rounded-5 p-4 p-md-5 bg-white">
          {/* INTRO SECTION */}
          <div className="row align-items-center mb-5">
            <div className="col-md-6">
              <h2 className="fw-bold mb-3">Who We Are</h2>
              <p className="text-secondary">
                Foodie Express is a modern food ordering platform that connects
                customers with their favorite restaurants in just a few clicks.
                We believe food should be fast, fresh, and affordable.
              </p>

              <p className="text-secondary">
                From pizza to biryani, burgers to desserts — we bring everything
                right to your doorstep with smooth delivery experience.
              </p>

              <button
                className="btn btn-warning fw-bold rounded-pill px-4 mt-3"
                onClick={() => {
                  nav("/");
                }}
              >
                Explore Menu
              </button>
            </div>

            <div className="col-md-6 text-center mt-4 mt-md-0">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png"
                alt="food delivery"
                className="img-fluid"
                style={{ maxHeight: "280px" }}
              />
            </div>
          </div>

          {/* FEATURES SECTION */}
          <div className="row text-center g-4">
            <div className="col-md-4">
              <div className="p-4 bg-light rounded-4 shadow-sm h-100">
                <h4 className="fw-bold">⚡ Fast Delivery</h4>
                <p className="text-secondary">
                  We deliver your food in under 30 minutes with real-time
                  tracking.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="p-4 bg-light rounded-4 shadow-sm h-100">
                <h4 className="fw-bold">🍕 Quality Food</h4>
                <p className="text-secondary">
                  We partner with top restaurants to ensure fresh and tasty
                  meals.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="p-4 bg-light rounded-4 shadow-sm h-100">
                <h4 className="fw-bold">💳 Secure Payment</h4>
                <p className="text-secondary">
                  Multiple payment options with safe and encrypted transactions.
                </p>
              </div>
            </div>
          </div>

          {/* MISSION SECTION */}
          <div className="mt-5 p-4 bg-warning rounded-4 text-dark">
            <h3 className="fw-bold">🎯 Our Mission</h3>
            <p className="mb-0">
              To make food ordering simple, fast, and accessible for everyone,
              anytime, anywhere.
            </p>
          </div>

          {/* STATS SECTION */}
          <div className="row text-center mt-5 g-3">
            <div className="col-md-3">
              <div className="p-3 bg-white shadow-sm rounded-4">
                <h2 className="fw-bold text-success">10K+</h2>
                <p className="text-secondary mb-0">Orders Delivered</p>
              </div>
            </div>

            <div className="col-md-3">
              <div className="p-3 bg-white shadow-sm rounded-4">
                <h2 className="fw-bold text-primary">5K+</h2>
                <p className="text-secondary mb-0">Happy Customers</p>
              </div>
            </div>

            <div className="col-md-3">
              <div className="p-3 bg-white shadow-sm rounded-4">
                <h2 className="fw-bold text-danger">200+</h2>
                <p className="text-secondary mb-0">Restaurants</p>
              </div>
            </div>

            <div className="col-md-3">
              <div className="p-3 bg-white shadow-sm rounded-4">
                <h2 className="fw-bold text-warning">24/7</h2>
                <p className="text-secondary mb-0">Support</p>
              </div>
            </div>
          </div>

          {/* FOOTER NOTE */}
          <div className="text-center mt-5">
            <p className="text-secondary">
              Made with ❤️ by Foodie Express Team
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
