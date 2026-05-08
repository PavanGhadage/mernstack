import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

function Update() {
  const param = useParams();
  const nav = useNavigate();

  const [data, setdata] = useState({
    title: "",
    industry: "",
    payscale: "",
    experience: "",
    joiningDate: "",
  });
  const [terror, setterror] = useState("");
  const [ierror, setierror] = useState("");
  const [perror, setperror] = useState("");
  const [eerror, seteerror] = useState("");
  const [jerror, setjerror] = useState("");

  const validate = () => {
    let isresult = true;

    if (!data.title.trim()) {
      setterror("please! Select job title");
      isresult = false;
    } else setterror("");

    if (!data.industry.trim()) {
      setierror("please! Select industry");
      isresult = false;
    } else setierror("");

    if (!data.payscale.trim()) {
      setperror("please! Enter payscale");
      isresult = false;
    } else setperror("");

    if (!data.experience.toString().trim()) {
      seteerror("please! Enter experience");
      isresult = false;
    } else seteerror("");

    if (!data.joiningDate.trim()) {
      setjerror("please! Select joining date");
      isresult = false;
    } else setjerror("");

    return isresult;
  };
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const result = await axios.get(
          `http://localhost:3000/jobs/${param.id}`,
        );
        setdata(result.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchdata();
  }, [param.id]);

  const onsubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await axios.put(`http://localhost:3000/jobs/${param.id}`, data);

      alert("Job Updated Successfully");
      nav("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-vh-100 bg-light py-5">
      <div className="container">
        <div
          className="card shadow-lg border-0 rounded-4 mx-auto p-4"
          style={{ maxWidth: "700px" }}
        >
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="fw-bold text-primary m-0">Add Job Details</h3>

            <NavLink to="/" className="btn btn-outline-primary btn-sm">
              See All Jobs
            </NavLink>
          </div>

          <form onSubmit={onsubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Job Title</label>
              <select
                className="form-select shadow-sm"
                value={data.title}
                onChange={(e) => setdata({ ...data, title: e.target.value })}
              >
                <option value="">Select Job Role</option>
                <option>MERN Developer</option>
                <option>React Developer</option>
                <option>Backend Developer</option>
                <option>Java Fullstack Developer</option>
              </select>
              {terror && <small className="text-danger">{terror}</small>}
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Industry</label>
              <select
                className="form-select shadow-sm"
                value={data.industry}
                onChange={(e) => setdata({ ...data, industry: e.target.value })}
              >
                <option value="">Select Industry</option>
                <option>Software Development</option>
                <option>IT Services</option>
                <option>Finance</option>
                <option>Healthcare</option>
              </select>
              {ierror && <small className="text-danger">{ierror}</small>}
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Payscale</label>
              <input
                type="text"
                className="form-control shadow-sm"
                placeholder="e.g. ₹50,000"
                value={data.payscale}
                onChange={(e) => setdata({ ...data, payscale: e.target.value })}
              />
              {perror && <small className="text-danger">{perror}</small>}
            </div>

            {/* EXPERIENCE */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Experience</label>
              <input
                type="number"
                className="form-control shadow-sm"
                placeholder="e.g. 2 years"
                value={data.experience}
                onChange={(e) =>
                  setdata({ ...data, experience: e.target.value })
                }
              />
              {eerror && <small className="text-danger">{eerror}</small>}
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">Joining Date</label>
              <input
                type="date"
                className="form-control shadow-sm"
                value={data.joiningDate}
                onChange={(e) =>
                  setdata({ ...data, joiningDate: e.target.value })
                }
              />
              {jerror && <small className="text-danger">{jerror}</small>}
            </div>

            <button className="btn btn-primary w-100 py-2 fw-semibold">
              Add Job
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Update;
