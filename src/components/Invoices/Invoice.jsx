import React, { useState, useEffect } from "react";
import axios from "axios";
import "./invoices.css";

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [newInvoice, setNewInvoice] = useState({
    customer_name: "",
    amount: "",
    invoice_date: "",
    user_id: ""
  });
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true); // To manage loading state
  const [error, setError] = useState(""); // To handle error state

  // For demo purposes, we'll assume the logged-in user is fetched dynamically (replace this with actual logic)
  const loggedInUserId = localStorage.getItem("loggedInUserId") || "78"; // Replace with your dynamic user logic

  useEffect(() => {
    // Fetch invoices and users when component mounts
    fetchInvoices(loggedInUserId);
    fetchUsers();
  }, [loggedInUserId]);

  // Fetch invoices based on user ID
  const fetchInvoices = (userId) => {
    setLoading(true);
    axios
      .get(
        `http://localhost/backend/Invoices/get_invoices.php?user_id=${userId}`
      )
      .then((response) => {
        if (response.data.success) {
          setInvoices(response.data.invoices);
        } else {
          setError("Failed to load invoices.");
        }
      })
      .catch((error) => {
        console.error("Error fetching invoices:", error);
        setError("Error fetching invoices.");
      })
      .finally(() => setLoading(false));
  };

  // Fetch all users dynamically
  const fetchUsers = () => {
    setLoading(true);
    axios
      .get("http://localhost/backend/fetch_users.php")
      .then((response) => {
        if (response.data.success) {
          setUsers(response.data.users); // Assume the response contains a 'users' array
        } else {
          setError("Failed to load users.");
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setError("Error fetching users.");
      })
      .finally(() => setLoading(false));
  };

  // Handle adding a new invoice
  const handleAddInvoice = () => {
    axios
      .post("http://localhost/backend/Invoices/add_invoice.php", newInvoice)
      .then((response) => {
        if (response.data.success) {
          alert("Invoice added successfully!");
          fetchInvoices(loggedInUserId);
          setShowModal(false);
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => console.error("Error adding invoice:", error));
  };

  return (
    <div className="container">
      <h1>Invoices</h1>

      {/* Display loading state */}
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <button onClick={() => setShowModal(true)}>Add Invoice</button>

      {/* Display invoices in a table */}
      <table>
        <thead>
          <tr>
            <th>Invoice ID</th>
            <th>Customer</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id}>
              <td>{invoice.id}</td>
              <td>{invoice.customer_name}</td>
              <td>{invoice.amount}</td>
              <td>{invoice.invoice_date}</td>
              <td>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal to add new invoice */}
      {showModal && (
        <div className="modal show">
          <div className="modal-content">
            <h3>Add New Invoice</h3>
            <input
              type="text"
              placeholder="Customer Name"
              value={newInvoice.customer_name}
              onChange={(e) =>
                setNewInvoice({ ...newInvoice, customer_name: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Amount"
              value={newInvoice.amount}
              onChange={(e) =>
                setNewInvoice({ ...newInvoice, amount: e.target.value })
              }
            />
            <input
              type="date"
              value={newInvoice.invoice_date}
              onChange={(e) =>
                setNewInvoice({ ...newInvoice, invoice_date: e.target.value })
              }
            />
            <select
              value={newInvoice.user_id}
              onChange={(e) =>
                setNewInvoice({ ...newInvoice, user_id: e.target.value })
              }
            >
              <option value="">Select User</option>
              {users && users.length > 0 ? (
                users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.username}
                  </option>
                ))
              ) : (
                <option value="">No users available</option>
              )}
            </select>
            <button onClick={handleAddInvoice}>Add Invoice</button>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Invoices;
