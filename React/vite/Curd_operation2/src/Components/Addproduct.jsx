import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Addproduct() {
  const nav = useNavigate();

  const [data, setdata] = useState({
    name: "",
    price: "",
    category: "",
    brand: "",
  });

  async function Onsubmit(e) {
    e.preventDefault();
    if (confirm("are you confirm")) {
      await axios.post("http://localhost:3000/products", data);
      alert("data added succesfully ");

      nav("/");
    }
  }

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">Add Product</h2>

        <form onSubmit={Onsubmit}>
          <div className="mb-3">
            <label className="form-label">Product Name</label>
            <input
              type="text"
              className="form-control"
              value={data.name}
              onChange={(e) => setdata({ ...data, name: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Price</label>
            <input
              type="number"
              className="form-control"
              value={data.price}
              onChange={(e) => setdata({ ...data, price: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Category</label>
            <input
              type="text"
              className="form-control"
              value={data.category}
              onChange={(e) => setdata({ ...data, category: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Brand</label>
            <input
              type="text"
              className="form-control"
              value={data.brand}
              onChange={(e) => setdata({ ...data, brand: e.target.value })}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default Addproduct;
