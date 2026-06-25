import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

function AdminDashboard() {
  const [usersCount, setUsersCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [recentOrders, setRecentOrders] = useState([]);
  const [orderChartData, setOrderChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await axios.get("http://localhost:5000/api/users");

        const products = await axios.get(
          "http://localhost:5000/api/restaurants",
        );

        const orders = await axios.get("http://localhost:5000/api/orders");
        setUsersCount(users.data.length);
        setProductsCount(products.data.length);
        setOrdersCount(orders.data.length);

        const totalRevenue = orders.data.reduce(
          (sum, order) => sum + Number(order.total || 0),
          0,
        );

        setRevenue(totalRevenue);

        setRecentOrders(orders.data.slice(-5).reverse());
        const placed = orders.data.filter((o) => o.status === "Placed").length;

        const preparing = orders.data.filter(
          (o) => o.status === "Preparing",
        ).length;

        const delivered = orders.data.filter(
          (o) => o.status === "Delivered",
        ).length;

        const cancelled = orders.data.filter(
          (o) => o.status === "Cancelled",
        ).length;

        setOrderChartData([
          {
            name: "Placed",
            value: placed,
          },
          {
            name: "Preparing",
            value: preparing,
          },
          {
            name: "Delivered",
            value: delivered,
          },
          {
            name: "Cancelled",
            value: cancelled,
          },
        ]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container-fluid">
      <h2 className="mb-4 text-center text-md-start">📊 Admin Dashboard</h2>

      <div className="row g-4">
        {/* Users */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card shadow p-4 text-center">
            <h1>👥</h1>

            <h4>Total Users</h4>

            <h2>{usersCount}</h2>
          </div>
        </div>

        {/* Products */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card shadow p-4 text-center">
            <h1>🍔</h1>

            <h4>Total Products</h4>

            <h2>{productsCount}</h2>
          </div>
        </div>

        {/* Orders */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card shadow p-4 text-center">
            <h1>📦</h1>

            <h4>Total Orders</h4>

            <h2>{ordersCount}</h2>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card shadow p-4 text-center">
            <h1>💰</h1>
            <h4>Total Revenue</h4>
            <h2>₹{revenue}</h2>
          </div>
        </div>

        {/* Revenue */}
        {/* Recent Orders */}
        <div className="col-12">
          <div className="card shadow mt-5">
            <div
              className="card-body"
              style={{
                maxHeight: "400px",
                overflowY: "auto",
              }}
            >
              <h4 className="mb-3">📦 Recent Orders</h4>

              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Customer</th>
                      <th>Total</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {recentOrders.length > 0 ? (
                      recentOrders.map((order) => (
                        <tr key={order._id}>
                          <td>{order._id.slice(-6)}</td>

                          <td>{order.name}</td>

                          <td>₹{order.total}</td>

                          <td>
                            <span className="badge bg-success">
                              {order.status || "Placed"}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center">
                          No Orders Found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="row mt-5">
          {/* Order Status Chart */}
          <div className="col-12 col-lg-6 mb-4">
            <div className="card shadow h-100">
              <div className="card-body">
                <h4 className="mb-3">📦 Order Status Analytics</h4>

                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={orderChartData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />

                    <Bar dataKey="value" fill="#0d6efd" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Revenue Chart */}
          <div className="col-12 col-lg-6 mb-4">
            <div className="card shadow h-100">
              <div className="card-body">
                <h4 className="mb-3">💰 Revenue Overview</h4>

                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        {
                          name: "Revenue",
                          value: revenue,
                        },
                        {
                          name: "Remaining",
                          value: revenue * 0.3,
                        },
                      ]}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label
                    >
                      <Cell fill="#198754" />
                      <Cell fill="#ffc107" />
                    </Pie>

                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
