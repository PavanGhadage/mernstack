// import React from "react";

// const Page1 = ({ name, price, category, img }) => {
//   return (
//     <>
//       <div className="card m-3" style={{ width: "18rem" }}>
//         <img src={img} className="card-img-top" alt={name} />

//         <div className="card-body">
//           <h5 className="card-title">{name}</h5>

//           <p className="card-text">Price: ₹{price}</p>

//           <p className="card-text">Category: {category}</p>

//           <button className="btn btn-primary">Buy Now</button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Page1;
import React from "react";
import "./Page1.css";

const Page1 = ({ name, price, category, img }) => {
  return (
    <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
      <div className="card h-100 shadow-lg">
        <img
          src={img}
          className="card-img-top"
          alt={name}
          style={{ height: "200px", objectFit: "cover" }}
        />

        <div className="card-body text-center">
          <h5 className="card-title">{name}</h5>

          <p className="text-muted">Category: {category}</p>

          <p className="fw-bold text-success">₹{price}</p>

          <button className="btn btn-primary w-100">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default Page1;
