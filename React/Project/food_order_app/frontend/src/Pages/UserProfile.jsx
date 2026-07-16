import API from "../api/axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function UserProfile() {
  const [user, setUser] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const result = await API.get(`/api/users/${currentUser.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImageFile(file);

    setUser({
      ...user,
      profileImage: URL.createObjectURL(file),
    });
  };
  const removePhoto = async () => {
    try {
      const formData = new FormData();

      formData.append("profileImage", "");

      const result = await API.patch(
        `/api/users/profile/${user._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const updatedUser = {
        id: result.data._id,
        name: result.data.name,
        email: result.data.email,
        mobile: result.data.mobile,
        role: result.data.role,
        profileImage: "",
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));

      setUser(result.data);
      setImageFile(null);

      alert("✅ Profile Photo Removed");
    } catch (error) {
      console.log(error);
    }
  };

  const saveProfile = async () => {
    try {
      const formData = new FormData();

      formData.append("name", user.name);
      formData.append("mobile", user.mobile);

      if (imageFile) {
        formData.append("profileImage", imageFile);
      }

      const result = await API.patch(
        `/api/users/profile/${user._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const updatedUser = {
        id: result.data._id,
        name: result.data.name,
        email: result.data.email,
        mobile: result.data.mobile,
        role: result.data.role,
        profileImage: result.data.profileImage,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));

      setUser(result.data);
      setImageFile(null);

      toast.success("Profile Updated Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div
      className="min-vh-100 d-flex justify-content-center align-items-center p-3"
      style={{
        backgroundColor: "#0b7c92",
      }}
    >
      <div
        className="bg-white shadow"
        style={{
          width: "100%",
          maxWidth: "650px",
          borderRadius: "20px",
          padding: "35px",
        }}
      >
        {/* Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center align-items-md-start text-center text-md-start">
          <div className="d-flex align-items-center">
            <div
              style={{
                position: "relative",
              }}
            >
              {/* <p>{user.profileImage}</p> */}
              <img
                src={
                  user.profileImage ||
                  "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                }
                alt="profile"
                className="rounded-circle"
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                }}
              />

              <label
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  cursor: "pointer",
                  background: "#fff",
                  borderRadius: "50%",
                  padding: "5px",
                  border: "1px solid #ddd",
                }}
              >
                ✏️
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageChange}
                />
              </label>
            </div>

            <div className="ms-md-3 mt-3 mt-md-0">
              <h5 className="fw-bold mb-1">{user.name}</h5>

              <p className="text-muted mb-0">{user.email}</p>
            </div>
          </div>
        </div>

        <hr className="my-4" />

        {/* Name */}
        <div className="row py-3 border-bottom align-items-center">
          <div className="col-6 fw-semibold">Name</div>

          <div className="col-6">
            <input
              type="text"
              className="form-control border-0 text-end"
              value={user.name}
              onChange={(e) =>
                setUser({
                  ...user,
                  name: e.target.value,
                })
              }
            />
          </div>
        </div>

        {/* Email */}
        <div className="row py-3 border-bottom align-items-center">
          <div className="col-12 col-md-6 fw-semibold">Email Account</div>

          <div
            className="col-12 col-md-6 text-md-end text-muted mt-2 mt-md-0"
            style={{
              wordBreak: "break-word",
              overflowWrap: "break-word",
            }}
          >
            {user.email}
          </div>
        </div>

        {/* Mobile */}
        <div className="row py-3 border-bottom align-items-center">
          <div className="col-6 fw-semibold">Mobile Number</div>

          <div className="col-6">
            <input
              type="text"
              className="form-control border-0 text-end"
              value={user.mobile || ""}
              onChange={(e) =>
                setUser({
                  ...user,
                  mobile: e.target.value,
                })
              }
            />
          </div>
        </div>

        {/* Save */}
        <div className="mt-4 d-flex flex-column flex-md-row gap-3">
          <button className="btn btn-primary px-4" onClick={saveProfile}>
            💾 Save Changes
          </button>

          {user.profileImage && (
            <button className="btn btn-danger px-4" onClick={removePhoto}>
              🗑 Remove Photo
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
