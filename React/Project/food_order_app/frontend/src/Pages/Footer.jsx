import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { NavLink } from "react-router-dom";
function Footer() {
  return (
    <footer className="bg-dark text-light pt-5 mt-5">
      <div className="container">
        {/* TOP SECTION */}
        <div className="row text-center text-md-start">
          {/* BRAND */}
          <div className="col-md-4 mb-4">
            <h2 className="fw-bold text-warning">🍔 Foodie Express</h2>
            <p className="text-secondary mt-3">
              Your favorite food delivered fast at your door. Fresh meals, best
              restaurants, and quick delivery.
            </p>
          </div>

          {/* LINKS */}
          <div className="col-md-2 mb-4">
            <h5 className="fw-bold text-white">Quick Links</h5>
            <ul className="list-unstyled mt-3">
              <li>
                <NavLink to="/" className="text-secondary text-decoration-none">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className="text-secondary text-decoration-none"
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/cart"
                  className="text-secondary text-decoration-none"
                >
                  Cart
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/orders"
                  className="text-secondary text-decoration-none"
                >
                  Orders
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className="text-secondary text-decoration-none"
                >
                  Contact Us
                </NavLink>
              </li>
              <li></li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold text-white">Support</h5>
            <ul className="list-unstyled mt-3">
              <li className="text-secondary">📍 Pune, India</li>
              <li className="text-secondary">📞 +91 7773934201</li>
              <li className="text-secondary">📧 support@foodieexpress.com</li>
            </ul>
          </div>

          {/* SOCIAL */}
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold text-white">Follow Us</h5>

            <div className="d-flex gap-3 mt-3 justify-content-center justify-content-md-start">
              <a href="#" className="text-light fs-4">
                <FaFacebook />
              </a>

              <a href="#" className="text-light fs-4">
                <FaInstagram />
              </a>

              <a href="#" className="text-light fs-4">
                <FaTwitter />
              </a>

              <a href="#" className="text-light fs-4">
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <hr className="border-secondary" />

        {/* BOTTOM SECTION */}
        <div className="text-center pb-3">
          <p className="mb-0 text-secondary">
            © {new Date().getFullYear()} Foodie Express. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
