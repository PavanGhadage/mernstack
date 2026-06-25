import axios from "axios";
import React, { useEffect, useState } from "react";

function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const result = await axios.get("http://localhost:3000/logincred");

      setUsers(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id, role) => {
    if (role === "admin") {
      alert("❌ Admin account cannot be deleted");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?",
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/logincred/${id}`);

      setUsers(users.filter((user) => user.id !== id));

      alert("✅ User Deleted Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="container-fluid py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3 text-center text-md-start">
        <div>
          <h2 className="fw-bold mb-1">👥 Users Management</h2>

          <p className="text-muted mb-0">Manage all registered users</p>
        </div>

        <div
          className="card border-0 shadow"
          style={{
            borderRadius: "15px",
          }}
        >
          <div className="card-body text-center">
            <h6 className="text-muted">Total Users</h6>

            <h2 className="fw-bold text-primary">{users.length}</h2>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="card border-0 shadow mb-4">
        <div className="card-body">
          <input
            type="text"
            className="form-control"
            placeholder="🔍 Search by Name or Email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Users Table */}
      <div
        className="card border-0 shadow"
        style={{
          borderRadius: "15px",
        }}
      >
        <div className="card-body">
          <div className="table-responsive">
            <table className="table align-middle table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Sr No</th>
                  <th>User</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user, index) => (
                    <tr key={user.id}>
                      <td>
                        <strong>{index + 1}</strong>
                      </td>

                      {/* User Avatar */}
                      <td>
                        <div className="d-flex align-items-center gap-3">
                          <div
                            className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center"
                            style={{
                              width: "40px",
                              height: "40px",
                              fontWeight: "bold",
                              fontSize: "16px",
                            }}
                          >
                            {user.profileImage ? (
                              <img
                                src={user.profileImage}
                                alt=""
                                className="rounded-circle"
                                style={{
                                  width: "40px",
                                  height: "40px",
                                  objectFit: "cover",
                                }}
                              />
                            ) : (
                              user.name?.charAt(0).toUpperCase()
                            )}
                          </div>

                          <div>
                            <strong>{user.name}</strong>
                          </div>
                        </div>
                      </td>

                      <td>{user.email}</td>

                      <td>
                        <span
                          className={
                            user.role === "admin"
                              ? "badge bg-danger px-3 py-2"
                              : "badge bg-success px-3 py-2"
                          }
                        >
                          {user.role || "user"}
                        </span>
                      </td>

                      <td>
                        <button
                          className="btn btn-outline-danger btn-sm w-100"
                          onClick={() => deleteUser(user.id, user.role)}
                        >
                          🗑 Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      No Users Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
