import axios from "axios";
import React, { useEffect, useState } from "react";

function Restaurants() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [showModal, setShowModal] = useState(false);
  //add
  const [newRestaurant, setNewRestaurant] = useState({
    name: "",
    category: "",
    cuisine: "",
    rating: "",
    price: "",
    deliveryTime: "",
    image: "",
    symbol: "",
  });

  //edit
  const [editMode, setEditMode] = useState(false);

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const result = await axios.get("http://localhost:3000/restaurants");

      setProducts(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/restaurants/${id}`);

      setProducts(products.filter((product) => product.id !== id));

      alert("✅ Product Deleted Successfully");
    } catch (error) {
      console.log(error);
    }
  };
  const editRestaurant = (restaurant) => {
    setEditMode(true);

    setEditId(restaurant.id);

    setNewRestaurant({
      name: restaurant.name || "",
      category: restaurant.category || "",
      cuisine: restaurant.cuisine || "",
      rating: restaurant.rating || "",
      price: restaurant.price || "",
      deliveryTime: restaurant.deliveryTime || "",
      image: restaurant.image || "",
      symbol: restaurant.symbol || "",
    });

    setShowModal(true);
  };
  const addRestaurant = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/restaurants", newRestaurant);

      alert("Restaurant Added Successfully ✅");

      fetchProducts();

      setShowModal(false);

      setNewRestaurant({
        name: "",
        category: "",
        cuisine: "",
        rating: "",
        price: "",
        deliveryTime: "",
        image: "",
        symbol: "",
      });
    } catch (error) {
      console.log(error);
    }
  };
  const updateRestaurant = async (e) => {
    e.preventDefault();

    try {
      await axios.patch(
        `http://localhost:3000/restaurants/${editId}`,
        newRestaurant,
      );

      alert("✅ Restaurant Updated Successfully");

      await fetchProducts();

      setEditMode(false);
      setEditId(null);
      setShowModal(false);

      setNewRestaurant({
        name: "",
        category: "",
        cuisine: "",
        rating: "",
        price: "",
        deliveryTime: "",
        image: "",
        symbol: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name?.toLowerCase().includes(search.toLowerCase()) ||
      product.category?.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container-fluid py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
        <div>
          <h2 className="fw-bold">🍔 Products Management</h2>

          <p className="text-muted">Manage all food products</p>
        </div>

        <div
          className="card shadow border-0"
          style={{
            borderRadius: "15px",
          }}
        >
          <button
            type="button"
            className="btn btn-success me-3"
            onClick={() => {
              setEditMode(false);

              setNewRestaurant({
                name: "",
                category: "",
                cuisine: "",
                rating: "",
                price: "",
                deliveryTime: "",
                image: "",
                symbol: "",
              });

              setShowModal(true);
            }}
          >
            ➕ Add Restaurant
          </button>
          <div className="card-body text-center">
            <h6>Total Products</h6>

            <h2 className="text-primary fw-bold">{products.length}</h2>
          </div>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="card shadow border-0 mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-12 col-md-8">
              <input
                type="text"
                className="form-control"
                placeholder="🔍 Search Product..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="col-12 col-md-4">
              <select
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="All">All Categories</option>

                <option value="Pizza">Pizza</option>

                <option value="Burger">Burger</option>

                <option value="Biryani">Biryani</option>

                <option value="Chinese">Chinese</option>

                <option value="Cafe">Cafe</option>

                <option value="icecream">Ice Cream</option>

                <option value="Desserts">Desserts</option>

                <option value="Healthy Food">Healthy Food</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <>
          <div
            className="modal fade show d-block"
            tabIndex="-1"
            style={{
              backgroundColor: "rgba(0,0,0,0.6)",
            }}
          >
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div
                className="modal-content border-0 shadow-lg"
                style={{
                  borderRadius: "20px",
                }}
              >
                <div className="modal-header bg-dark text-white">
                  <h5 className="modal-title">
                    {editMode ? "✏️ Edit Restaurant" : "➕ Add Restaurant"}
                  </h5>

                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>

                <div className="modal-body">
                  <form onSubmit={editMode ? updateRestaurant : addRestaurant}>
                    <div className="row g-3">
                      <div className="col-12 col-md-6">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Restaurant Name"
                          value={newRestaurant.name}
                          onChange={(e) =>
                            setNewRestaurant({
                              ...newRestaurant,
                              name: e.target.value,
                            })
                          }
                          required
                        />
                      </div>

                      <div className="col-12 col-md-6">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Category"
                          value={newRestaurant.category}
                          onChange={(e) =>
                            setNewRestaurant({
                              ...newRestaurant,
                              category: e.target.value,
                            })
                          }
                          required
                        />
                      </div>

                      <div className="col-12 col-md-6">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Cuisine"
                          value={newRestaurant.cuisine}
                          onChange={(e) =>
                            setNewRestaurant({
                              ...newRestaurant,
                              cuisine: e.target.value,
                            })
                          }
                          required
                        />
                      </div>

                      <div className="col-12 col-md-6">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Rating"
                          value={newRestaurant.rating}
                          onChange={(e) =>
                            setNewRestaurant({
                              ...newRestaurant,
                              rating: e.target.value,
                            })
                          }
                          required
                        />
                      </div>

                      <div className="col-12 col-md-6">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Price"
                          value={newRestaurant.price}
                          onChange={(e) =>
                            setNewRestaurant({
                              ...newRestaurant,
                              price: e.target.value,
                            })
                          }
                          required
                        />
                      </div>

                      <div className="col-12 col-md-6">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Delivery Time"
                          value={newRestaurant.deliveryTime}
                          onChange={(e) =>
                            setNewRestaurant({
                              ...newRestaurant,
                              deliveryTime: e.target.value,
                            })
                          }
                          required
                        />
                      </div>

                      <div className="col-12 col-md-6">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Image URL"
                          value={newRestaurant.image}
                          onChange={(e) =>
                            setNewRestaurant({
                              ...newRestaurant,
                              image: e.target.value,
                            })
                          }
                          required
                        />
                      </div>

                      <div className="col-12 col-md-6">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Symbol URL"
                          value={newRestaurant.symbol}
                          onChange={(e) =>
                            setNewRestaurant({
                              ...newRestaurant,
                              symbol: e.target.value,
                            })
                          }
                          required
                        />
                      </div>

                      <div className="col-12">
                        <button type="submit" className="btn btn-success w-100">
                          {editMode ? "Update Restaurant" : "Save Restaurant"}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Products */}
      <div className="row">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div className="col-lg-4 col-md-6 mb-4" key={product.id}>
              <div
                className="card h-100 shadow border-0"
                style={{
                  borderRadius: "15px",
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="card-img-top"
                  style={{
                    height: window.innerWidth < 768 ? "180px" : "220px",
                    objectFit: "cover",
                  }}
                />

                <div className="card-body">
                  <h5 className="fw-bold">{product.name}</h5>

                  <span className="badge bg-primary mb-2">
                    {product.category}
                  </span>

                  <p className="mb-1">⭐ {product.rating}</p>

                  <p className="mb-1">🍽 {product.cuisine}</p>

                  <p className="mb-1">🚚 {product.deliveryTime}</p>

                  <h5 className="text-success fw-bold">{product.price}</h5>
                </div>

                <div className="card-footer bg-white border-0">
                  <div className="d-flex flex-column flex-sm-row gap-2">
                    <button
                      type="button"
                      className="btn btn-warning w-50"
                      onClick={() => editRestaurant(product)}
                    >
                      ✏️ Edit
                    </button>

                    <button
                      className="btn btn-outline-danger w-50"
                      onClick={() => deleteProduct(product.id)}
                    >
                      🗑 Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center">
            <h4>No Products Found</h4>
          </div>
        )}
      </div>
    </div>
  );
}

export default Restaurants;
