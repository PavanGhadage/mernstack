import React, { useState } from "react";

function Home() {
  const [userData, setUserData] = useState([]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [emailError, setEmailError] = useState("");

  function validateForm() {
    let hasError = false;

    if (firstName.trim() === "") {
      hasError = true;
      setFirstNameError("Please enter first name");
    } else {
      setFirstNameError("");
    }

    if (lastName.trim() === "") {
      hasError = true;
      setLastNameError("Please enter last name");
    } else {
      setLastNameError("");
    }

    if (mobileNumber.trim() === "") {
      hasError = true;
      setMobileError("Please enter mobile number");
    } else {
      setMobileError("");
    }

    if (email.trim()=== "") {
      hasError = true;
      setEmailError("Please enter email");
    } else {
      setEmailError("");
    }

    return hasError;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!validateForm()) {
      const newUser = {
        firstName,
        lastName,
        mobileNumber,
        email,
      };

      setUserData([...userData, newUser]);

      setFirstName("");
      setLastName("");
      setMobileNumber("");
      setEmail("");
    }
  }

  console.log(userData);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 p-5 bg-light rounded">
          <h2 className="text-center mb-4">Registration Form</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">First Name</label>
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Enter Your First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              {firstNameError && (
                <p className="text-danger mt-1">{firstNameError}</p>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Enter Your Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              {lastNameError && (
                <p className="text-danger mt-1">{lastNameError}</p>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Mobile Number</label>
              <input
                type="number"
                className="form-control form-control-lg"
                placeholder="Enter Your Number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
              {mobileError && <p className="text-danger mt-1">{mobileError}</p>}
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control form-control-lg"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && <p className="text-danger mt-1">{emailError}</p>}
            </div>

            <button type="submit" className="btn btn-primary btn-lg w-100">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Home;
