import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Update() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    mobile: "",
    age: "",
  });

  // Fetch User By ID
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(`http://localhost:3000/api/users/${id}`);

        // If your backend returns:
        // { success: true, data: user }
        setData(result.data.data);

        // If your backend returns only the user object,
        // replace the above line with:
        // setData(result.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, [id]);

  // Handle Input Change
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  // Update User
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:3000/api/users/${id}`, data);

      alert("User Updated Successfully");

      navigate("/form");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-6">Update User</h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block mb-2 font-medium">
              Name
            </label>

            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={data.name}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label htmlFor="mobile" className="block mb-2 font-medium">
              Mobile
            </label>

            <input
              type="text"
              id="mobile"
              name="mobile"
              placeholder="Enter mobile number"
              value={data.mobile}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label htmlFor="age" className="block mb-2 font-medium">
              Age
            </label>

            <input
              type="number"
              id="age"
              name="age"
              placeholder="Enter your age"
              value={data.age}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default Update;
