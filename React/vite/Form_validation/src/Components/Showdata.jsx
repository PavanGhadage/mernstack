import React from "react";
import { useLocation } from "react-router-dom";

function Showdata() {
  const location = useLocation();
  const data = location.state || [];

  return (
    <div className="container mt-5">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Number</th>
            <th>Email</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.Yname}</td>
              <td>{item.sname}</td>
              <td>{item.number}</td>
              <td>{item.mail}</td>
            </tr>
          ))}
          
        </tbody>
      </table>
    </div>
  );
}

export default Showdata;
