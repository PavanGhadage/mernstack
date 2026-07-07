import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProductList from "./pages/ProductList";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import ViewProduct from "./pages/ViewProduct";
import NotFound from "./pages/NotFound";

import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}

        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/products"
          element={
            <PrivateRoute>
              <ProductList />
            </PrivateRoute>
          }
        />

        <Route
          path="/add-product"
          element={
            <PrivateRoute>
              <AddProduct />
            </PrivateRoute>
          }
        />

        <Route
          path="/edit-product/:id"
          element={
            <PrivateRoute>
              <EditProduct />
            </PrivateRoute>
          }
        />

        <Route
          path="/view-product/:id"
          element={
            <PrivateRoute>
              <ViewProduct />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
