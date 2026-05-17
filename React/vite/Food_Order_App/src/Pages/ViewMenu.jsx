import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ViewMenu() {
  const { id } = useParams();
  const nav = useNavigate();

  const [data, setdata] = useState({});
  const [qty, setqty] = useState(1);

  // FETCH DATA
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const result = await axios.get(
          `http://localhost:3000/restaurants/${id}`,
        );

        setdata(result.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchdata();
  }, [id]);

  // INCREASE
  const increase = () => setqty((q) => q + 1);

  // DECREASE
  const decrease = () => {
    if (qty > 1) {
      setqty((q) => q - 1);
    }
  };

  // ADD TO CART
  const Addtocart = async () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));

      // LOGIN CHECK
      if (!currentUser) {
        alert("Please Login First");
        return;
      }

      // GET CART DATA
      const cartItems = await axios.get("http://localhost:3000/cart");

      // CHECK ALREADY EXISTS
      const existing = cartItems.data.find(
        (item) =>
          item.foodId === data.id &&
          item.userEmail &&
          item.userEmail === currentUser.email,
      );

      // ALREADY ADDED
      if (existing) {
        alert("Item already added to cart ❌");
        return;
      }

      // NEW CART DATA
      const cartData = {
        foodId: data.id,
        name: data.name,
        image: data.image,
        symbol: data.symbol,
        rating: data.rating,
        cuisine: data.cuisine,
        category: data.category,
        deliveryTime: data.deliveryTime,
        price: data.price,
        qty: qty,
        userEmail: currentUser.email,
      };

      // POST
      await axios.post("http://localhost:3000/cart", cartData);

      // NAVIGATE
      nav("/cart");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container py-5">
      <div
        className="card border-0 shadow-lg rounded-4 overflow-hidden mx-auto"
        style={{ maxWidth: "700px" }}
      >
        {/* IMAGE */}
        <div className="position-relative">
          <img
            src={data.image}
            className="w-100"
            style={{
              height: "320px",
              objectFit: "cover",
            }}
          />

          <img
            src={data.symbol}
            className="position-absolute bg-white rounded-circle p-1 shadow"
            style={{
              width: "55px",
              height: "55px",
              top: "15px",
              right: "15px",
            }}
          />

          <div
            className="position-absolute bg-warning px-3 py-2 rounded-pill fw-bold"
            style={{
              bottom: "15px",
              left: "15px",
            }}
          >
            ⭐ {data.rating}
          </div>
        </div>

        {/* BODY */}
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <div>
              <h2 className="fw-bold">{data.name}</h2>

              <p className="text-secondary">{data.cuisine}</p>
            </div>

            {/* QTY */}
            <div className="d-flex align-items-center gap-3">
              <button className="btn btn-dark" onClick={decrease}>
                -
              </button>

              <span className="fw-bold fs-5">{qty}</span>

              <button className="btn btn-warning" onClick={increase}>
                +
              </button>

              <button className="btn btn-success fw-bold">
                ₹{parseInt(data.price?.slice(1) || 0) * qty}
              </button>
            </div>
          </div>

          {/* DETAILS */}
          <div className="row mt-4 g-3">
            <div className="col-md-4">
              <div className="bg-light p-3 text-center rounded-3">
                <h6>Category</h6>

                <p>{data.category}</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="bg-light p-3 text-center rounded-3">
                <h6>Delivery</h6>

                <p>🚚 {data.deliveryTime}</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="bg-light p-3 text-center rounded-3">
                <h6>Rating</h6>

                <p className="text-warning fw-bold">⭐ {data.rating}</p>
              </div>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="d-flex gap-3 mt-4">
            <button
              className="btn btn-warning w-100 fw-bold"
              onClick={Addtocart}
            >
              Add To Cart
            </button>

            <button
              className="btn btn-dark w-100 fw-bold"
              onClick={() => {
                const currentUser = JSON.parse(
                  localStorage.getItem("currentUser"),
                );

                // LOGIN CHECK
                if (!currentUser) {
                  alert("Please Login First");
                  return;
                }

                nav("/ordernow", {
                  state: {
                    item: data,
                    qty: qty,
                    total: parseInt(data.price?.slice(1) || 0) * qty,
                  },
                });
              }}
            >
              Order Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewMenu;
