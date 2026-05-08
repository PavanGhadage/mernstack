import React, { useState } from "react";

function Homepage() {
  const [name, setname] = useState({
    Yname: "",
    sname: "",
    number: "",
    mail: "",
  });

  const [tableData, setTableData] = useState([]);

  function show(e) {
    setname({
      ...name,
      [e.target.name]: e.target.value,
    });
  }

  // function nextPage() {
  //   const updatedata = [...tableData, name];
  //   setTableData(updatedata);
  //   nav("/showdata", {
  //     state: updatedata,
  //   });
  //   setname({
  //     Yname: "",
  //     sname: "",
  //     number: "",
  //     mail: "",
  //   });
  // }

  function showdata() {
    setTableData([...tableData, name]);

    setname({
      Yname: "",
      sname: "",
      number: "",
      mail: "",
    });
  }

  return (
    <div className="container mt-5">
      <div className="col-md-8 mx-auto">
        <h2 className="text-center mb-4 text-primary">Registration Form</h2>

        <input
          type="text"
          name="Yname"
          value={name.Yname}
          onChange={show}
          className="form-control mb-3"
          placeholder="Name"
        />

        <input
          type="text"
          name="sname"
          value={name.sname}
          onChange={show}
          className="form-control mb-3"
          placeholder="Surname"
        />

        <input
          type="text"
          name="number"
          value={name.number}
          onChange={show}
          className="form-control mb-3"
          placeholder="Contact"
        />

        <input
          type="email"
          name="mail"
          value={name.mail}
          onChange={show}
          className="form-control mb-3"
          placeholder="Email"
        />

        <button
          type="button"
          className="btn btn-primary w-100"
          onClick={showdata}
        >
          Submit
        </button>

        {tableData && (
          <table className="table table-bordered mt-4">
            <thead>
              <tr>
                <th>Name</th>
                <th>Surname</th>
                <th>Number</th>
                <th>Email</th>
              </tr>
            </thead>

            <tbody>
              {tableData.map((item, index) => (
                <tr key={index}>
                  <td>{item.Yname}</td>
                  <td>{item.sname}</td>
                  <td>{item.number}</td>
                  <td>{item.mail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
    // <button onClick={nextPage}>submit</button>
  );
}

export default Homepage;
