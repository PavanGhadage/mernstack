import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [data, setdata] = useState([]);
  const [qty, setQty] = useState({});
  const nav = useNavigate();

  // GET CART DATA
  useEffect(() => {
    const fetchdata = async () => {
      // const result = await axios.get("http://localhost:3000/cart");
      // setdata(result.data);
      const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};

      const result = await axios.get("http://localhost:3000/cart");

      const userCart = result.data.filter(
        (item) => item.userEmail === currentUser?.email,
      );

      setdata(userCart);

      // default quantity = 1
      const initialQty = {};
      result.data.forEach((item) => {
        initialQty[item.id] = 1;
      });
      setQty(initialQty);
    };

    fetchdata();
  }, []);

  // REMOVE ITEM
  const remove = async (id) => {
    await axios.delete(`http://localhost:3000/cart/${id}`);
    setdata((prev) => prev.filter((item) => item.id !== id));
  };

  // INCREASE
  const increase = (id) => {
    setQty((prev) => ({
      ...prev,
      [id]: prev[id] + 1,
    }));
  };

  // DECREASE
  const decrease = (id) => {
    setQty((prev) => {
      if (prev[id] > 1) {
        return {
          ...prev,
          [id]: prev[id] - 1,
        };
      } else {
        return {
          ...prev,
          [id]: 1,
        };
      }
    });
  };

  // price convert (₹ remove)
  const getPrice = (price) => parseInt(price.slice(1));

  return (
    <>
      <div className="container py-5">
        <div className="text-center mb-5">
          <h1 className="fw-bold display-5">🛒 Your Cart</h1>
          <p className="text-secondary fs-5">
            Delicious food waiting for you 🍕
          </p>
        </div>

        <div className="row g-4">
          {data.map((item) => {
            const total = getPrice(item.price) * qty[item.id];

            return (
              <div className="col-lg-6" key={item.id}>
                <div className="card border-0 shadow-lg rounded-5 overflow-hidden h-100">
                  <div className="row g-0 h-100">
                    {/* IMAGE */}
                    <div className="col-md-5 position-relative">
                      <img
                        src={item.image}
                        alt=""
                        className="w-100 h-100"
                        style={{
                          objectFit: "cover",
                          minHeight: "100%",
                        }}
                      />

                      <img
                        src={item.symbol}
                        alt=""
                        className="position-absolute bg-white rounded-circle p-1 shadow"
                        style={{
                          width: "60px",
                          height: "60px",
                          top: "20px",
                          right: "20px",
                        }}
                      />
                    </div>

                    {/* CONTENT */}
                    <div className="col-md-7">
                      <div className="card-body p-4 d-flex flex-column justify-content-between h-100">
                        {/* TOP */}
                        <div>
                          <div className="d-flex justify-content-between align-items-center flex-wrap">
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
                          <div className="d-flex align-items-center gap-3 mb-4">
                            <button
                              className="btn btn-dark rounded-circle fw-bold"
                              onClick={() => decrease(item.id)}
                            >
                              -
                            </button>

                            <span className="fs-4 fw-bold">{qty[item.id]}</span>

                            <button
                              className="btn btn-warning rounded-circle fw-bold"
                              onClick={() => increase(item.id)}
                            >
                              +
                            </button>
                          </div>

                          {/* PRICE + BUTTONS */}
                          <div className="d-flex justify-content-between align-items-center flex-wrap">
                            <div>
                              <h5 className="text-secondary">Total Price</h5>
                              <h3 className="fw-bold text-success">₹{total}</h3>
                            </div>

                            <div className="d-flex gap-2 mt-3 mt-md-0">
                              <button
                                className="btn btn-outline-danger rounded-pill px-4 fw-bold"
                                onClick={() => remove(item.id)}
                              >
                                Remove
                              </button>
                              <button
                                className="btn btn-success rounded-pill px-4 fw-bold shadow"
                                onClick={() => {
                                  nav("/checkout", {
                                    state: {
                                      item: item,
                                      qty: qty[item.id],
                                      total: total,
                                    },
                                  });
                                }}
                              >
                                Checkout
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
