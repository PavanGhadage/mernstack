import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
function Order() {
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  // FETCH ORDERS
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:5000/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setData(res.data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch orders");
      }
    };

    fetchdata();
  }, []);

  // DELETE ORDER
  const cancelOrder = async (id) => {
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:5000/api/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setData((prev) => prev.filter((item) => item._id !== id));
    toast.success("Order Cancelled Successfully");
  };

  // OPEN EDIT
  const openEdit = (order) => {
    setEditId(order._id);
    setAddress(order.address);
    setError("");
  };

  // SMART ADDRESS VALIDATION (USER MISTAKE HANDLING)
  const validate = () => {
    const addressRegex = /^(?=.*[A-Za-z])[A-Za-z0-9\s,.-]{10,}$/;

    // 1. EMPTY CHECK
    if (!address.trim()) {
      setError("❌ Address cannot be empty");
      return false;
    }

    // 2. ONLY NUMBERS CHECK
    if (/^[0-9\s]+$/.test(address)) {
      setError("❌ Address cannot contain only numbers");
      return false;
    }

    // 3. TOO SHORT CHECK
    if (address.length < 10) {
      setError("❌ Address must be at least 10 characters");
      return false;
    }

    // 4. FORMAT CHECK
    if (!addressRegex.test(address)) {
      setError("❌ Invalid format (use letters + numbers + proper address)");
      return false;
    }

    setError("");
    return true;
  };

  // SAVE ADDRESS
  const saveAddress = async (id) => {
    if (!validate()) return;

    await axios.patch(`http://localhost:5000/api/orders/${id}`, {
      address,
    });

    setData((prev) =>
      prev.map((item) => (item._id === id ? { ...item, address } : item)),
    );

    setEditId(null);
  };
  const getStatusColor = (status) => {
    switch (status) {
      case "Placed":
        return "bg-primary";
      case "Preparing":
        return "bg-warning";
      case "Out For Delivery":
        return "bg-info";
      case "Delivered":
        return "bg-success";
      case "Cancelled":
        return "bg-danger";
      default:
        return "bg-secondary";
    }
  };

  return (
    <div className="container-fluid py-4">
      <h1 className="text-center fw-bold mb-5">🧾 My Orders</h1>

      <div className="row g-4">
        {data.map((order) => {
          const item = order.cartItems?.[0] || order.item;

          return (
            <div className="col-12 col-md-6 col-lg-4" key={order._id}>
              <div className="card shadow-lg border-0 h-100">
                <div className="card-body">
                  {/* IMAGE */}
                  <img
                    // src={item?.image || order.image}
                    src={order.cartItems?.[0]?.image || order.image}
                    alt="food"
                    className="w-100 rounded-4"
                    style={{
                      height: "220px",
                      objectFit: "cover",
                    }}
                  />

                  {/* ITEM NAME */}
                  {/* ORDER ITEMS */}
                  <div className="mt-3">
                    <h5 className="fw-bold">🍔 Ordered Items</h5>

                    {order.cartItems?.map((food, index) => (
                      <div
                        key={food.id || food._id}
                        className="border-bottom py-2"
                      >
                        <strong>{food.name}</strong>
                        <br />
                        Qty: {food.qty}
                      </div>
                    ))}
                  </div>

                  {/* PRICE */}
                  <p className="text-secondary">
                    Total:
                    <span className="text-success fw-bold ms-1">
                      ₹{order.total + 50}
                    </span>
                  </p>

                  <hr className="my-3" />

                  {/* CUSTOMER INFO */}
                  <p className="small">👤 {order.name}</p>
                  <p className="small">📞 {order.mobile}</p>
                  <p className="small">📍 {order.city}</p>

                  <div className="mt-3">
                    <span className={`badge ${getStatusColor(order.status)}`}>
                      🚚 {order.status || "Placed"}
                    </span>
                  </div>
                  {/* ADDRESS */}
                  <div className="mt-3">
                    <p className="fw-semibold">Address:</p>

                    {editId === order._id ? (
                      <>
                        <textarea
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="🏠 Example: Flat 101, ABC Apartment, MG Road, Shivaji Nagar, Pune - 411001"
                          className="form-control mt-1"
                        />

                        {/* ERROR DISPLAY */}
                        {error && (
                          <p className="text-danger small mt-1 fw-semibold">
                            {error}
                          </p>
                        )}

                        <button
                          onClick={() => saveAddress(order._id)}
                          className="btn btn-success mt-2"
                        >
                          Save
                        </button>
                      </>
                    ) : (
                      <p className="text-secondary">{order.address}</p>
                    )}
                  </div>
                  {/* ORDER TRACKING */}
                  <div className="mt-4">
                    <p className="fw-semibold mb-2">🚚 Order Tracking</p>

                    <div className="d-flex flex-column gap-2">
                      <span
                        className={`badge ${
                          order.status === "Placed"
                            ? "bg-primary"
                            : "bg-secondary"
                        }`}
                      >
                        📦 Placed
                      </span>

                      <span
                        className={`badge ${
                          order.status === "Preparing"
                            ? "bg-warning"
                            : "bg-secondary"
                        }`}
                      >
                        👨‍🍳 Preparing
                      </span>

                      <span
                        className={`badge ${
                          order.status === "Out For Delivery"
                            ? "bg-info"
                            : "bg-secondary"
                        }`}
                      >
                        🛵 Out For Delivery
                      </span>

                      <span
                        className={`badge ${
                          order.status === "Delivered"
                            ? "bg-success"
                            : "bg-secondary"
                        }`}
                      >
                        ✅ Delivered
                      </span>
                    </div>

                    <div className="mt-2">
                      <span className={`badge ${getStatusColor(order.status)}`}>
                        Current Status : {order.status || "Placed"}
                      </span>
                    </div>
                  </div>

                  {/* BUTTONS */}
                  <div className="d-flex flex-column flex-sm-row gap-2 mt-4">
                    <button
                      onClick={() => openEdit(order)}
                      className="btn btn-warning w-100 fw-bold"
                    >
                      ✏ Edit
                    </button>

                    <button
                      onClick={() => cancelOrder(order._id)}
                      className="btn btn-danger w-100 fw-bold"
                    >
                      ❌ Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* EMPTY STATE */}
      {data.length === 0 && (
        <p className="text-center mt-5 text-secondary">No orders found 😢</p>
      )}
    </div>
  );
}

export default Order;
