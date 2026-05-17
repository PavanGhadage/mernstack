// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import LoginPage from "./Pages/LoginPage";
// import SignUp from "./Pages/SignUp";
// import React from "react";
// import Home from "./Components/Home";
// import Forgot from "./Pages/Forgot";
// import Navbar from "./Pages/Navbar";
// import About from "./Components/About";
// import Cart from "./Components/Cart";
// import Order from "./Components/Order";
// import ViewMenu from "./Pages/ViewMenu";
// import Checkout from "./Pages/Checkout";
// import Ordernow from "./Pages/Ordernow";
// import Footer from "./Pages/Footer";
// import Contact from "./Components/Contact";
// function App() {
//   return (
//     <>
//       <Router>
//         <Navbar />
//         <Routes>
//           <Route path="/signup" element={<SignUp />} />
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/" element={<Home />} />
//           <Route path="/forgot" element={<Forgot />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/cart" element={<Cart />} />
//           <Route path="/orders" element={<Order />} />
//           <Route path="/viewmenu/:id" element={<ViewMenu />} />
//           <Route path="/checkout" element={<Checkout />} />
//           <Route path="/ordernow" element={<Ordernow />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/contact" element={<Contact />} />
//         </Routes>
//         <Footer />
//       </Router>
//     </>
//   );
// }

// export default App;
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import SignUp from "./Pages/SignUp";
import React from "react";
import Home from "./Components/Home";
import Forgot from "./Pages/Forgot";
import Navbar from "./Pages/Navbar";
import About from "./Components/About";
import Cart from "./Components/Cart";
import Order from "./Components/Order";
import ViewMenu from "./Pages/ViewMenu";
import Checkout from "./Pages/Checkout";
import Ordernow from "./Pages/Ordernow";
import Footer from "./Pages/Footer";
import Contact from "./Components/Contact";
import ProtectedRoute from "./Pages/ProtectedRoute";

function App() {
  return (
    <>
      <Router>
        <Navbar />

        <Routes>
          <Route path="/signup" element={<SignUp />} />

          <Route path="/login" element={<LoginPage />} />

          <Route path="/" element={<Home />} />

          <Route path="/forgot" element={<Forgot />} />

          <Route path="/about" element={<About />} />

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

          <Route path="/viewmenu/:id" element={<ViewMenu />} />

          <Route path="/contact" element={<Contact />} />
        </Routes>

        <Footer />
      </Router>
    </>
  );
}

export default App;
