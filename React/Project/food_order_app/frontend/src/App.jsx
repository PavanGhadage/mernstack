import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import React, { useState } from "react";

// User Pages
import LoginPage from "./Pages/LoginPage";
import SignUp from "./Pages/SignUp";
import Forgot from "./Pages/Forgot";
import Sidebar from "./Pages/Sidebar";
import Footer from "./Pages/Footer";
import ProtectedRoute from "./Pages/ProtectedRoute";
import Header from "./Pages/Header";

// User Components
import Home from "./Components/Home";
import About from "./Components/About";
import Cart from "./Components/Cart";
import Order from "./Components/Order";
import Contact from "./Components/Contact";

import ViewMenu from "./Pages/ViewMenu";
import Checkout from "./Pages/Checkout";
import Ordernow from "./Pages/Ordernow";
import UserProfile from "./Pages/UserProfile";

// Admin
import AdminProtectedRoute from "./Admin/AdminProtectedRoute";
import AdminLayout from "./Admin/AdminLayout";
import AdminDashboard from "./Admin/AdminDashboard";
import Users from "./Admin/Users";
import Restaurants from "./Admin/Restaurants";
import AdminOrders from "./Admin/AdminOrders";
import ContactMessages from "./Admin/ContactMessages";
import AdminProfile from "./Admin/AdminProfile";

//not found
import NotFound from "./Pages/NotFound";

function Layout() {
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const hideSidebar =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/forgot" ||
    location.pathname.startsWith("/admin");

  return (
    <div className="d-flex">
      {!hideSidebar && <Sidebar sidebarOpen={sidebarOpen} />}

      <div
        style={{
          marginLeft: hideSidebar ? "0" : sidebarOpen ? "260px" : "0",

          transition: "0.3s ease",

          width: "100%",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Common Header */}
        {!hideSidebar && (
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        )}

        <div className="flex-grow-1">
          <Routes>
            {/* Auth Routes */}
            <Route path="/signup" element={<SignUp />} />

            <Route path="/login" element={<LoginPage />} />

            <Route path="/forgot" element={<Forgot />} />

            {/* User Routes */}
            <Route path="/" element={<Home />} />

            <Route path="/about" element={<About />} />

            <Route path="/contact" element={<Contact />} />

            <Route path="/viewmenu/:id" element={<ViewMenu />} />

            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />

            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <Order />
                </ProtectedRoute>
              }
            />

            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />

            <Route
              path="/ordernow"
              element={
                <ProtectedRoute>
                  <Ordernow />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <AdminProtectedRoute>
                  <AdminLayout />
                </AdminProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />

              <Route path="users" element={<Users />} />

              <Route path="restaurants" element={<Restaurants />} />

              <Route path="orders" element={<AdminOrders />} />

              <Route path="messages" element={<ContactMessages />} />

              <Route path="profile" element={<AdminProfile />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>

        {!hideSidebar && <Footer />}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
