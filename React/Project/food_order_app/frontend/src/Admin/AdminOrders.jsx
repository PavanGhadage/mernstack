import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const result = await axios.get("http://localhost:5000/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

      await axios.patch(
        `http://localhost:5000/api/orders/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteOrder = async (id) => {
    const confirmDelete = window.confirm("Delete this order?");

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:5000/api/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchOrders();
      toast.success("Order Deleted");
    } catch (error) {
      console.log(error);
    }
  };

  const viewOrder = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.name?.toLowerCase().includes(search.toLowerCase()) ||
      order.email?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="container-fluid py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
        <div>
          <h2 className="fw-bold">📦 Orders Management</h2>

          <p className="text-muted">Manage customer orders</p>
        </div>

        <div
          className="card shadow border-0"
          style={{
            minWidth: "150px",
          }}
        >
          <div className="card-body text-center">
            <h6>Total Orders</h6>

            <h2 className="text-primary">{orders.length}</h2>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="card shadow border-0 mb-4">
        <div className="card-body">
          <input
            type="text"
            className="form-control"
            placeholder="🔍 Search Customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="card shadow border-0">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>City</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
                <th>View</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id.slice(-6)}</td>

                  <td>{order.name}</td>

                  <td>{order.email}</td>

                  <td>{order.mobile}</td>

                  <td>{order.city}</td>

                  <td>₹{order.total}</td>

                  <td>{order.payment}</td>

                  <td>
                    <select
                      className="form-select form-select-sm"
                      value={order.status || "Placed"}
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                    >
                      <option>Placed</option>
                      <option>Preparing</option>
                      <option>Out For Delivery</option>
                      <option>Delivered</option>
                      <option>Cancelled</option>
                    </select>
                  </td>

                  <td>
                    <button
                      className="btn btn-primary btn-sm w-100"
                      onClick={() => viewOrder(order)}
                    >
                      👁 View
                    </button>
                  </td>

                  <td>
                    <button
                      className="btn btn-danger btn-sm w-100"
                      onClick={() => deleteOrder(order._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedOrder && (
        <div
          className="modal fade show d-block"
          style={{
            backgroundColor: "rgba(0,0,0,0.6)",
          }}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header bg-dark text-white">
                <h5 className="modal-title">📦 Order Details</h5>

                <button
                  className="btn-close btn-close-white"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              <div className="modal-body">
                <h5 className="mb-3">👤 Customer Information</h5>

                <p>
                  <strong>Name:</strong> {selectedOrder.name}
                </p>

                <p>
                  <strong>Email:</strong> {selectedOrder.email}
                </p>

                <p>
                  <strong>Mobile:</strong> {selectedOrder.mobile}
                </p>

                <p>
                  <strong>City:</strong> {selectedOrder.city}
                </p>

                <p>
                  <strong>Address:</strong> {selectedOrder.address}
                </p>

                <p>
                  <strong>Payment:</strong> {selectedOrder.payment}
                </p>

                <hr />

                <h5 className="mb-3">🍔 Ordered Items</h5>

                {selectedOrder.cartItems?.map((item, index) => (
                  <div key={index} className="card mb-3">
                    <div className="card-body d-flex flex-column flex-sm-row align-items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        width="70"
                        height="70"
                        style={{
                          objectFit: "cover",
                          borderRadius: "10px",
                        }}
                      />

                      <div>
                        <h6>{item.name}</h6>

                        <p className="mb-1">Qty : {item.qty}</p>

                        <p className="mb-0">Price : {item.price}</p>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="alert alert-success mt-3">
                  <h5>Total Amount : ₹{selectedOrder.total}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;
