import React, { useState } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";

function AdminProfile() {
  const admin = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [profileImage, setProfileImage] = useState(null);

  // Upload Profile
  const uploadProfile = async () => {
    if (!profileImage) {
      toast.error("Please Select An Image");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("profileImage", profileImage);

      const result = await axios.patch(
        `/api/users/profile/${admin.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const updatedUser = {
        ...admin,
        profileImage: result.data.profileImage,
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      toast.success("Profile Updated Successfully");

      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error("Upload Failed");
    }
  };

  // Delete Profile Image
  const deleteProfile = async () => {
    try {
      await axios.patch(
        `/api/users/profile/${admin.id}`,
        {
          profileImage: "",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const updatedUser = {
        ...admin,
        profileImage: "",
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      toast.success("Profile Image Removed");

      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error("Unable To Remove Image");
    }
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center py-5"
      style={{
        minHeight: "90vh",
      }}
    >
      <div
        className="card border-0 shadow-lg"
        style={{
          maxWidth: "550px",
          width: "100%",
          borderRadius: "25px",
        }}
      >
        <div className="card-body text-center p-5">
          <h2 className="fw-bold mb-4">👤 Admin Profile</h2>

          <div
            className="mx-auto shadow border border-3 rounded-circle overflow-hidden"
            style={{
              width: "150px",
              height: "150px",
            }}
          >
            <img
              src={
                profileImage
                  ? URL.createObjectURL(profileImage)
                  : admin?.profileImage ||
                    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              }
              alt="Profile"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          </div>

          {/* Choose Image */}
          <input
            type="file"
            accept="image/*"
            className="form-control mt-4"
            onChange={(e) => setProfileImage(e.target.files[0])}
          />

          {/* Buttons */}
          <div className="d-flex justify-content-center gap-3 mt-4">
            <button className="btn btn-success px-4" onClick={uploadProfile}>
              📤 Upload
            </button>

            <button
              className="btn btn-outline-danger px-4"
              onClick={deleteProfile}
            >
              🗑 Delete
            </button>
          </div>

          <hr className="my-4" />

          <h3 className="fw-bold mb-4">{admin?.name}</h3>

          <div className="text-start">
            <div className="mb-3">
              <h6 className="fw-bold">📧 Email</h6>

              <p className="text-secondary">{admin?.email}</p>
            </div>

            <div className="mb-3">
              <h6 className="fw-bold">🛡 Role</h6>

              <p className="text-success fw-bold">{admin?.role}</p>
            </div>

            <div>
              <h6 className="fw-bold">🆔 User ID</h6>

              <p
                className="text-secondary"
                style={{
                  wordBreak: "break-all",
                }}
              >
                {admin?.id}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;
