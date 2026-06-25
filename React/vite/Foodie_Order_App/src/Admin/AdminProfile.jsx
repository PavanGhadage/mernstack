import React from "react";

function AdminProfile() {
  const admin = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <div className="container-fluid py-4">
      <h2 className="mb-4">👤 Admin Profile</h2>

      <div
        className="card shadow border-0"
        style={{
          maxWidth: "600px",
          borderRadius: "20px",
        }}
      >
        <div className="card-body text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Admin"
            width="120"
            className="mb-3"
          />

          <h3 className="fw-bold">{admin?.name}</h3>

          <hr />

          <div className="text-start mt-4">
            <h5>📧 Email :</h5>

            <p>{admin?.email}</p>

            <h5>🛡 Role :</h5>

            <p className="text-success fw-bold">{admin?.role}</p>

            <h5>🆔 User ID :</h5>

            <p>{admin?.id}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;
