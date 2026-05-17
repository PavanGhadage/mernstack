import axios from "axios";
import React, { useEffect, useState } from "react";

function Order() {
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  // FETCH ORDERS
  useEffect(() => {
    const fetchdata = async () => {
      // const res = await axios.get("http://localhost:3000/order");
      // setData(res.data);
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));

      const res = await axios.get("http://localhost:3000/order");

      const userOrders = res.data.filter(
        (item) => item.userEmail === currentUser?.email,
      );

      setData(userOrders);
    };
    fetchdata();
  }, []);

  // DELETE ORDER
  const cancelOrder = async (id) => {
    await axios.delete(`http://localhost:3000/order/${id}`);
    setData((prev) => prev.filter((item) => item.id !== id));
    alert("your order has been cancelled");
  };

  // OPEN EDIT
  const openEdit = (order) => {
    setEditId(order.id);
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

    await axios.patch(`http://localhost:3000/order/${id}`, {
      address,
    });

    setData((prev) =>
      prev.map((item) => (item.id === id ? { ...item, address } : item)),
    );

    setEditId(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-center text-4xl font-bold mb-10">🧾 My Orders</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((order) => {
          const item = order.cartItems?.[0] || order.item;

          return (
            <div key={order.id} className="bg-white rounded-2xl shadow-lg p-5">
              {/* IMAGE */}
              <img
                src={item?.image || order.image}
                alt="food"
                className="w-full h-40 object-cover rounded-xl"
              />

              {/* ITEM NAME */}
              <h2 className="text-xl font-bold mt-3">
                {item?.name || order.name}
              </h2>

              {/* PRICE */}
              <p className="text-gray-600">
                Qty: {item?.qty || order.qty} | Total:
                <span className="text-green-600 font-bold ml-1">
                  ₹{order.total}
                </span>
              </p>

              <hr className="my-3" />

              {/* CUSTOMER INFO */}
              <p className="text-sm">👤 {order.name}</p>
              <p className="text-sm">📞 {order.mobile}</p>
              <p className="text-sm">📍 {order.city}</p>

              {/* ADDRESS */}
              <div className="mt-3">
                <p className="font-semibold">Address:</p>

                {editId === order.id ? (
                  <>
                    <textarea
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="🏠 Example: Flat 101, ABC Apartment, MG Road, Shivaji Nagar, Pune - 411001"
                      className="w-full border p-2 rounded-lg mt-1"
                    />

                    {/* ERROR DISPLAY */}
                    {error && (
                      <p className="text-red-500 text-sm mt-1 font-semibold">
                        {error}
                      </p>
                    )}

                    <button
                      onClick={() => saveAddress(order.id)}
                      className="bg-green-500 text-white px-4 py-1 mt-2 rounded-lg"
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <p className="text-gray-700">{order.address}</p>
                )}
              </div>

              {/* BUTTONS */}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => openEdit(order)}
                  className="w-1/2 bg-yellow-400 py-2 rounded-lg font-semibold"
                >
                  ✏ Edit
                </button>

                <button
                  onClick={() => cancelOrder(order.id)}
                  className="w-1/2 bg-red-500 text-white py-2 rounded-lg font-semibold"
                >
                  ❌ Cancel
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* EMPTY STATE */}
      {data.length === 0 && (
        <p className="text-center mt-10 text-gray-500">No orders found 😢</p>
      )}
    </div>
  );
}

export default Order;
