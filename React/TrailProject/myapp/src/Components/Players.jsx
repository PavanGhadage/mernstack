import React from "react";

const Players = (props) => {
  return (
    <>
      {/* <h1>Players Component</h1> */}
      <div className="card" style={{ width: "18rem" }}>
        <h1 className="text-center">{props.name}</h1>
        <img src={props.img} className="card-img-top" alt="..." />
        <div className="card-body">
          <h2>Age: {props.age}</h2>
          <h2>Team: {props.team}</h2>
        </div>
      </div>
    </>
  );
};

export default Players;
