import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
function Form() {
  const [data, setdata] = useState([]);

  const nav = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const result = await axios.get("http://localhost:3000/api/users");
        setdata(result.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/users/${id}`);

      const deletedata = data.filter((val) => val._id !== id);

      setdata(deletedata);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-3xl font-bold text-center mb-6">User List</h2>

          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="border px-4 py-3">ID</th>
                  <th className="border px-4 py-3">Name</th>
                  <th className="border px-4 py-3">Mobile</th>
                  <th className="border px-4 py-3">Age</th>
                  <th className="border px-4 py-3">Actions</th>
                </tr>
              </thead>

              <tbody>
                {data.map((val, index) => (
                  <tr key={val._id} className="text-center hover:bg-gray-100">
                    <td className="border px-4 py-3">{index + 1}</td>
                    <td className="border px-4 py-3">{val.name}</td>
                    <td className="border px-4 py-3">{val.mobile}</td>
                    <td className="border px-4 py-3">{val.age}</td>
                    <td className="border px-4 py-3">
                      <div className="flex justify-center gap-4">
                        <button
                          onClick={() => nav(`/update/${val._id}`)}
                          className="text-blue-600 hover:text-blue-800 text-xl"
                        >
                          <FaEdit />
                        </button>

                        <button
                          onClick={() => handleDelete(val._id)}
                          className="text-red-600 hover:text-red-800 text-xl"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Form;
