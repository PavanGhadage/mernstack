import axios from "axios";
import React, { useEffect, useState } from "react";

function UserProfile() {
  const [user, setUser] = useState(null);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const result = await axios.get(
        `http://localhost:5000/api/users/${currentUser.id}`,
      );

      setUser(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setUser({
        ...user,
        profileImage: reader.result,
      });
    };

    reader.readAsDataURL(file);
  };
  const removePhoto = () => {
    setUser({
      ...user,
      profileImage: "",
    });
  };

  const saveProfile = async () => {
    try {
      await axios.patch(`http://localhost:5000/api/users/${user._id}`, {
        name: user.name,
        mobile: user.mobile,
        profileImage: user.profileImage || "",
      });

      localStorage.setItem("currentUser", JSON.stringify(user));

      alert("Profile Updated Successfully");
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
