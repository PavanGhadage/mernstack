import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Addjob from "./Addjob";

function HomePage() {
  const [data, setdata] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    const showdata = async () => {
      try {
        const result = await axios.get("http://localhost:3000/jobs");
        setdata(result.data);
      } catch (error) {
        console.log(error);
      }
    };

    showdata();
  }, []);

  const deletedata = async (id) => {
    if (confirm("Are you sure to delete?")) {
      await axios.delete(`http://localhost:3000/jobs/${id}`);
      alert("Card deleted successfully");
      setdata(data.filter((e) => e.id !== id));
    }
  };

  return (
    <div className="container py-5">
      <h1 className="text-center fw-bold mb-5">Available Jobs</h1>

      <div className="row g-4">
        {data.map((job) => {
          return (
            <div className="col-md-6 col-lg-4" key={job.id}>
              <div className="card shadow-lg border-0 rounded-4 h-100">
                <div className="card-body p-4 d-flex flex-column">
                  <h3 className="text-primary text-center fw-bold mb-4">
                    {job.title}
                  </h3>

                  <div className="mb-4">
                    <div className="d-flex justify-content-between border-bottom py-2">
                      <span className="fw-semibold">Industry</span>
                      <span>{job.industry}</span>
                    </div>

                    <div className="d-flex justify-content-between border-bottom py-2">
                      <span className="fw-semibold">Payscale</span>
                      <span>{job.payscale}</span>
                    </div>

                    <div className="d-flex justify-content-between border-bottom py-2">
                      <span className="fw-semibold">Experience</span>
                      <span>{job.experience} Years</span>
                    </div>

                    <div className="d-flex justify-content-between py-2">
                      <span className="fw-semibold">Joining Date</span>
                      <span>{job.joiningDate}</span>
                    </div>
                  </div>

                  <div className="mt-auto d-flex justify-content-between align-items-center">
                    <div className="d-flex gap-3">
                      <NavLink
                        to={`/edit/${job.id}`}
                        className="btn btn-warning btn-sm"
                      >
                        Edit
                      </NavLink>
                    </div>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deletedata(job.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HomePage;
