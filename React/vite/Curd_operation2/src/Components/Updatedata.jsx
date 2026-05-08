import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Updatedata() {
  const [data, updatedata] = useState({});

  const param = useParams();
  const nav = useNavigate();

  // Fetch Single Product
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const result = await axios.get(
          `http://localhost:3000/products/${param.id}`,
        );

        updatedata(result.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchdata();
  }, []);

  // Update Product
  const Onsubmit = async (e, id, data) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:3000/products/${param.id}`, data);

      alert("Product Updated");

      nav("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>This is update page</h1>

      <div className="container mt-5">
        <div className="card shadow p-4">
          <h2 className="text-center mb-4">Update Product</h2>

          <form
            onSubmit={(e) => {
              Onsubmit(e, param.id, data);
            }}
          >
            <div className="mb-3">
              <label className="form-label">Product Name</label>

              <input
                type="text"
                className="form-control"
                value={data.name || ""}
                onChange={(e) => {
                  updatedata({
                    ...data,
                    name: e.target.value,
                  });
                }}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Price</label>

              <input
                type="number"
                className="form-control"
                value={data.price || ""}
                onChange={(e) => {
                  updatedata({
                    ...data,
                    price: e.target.value,
                  });
                }}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Category</label>

              <input
                type="text"
                className="form-control"
                value={data.category || ""}
                onChange={(e) => {
                  updatedata({
                    ...data,
                    category: e.target.value,
                  });
                }}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Brand</label>

              <input
                type="text"
                className="form-control"
                value={data.brand || ""}
                onChange={(e) => {
                  updatedata({
                    ...data,
                    brand: e.target.value,
                  });
                }}
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Update Product
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Updatedata;
