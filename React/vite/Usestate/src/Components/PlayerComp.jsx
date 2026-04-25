import React from "react";

export default function PlayerComp(props) {
  return (
    <>
      <div style={{ border: "1px solid gray", margin: 10, padding: 10 }}>
        <img src={props.img} width="120" />

        <h3>{props.name}</h3>

        <p>Age: {props.age}</p>

        <p>Team: {props.team}</p>
      </div>
    </>
  );
}
