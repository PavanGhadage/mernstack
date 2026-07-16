import axios from "axios";
import React, { useEffect, useState } from "react";

function ContactMessages() {
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const result = await axios.get("http://localhost:5000/api/contact");

      setMessages(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  const viewMessage = (msg) => {
    setSelectedMessage(msg);
    setShowModal(true);
  };

  const deleteMessage = async (id) => {
    const confirmDelete = window.confirm("Delete this message?");

    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/contact/${id}`);

      fetchMessages();

      alert("Message Deleted Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const filteredMessages = messages.filter(
    (item) =>
      item.name?.toLowerCase().includes(search.toLowerCase()) ||
      item.email?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="container-fluid py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
        <div>
          <h2 className="fw-bold">📩 Contact Messages</h2>

          <p className="text-muted">Manage customer messages</p>
        </div>

        <div
          className="card shadow border-0"
          style={{
            minWidth: "150px",
          }}
        >
          <div className="card-body text-center">
            <h6>Total Messages</h6>

            <h2 className="text-primary">{messages.length}</h2>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="card shadow border-0 mb-4">
        <div className="card-body">
          <input
            type="text"
            className="form-control"
            placeholder="🔍 Search Name or Email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Messages Table */}
      <div className="card shadow border-0">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Date</th>
                <th>Message</th>
                <th>View</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredMessages.length > 0 ? (
                filteredMessages.map((msg) => (
                  <tr key={msg._id}>
                    <td>{msg._id.slice(-6)}</td>

                    <td>{msg.name}</td>

                    <td>{msg.email}</td>

                    <td>{msg.date}</td>

                    <td>
                      {msg.message.length > 50
                        ? msg.message.slice(0, 50) + "..."
                        : msg.message}
                    </td>
                    <td>
                      <button
                        className="btn btn-primary btn-sm w-100"
                        onClick={() => viewMessage(msg)}
                      >
                        👁 View
                      </button>
                    </td>

                    <td>
                      <button
                        className="btn btn-danger btn-sm w-100"
                        onClick={() => deleteMessage(msg._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    No Messages Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {showModal && selectedMessage && (
        <div
          className="modal fade show d-block"
          style={{
            backgroundColor: "rgba(0,0,0,0.6)",
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-dark text-white">
                <h5 className="modal-title">📩 Message Details</h5>

                <button
                  className="btn-close btn-close-white"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              <div className="modal-body">
                <p>
                  <strong>Name:</strong> {selectedMessage.name}
                </p>

                <p>
                  <strong>Email:</strong> {selectedMessage.email}
                </p>

                <p>
                  <strong>Date:</strong> {selectedMessage.date}
                </p>

                <hr />

                <h6>Message:</h6>

                <div
                  className="border rounded p-3 bg-light"
                  style={{
                    maxHeight: "250px",
                    overflowY: "auto",
                  }}
                >
                  {selectedMessage.message}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContactMessages;
