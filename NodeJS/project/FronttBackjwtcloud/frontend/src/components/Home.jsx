import axios from "axios";
import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

function Home() {
  const [data, setData] = useState({
    name: "",
    age: "",
    mobile: "",
  });

  const nav = useNavigate();

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post("http://localhost:3000/api/users", data);

      console.log(result.data);

      setData({
        name: "",
        age: "",
        mobile: "",
      });

      nav("/form");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-6">User Form</h2>

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
            className="w-full bg-blue-600 text-white py-2 rounded-lg"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Home;
