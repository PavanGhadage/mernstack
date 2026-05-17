import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [data, setdata] = useState([]);
  const [search, setsearch] = useState("");
  const [category, setcategory] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    const getdata = async () => {
      try {
        const result = await axios.get("http://localhost:3000/restaurants");
        setdata(result.data);
      } catch (error) {
        console.log(error);
      }
    };

    getdata();
  }, []);

  const filterdata = data.filter((restaurant) => {
    const namesearch = restaurant.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const categorysearch =
      category === "" ||
      restaurant.category.toLowerCase() === category.toLowerCase();

    return namesearch && categorysearch;
  });

  return (
    <div className="container py-5">
      <h1 className="text-center fw-bold mb-5">Top Restaurants Near You</h1>

      <div className="row justify-content-center mb-5">
        <div className="col-md-4 mb-3">
          <input
            type="text"
            placeholder="Search Restaurant Name..."
            className="form-control p-3 rounded-pill shadow"
            value={search}
            onChange={(e) => setsearch(e.target.value)}
          />
        </div>

        <div className="col-md-3 mb-3">
          <select
            className="form-select p-3 rounded-pill shadow"
            value={category}
            onChange={(e) => setcategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Pizza">Pizza</option>
            <option value="Burger">Burger</option>
            <option value="IceCream">IceCream</option>
            <option value="Biryani">Biryani</option>
            <option value="Chinese">Chinese</option>
            <option value="Desserts">Desserts</option>
          </select>
        </div>
      </div>

      <div className="row g-4">
        {filterdata.length > 0 ? (
          filterdata.map((restaurant) => {
            return (
              <div className="col-md-6 col-lg-4" key={restaurant.id}>
                <div
                  className="card border-0 shadow-lg rounded-4 overflow-hidden h-100"
                  style={{
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.boxShadow =
                      "0 20px 40px rgba(0,0,0,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "";
                  }}
                >
                  <img
                    src={restaurant.image}
                    className="card-img-top"
                    style={{
                      height: "250px",
                      objectFit: "cover",
                    }}
                  />

                  <div className="card-body p-4">
                    <h2 className="text-center fw-bold mb-4 text-dark">
                      {restaurant.name}
                    </h2>

                    <div>
                      <div className="d-flex justify-content-between border-bottom pb-2 mb-2">
                        <span className="fw-bold">Category</span>
                        <span className="text-secondary">
                          {restaurant.category}
                        </span>
                      </div>

                      <div className="d-flex justify-content-between border-bottom pb-2 mb-2">
                        <span className="fw-bold">Cuisine</span>
                        <span className="text-secondary">
                          {restaurant.cuisine}
                        </span>
                      </div>

                      <div className="d-flex justify-content-between border-bottom pb-2 mb-2">
                        <span className="fw-bold">Rating</span>
                        <span className="text-warning">
                          ⭐ {restaurant.rating}
                        </span>
                      </div>

                      <div className="d-flex justify-content-between border-bottom pb-2 mb-2">
                        <span className="fw-bold">Price</span>
                        <span className="text-success fw-bold">
                          {restaurant.price}
                        </span>
                      </div>

                      <div className="d-flex justify-content-between">
                        <span className="fw-bold">Delivery</span>
                        <span className="text-secondary">
                          {restaurant.deliveryTime}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <button
                        className="btn btn-warning w-100 fw-bold py-2 rounded-pill"
                        onClick={() => nav(`/viewmenu/${restaurant.id}`)}
                      >
                        View Menu
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center mt-5">
            <h2 className="text-danger fw-bold">No Matching Results Found</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
