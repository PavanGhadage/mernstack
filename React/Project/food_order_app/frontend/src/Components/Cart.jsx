import API from "../api/axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const VEG =
  "https://res.cloudinary.com/ys0alilz/image/upload/v1782530119/veg_e4jamu.jpg  ";

const NONVEG =
  "https://res.cloudinary.com/ys0alilz/image/upload/v1782530118/nonveg_f6rg3q.webp";

function Cart() {
  const [data, setdata] = useState([]);
  const [qty, setQty] = useState({});
  const nav = useNavigate();

  // GET CART DATA
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const token = localStorage.getItem("token");

        const result = await API.get("/api/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setdata(result.data);

        const initialQty = {};

        result.data.forEach((item) => {
          initialQty[item._id] = item.qty || 1;
        });

        setQty(initialQty);
      } catch (error) {
        console.log(error);
      }
    };

    fetchdata();
  }, []);

  // REMOVE ITEM
  const remove = async (id) => {
    const token = localStorage.getItem("token");

    await API.delete(`/api/cart/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setdata((prev) => prev.filter((item) => item._id !== id));

    toast.success("Item Removed From Cart 🗑️");
  };
  // INCREASE
  const increase = (id) => {
    setQty((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };
  const decrease = (id) => {
    setQty((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) > 1 ? prev[id] - 1 : 1,
    }));
  };

  // price convert (₹ remove)
  const getPrice = (price) => {
    if (!price) return 0;

    return parseInt(price.replace("₹", ""));
  };
  const grandTotal = data.reduce(
    (sum, item) => sum + getPrice(item.price) * (qty[item._id] || 1),
    0,
  );
  console.log(data);
  return (
    <>
      <div className="container-fluid container-lg py-4 py-md-5">
        <div className="text-center mb-5">
          <h1 className="fw-bold display-5">🛒 Your Cart</h1>
          <p className="text-secondary fs-5">
            Delicious food waiting for you 🍕
          </p>
        </div>

        <div className="row g-4">
          {data.map((item) => {
            console.log(item.foodType);
            const total = getPrice(item.price) * (qty[item._id] || 1);

            return (
              <div className="col-12 col-lg-6" key={item._id}>
                <div className="card border-0 shadow-lg rounded-5 overflow-hidden h-100">
                  <div className="row g-0 h-100">
                    {/* IMAGE */}
                    <div className="col-12 col-md-5 position-relative">
                      <img
                        src={item.image}
                        alt=""
                        className="w-100 h-100"
                        style={{
                          objectFit: "cover",
                          height: "250px",
                        }}
                      />

                      <img
                        src={item.foodType === "veg" ? VEG : NONVEG}
                        alt=""
                        className="position-absolute bg-white rounded-circle p-1 shadow"
                        style={{
                          width: "50px",
                          height: "50px",
                          top: "20px",
                          right: "20px",
                        }}
                      />
                    </div>

                    {/* CONTENT */}
                    <div className="col-12 col-md-7">
                      <div className="card-body p-4 d-flex flex-column justify-content-between h-100">
                        {/* TOP */}
                        <div>
                          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                            <div>
                              <h2 className="fw-bold mb-2">{item.name}</h2>
                              <p className="text-secondary">{item.cuisine}</p>
                            </div>

                            <div className="bg-warning px-3 py-2 rounded-pill fw-bold shadow">
                              ⭐ {item.rating}
                            </div>
                          </div>

                          <div className="row mt-3 g-3">
                            <div className="col-6">
                              <div className="bg-light rounded-4 p-3 text-center h-100">
                                <h6 className="fw-bold">Category</h6>
                                <p className="mb-0 text-secondary">
                                  {item.category}
                                </p>
                              </div>
                            </div>

                            <div className="col-6">
                              <div className="bg-light rounded-4 p-3 text-center h-100">
                                <h6 className="fw-bold">Delivery</h6>
                                <p className="mb-0 text-secondary">
                                  🚚 {item.deliveryTime}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* BOTTOM */}
                        <div className="mt-4">
                          {/* QTY */}
                          <div className="d-flex align-items-center flex-wrap gap-3 mb-4">
                            <button
                              className="btn btn-dark rounded-circle fw-bold"
                              onClick={() => decrease(item._id)}
                            >
                              -
                            </button>

                            <span className="fs-4 fw-bold">
                              {qty[item._id] || 1}
                            </span>

                            <button
                              className="btn btn-warning rounded-circle fw-bold"
                              onClick={() => increase(item._id)}
                            >
                              +
                            </button>
                          </div>

                          {/* PRICE + BUTTONS */}
                          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                            <div>
                              <h5 className="text-secondary">Total Price</h5>
                              <h3 className="fw-bold text-success">₹{total}</h3>
                            </div>

                            <div className="d-flex flex-column flex-sm-row gap-2 mt-3 mt-md-0">
                              <button
                                className="btn btn-outline-danger rounded-pill px-4 fw-bold"
                                onClick={() => remove(item._id)}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {data.length > 0 && (
          <div className="text-center mt-5">
            <h3 className="fw-bold mb-3">Grand Total: ₹{grandTotal}</h3>

            <button
              className="btn btn-success btn-lg px-5 rounded-pill"
              style={{ maxWidth: "400px", width: "100%" }}
              onClick={() =>
                nav("/checkout", {
                  state: {
                    cartItems: data.map((item) => ({
                      ...item,
                      qty: qty[item._id] || 1,
                    })),
                    total: grandTotal,
                  },
                })
              }
            >
              Proceed To Checkout
            </button>
          </div>
        )}

        {/* EMPTY CART */}
        {data.length === 0 && (
          <div className="text-center mt-5">
            <h2 className="fw-bold">Your Cart Is Empty 🛒</h2>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;
