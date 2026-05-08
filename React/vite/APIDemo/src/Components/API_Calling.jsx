import React, { useEffect, useState } from "react";

function API_Calling() {
  const [data, setdata] = useState([]);
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((result) => result.json())
      .then((data) => setdata(data.products));
  }, []);
  console.log(data);
  return (
    <>
      <h1>API Calling</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Description</th>
            <th>Category</th>
            <th>Price</th>
          </tr>
        </thead>
        <tBody>
          {data.map((val) => {
            return (
              <tr key={data.id}>
                <td>{val.id}</td>
                <td>{val.title}</td>
                <td>{val.description}</td>
                <td>{val.category}</td>
                <td>{val.price}</td>
              </tr>
            );
          })}
        </tBody>
      </table>
    </>
  );
}

export default API_Calling;
