import axios from "axios";
import React, { useEffect, useState } from "react";

function ContactMessages() {
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const result = await axios.get("http://localhost:3000/contact");

      setMessages(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMessage = async (id) => {
    const confirmDelete = window.confirm("Delete this message?");

    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/contact/${id}`);

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
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredMessages.length > 0 ? (
                filteredMessages.map((msg) => (
                  <tr key={msg.id}>
                    <td>{msg.id}</td>

                    <td>{msg.name}</td>

                    <td>{msg.email}</td>

                    <td>{msg.date}</td>

                    <td
                      style={{
                        maxWidth: "250px",
                        wordBreak: "break-word",
                      }}
                    >
                      {msg.message}
                    </td>

                    <td>
                      <button
                        className="btn btn-danger btn-sm w-100"
                        onClick={() => deleteMessage(msg.id)}
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
    </div>
  );
}

export default ContactMessages;
