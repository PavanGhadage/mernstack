import axios from "axios";
import React, { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Updatedata from "./Updatedata";

function Home() {
  const [data, setdata] = useState([]);
  const nav = useNavigate();
  // Fetch Data
  useEffect(() => {
    const showdata = async () => {
      try {
        const result = await axios.get("http://localhost:3000/products");

        console.log("Data:", result.data);
        setdata(result.data);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    showdata();
  }, []);

  // Delete Data
  const deletedata = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/products/${id}`);

      // Remove deleted item from UI
      setdata(data.filter((item) => item.id !== id));

      console.log("Product Deleted");
    } catch (error) {
      console.log("Delete Error:", error);
    }
  };

  return (
    <>
      <div className="container mt-4">
        <h1 className="text-center mb-4">This is Homepage</h1>

        <h2 className="mb-3">Total Products: {data.length}</h2>

        <table className="table table-bordered text-center table-hover">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((val) => {
              return (
                <tr key={val.id}>
                  <td>{val.name}</td>
                  <td>{val.category}</td>
                  <td>{val.brand}</td>
                  <td>₹ {val.price}</td>
                  <td>
                    <NavLink
                      to={`/updateproduct/${val.id}`}
                      className="btn btn-warning btn-sm me-2"
                    >
                      <i className="bi bi-pencil-square"></i>
                    </NavLink>
                  </td>

                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deletedata(val.id)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Home;
