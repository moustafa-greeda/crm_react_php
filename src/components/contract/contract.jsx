// filepath: /c:/Users/kelenton/Desktop/cmr/crm_react_php/src/components/contract/contract.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const Contracts = () => {
  const [contracts, setContracts] = useState([]);
  const [users, setUsers] = useState([]);
  const [newContract, setNewContract] = useState({
    user_id: "",
    contract_name: "",
    contract_file: null,
  });
  const [isContractModalOpen, setIsContractModalOpen] = useState(false);
  const [editContract, setEditContract] = useState(null);

  useEffect(() => {
    fetchContracts();
    fetchUsers();
  }, []);

  const fetchContracts = async () => {
    try {
      const response = await axios.get(
        "http://localhost/backend/contract/fetch_contracts.php"
      );
      setContracts(response.data);
    } catch (error) {
      console.error("Error fetching contracts:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost/backend/fetch_users.php"
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const getUserName = (userId) => {
    const user = users.find((user) => user.id === userId);

    return user ? user.name : "Unknown";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContract({ ...newContract, [name]: value });
  };

  const handleFileChange = (e) => {
    setNewContract({ ...newContract, contract_file: e.target.files[0] });
  };

  const handleAddContract = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("user_id", newContract.user_id);
    formData.append("contract_name", newContract.contract_name);
    formData.append("contract_file", newContract.contract_file);

    try {
      const response = await axios.post(
        "http://localhost/backend/contract/add_contract.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.success) {
        fetchContracts();
        setNewContract({ user_id: "", contract_name: "", contract_file: null });
        setIsContractModalOpen(false);
      } else {
        console.error("Error adding contract:", response.data.message);
      }
    } catch (error) {
      console.error("Error adding contract:", error);
    }
  };

  const handleEditContract = (contract) => {
    setEditContract(contract);
    setNewContract({
      user_id: contract.user_id,
      contract_name: contract.contract_name,
      contract_file: null,
    });
    setIsContractModalOpen(true);
  };

  const handleUpdateContract = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("user_id", newContract.user_id);
    formData.append("contract_name", newContract.contract_name);
    if (newContract.contract_file) {
      formData.append("contract_file", newContract.contract_file);
    }

    try {
      const response = await axios.post(
        `http://localhost/backend/contract/update_contract.php?id=${editContract.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.success) {
        fetchContracts();
        setNewContract({ user_id: "", contract_name: "", contract_file: null });
        setEditContract(null);
        setIsContractModalOpen(false);
      } else {
        console.error("Error updating contract:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating contract:", error);
    }
  };

  const handleDownloadFile = (fileName) => {
    const fileUrl = `http://localhost/backend/uploads/${fileName}`;
    window.open(fileUrl, "_blank");
  };

  const handleDeleteContract = async (contractId) => {
    try {
      const response = await axios.delete(
        `http://localhost/backend/contract/delete_contract.php?id=${contractId}`
      );
      if (response.data.success) {
        fetchContracts();
      } else {
        console.error("Error deleting contract:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting contract:", error);
    }
  };

  return (
    <div>
      <h2>Contracts</h2>

      <h3>Existing Contracts</h3>
      <table className="table table-bordered text-center">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Contract Name</th>
            <th scope="col">Customer Name</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contracts.map((contract, index) => (
            <tr key={contract.id}>
              <th scope="row">{index + 1}</th>
              <td>{contract.contract_name}</td>
              <td>{getUserName(contract.user_id)}</td>
              <td>
                <div className="d-flex justify-content-center">
                  <button
                    onClick={() => handleDownloadFile(contract.contract_file)}
                    className="btn btn-secondary me-2"
                  >
                    Open File
                  </button>
                  <button
                    onClick={() => handleEditContract(contract)}
                    className="btn btn-primary me-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteContract(contract.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isContractModalOpen && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          aria-labelledby="contractModalLabel"
          aria-hidden="false"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="contractModalLabel">
                  {editContract ? "Edit Contract" : "New Contract"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setIsContractModalOpen(false);
                    setEditContract(null);
                  }}
                />
              </div>
              <div className="modal-body">
                <form
                  onSubmit={
                    editContract ? handleUpdateContract : handleAddContract
                  }
                >
                  <div className="mb-3">
                    <label
                      htmlFor="contract-user-id"
                      className="col-form-label"
                    >
                      User ID:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="contract-user-id"
                      name="user_id"
                      value={newContract.user_id}
                      onChange={handleInputChange}
                      required
                      readOnly={!!editContract}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="contract-name" className="col-form-label">
                      Contract Name:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="contract-name"
                      name="contract_name"
                      value={newContract.contract_name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="contract-file" className="col-form-label">
                      Contract File:
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="contract-file"
                      name="contract_file"
                      onChange={handleFileChange}
                      accept=".jpg,.jpeg,.png,.gif,.pdf"
                      required={!editContract}
                    />
                  </div>
                  <button className="btn btn-primary" type="submit">
                    {editContract ? "Update Contract" : "Add Contract"}
                  </button>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setIsContractModalOpen(false);
                    setEditContract(null);
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contracts;
