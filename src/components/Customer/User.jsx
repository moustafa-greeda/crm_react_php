import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

import NewTask from "./NewTask";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [inputs, setInputs] = useState({});
  const [editUser, setEditUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [contracts, setContracts] = useState([]);
  const [newContract, setNewContract] = useState({
    user_id: "",
    contract_name: "",
    contract_file: null,
  });
  const [isContractModalOpen, setIsContractModalOpen] = useState(false);

  // Add contract
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContract({ ...newContract, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const fileType = file.type;
    const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
    const validPdfTypes = ["application/pdf"];

    if (
      validImageTypes.includes(fileType) ||
      validPdfTypes.includes(fileType)
    ) {
      setNewContract({ ...newContract, contract_file: file });
    } else {
      alert("Please upload a valid image or PDF file.");
    }
  };

  // Fetch users from backend
  const getdata = async () => {
    try {
      const reqdata = await fetch("http://localhost/backend/fetch_users.php");
      const resdata = await reqdata.json();
      setUsers(resdata);


    } catch (error) {
      console.error("Error fetching users:", error);
    }
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
        setNewContract({ user_id: "", contract_name: "", contract_file: null });
        setIsContractModalOpen(false);
      } else {
        console.error("Error adding contract:", response.data.message);
      }
    } catch (error) {
      console.error("Error adding contract:", error);
    }
  };
  // Handle form submission for adding or updating user
  const handleSubmit = async (event) => {
    event.preventDefault();

    // تحقق من أن جميع الحقول ليست فارغة
    if (!inputs.name || !inputs.email || !inputs.phone) {
      Swal.fire("Error", "All fields are required.", "error");
      return;
    }

    // إذا كانت كلمة المرور فارغة، قم بحذفها من البيانات المرسلة
    const requestData = { ...inputs };
    if (!inputs.password) {
      delete requestData.password; // لا تضمن كلمة المرور إذا كانت فارغة
    }

    // التأكد من إرسال id عند التعديل
    if (editUser) {
      requestData.id = editUser.id;
    }

    try {
      if (editUser) {
        // تحديث المستخدم
        const response = await axios.post(
          `http://localhost/backend/update_user.php`,
          requestData,
          { headers: { "Content-Type": "application/json" } }
        );

        if (response.data.error) {
          Swal.fire("Error", response.data.error, "error");
        } else {
          // تحديث واجهة المستخدم بعد التعديل
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user.id === editUser.id ? { ...user, ...inputs } : user
            )
          );
          Swal.fire("Success", "User updated successfully!", "success");
        }

        setEditUser(null);
      } else {
        // إضافة مستخدم جديد
        const response = await axios.post(
          "http://localhost/backend/add_user.php",
          requestData,
          { headers: { "Content-Type": "application/json" } }
        );

        if (response.data.error) {
          Swal.fire("Error", response.data.error, "error");
        } else {
          setUsers((prevUsers) => [
            ...prevUsers,
            { ...inputs, id: response.data.id },
          ]);
          Swal.fire("Success", "User added successfully!", "success");
        }
      }
      getdata();
      setInputs({});
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving user:", error);
      Swal.fire("Error", "There was an error saving the user.", "error");
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  // Handle input changes
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  // Edit user
  const handleEdit = (user) => {
    setEditUser(user);
    setInputs({
      name: user.name,
      email: user.email,
      phone: user.phone,
      password: user.password,
    });
    setIsModalOpen(true);
  };

  // Delete user
  const handleDelete = async (userId) => {
    if (userId === undefined) {
      Swal.fire("Error!", "Invalid user ID.", "error");
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            `http://localhost/backend/delete_user.php?id=${userId}`
          );
          if (response.data.error) {
            Swal.fire("Error", response.data.error, "error");
          } else {
            setUsers(users.filter((user) => user.id !== userId));
            Swal.fire("Deleted!", "The user has been deleted.", "success");
          }
        } catch (error) {
          console.error("Error deleting user:", error);
          Swal.fire("Error!", "There was an error deleting the user.", "error");
        }
      }
    });
  };

  return (
    <div className="Users">
      <div className="container-fluid p-2">
        <div className="col justify-content-start d-flex">
          {/* Modal for Adding Contract */}
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
                      New Contract
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setIsContractModalOpen(false)}
                    />
                  </div>
                  <div className="modal-body">
                    <form onSubmit={handleAddContract}>
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="contract-user-id"
                          name="user_id"
                          value={newContract.user_id}
                          onChange={handleInputChange}
                          required
                          hidden
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="contract-name"
                          className="col-form-label"
                        >
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
                        <label
                          htmlFor="contract-file"
                          className="col-form-label"
                        >
                          Contract File:
                        </label>
                        <input
                          type="file"
                          className="form-control"
                          id="contract-file"
                          name="contract_file"
                          onChange={handleFileChange}
                          required
                        />
                      </div>
                      <button className="btn btn-primary" type="submit">
                        Add Contract
                      </button>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setIsContractModalOpen(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setIsModalOpen(true)}
            >
              Add User
            </button>

            {/* Modal */}
            {isModalOpen && (
              <div
                className="modal fade show"
                style={{ display: "block" }}
                aria-labelledby="exampleModalLabel"
                aria-hidden="false"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        {editUser ? "Edit User" : "New User"}
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() => setIsModalOpen(false)}
                      />
                    </div>
                    <div className="modal-body">
                      <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                          <label
                            htmlFor="recipient-name"
                            className="col-form-label"
                          >
                            Name:
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="recipient-name"
                            name="name"
                            value={inputs.name || ""}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="recipient-name"
                            className="col-form-label"
                          >
                            Email:
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="recipient-name"
                            name="email"
                            value={inputs.email || ""}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="recipient-name"
                            className="col-form-label"
                          >
                            Password:
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            id="recipient-name"
                            name="password"
                            value={inputs.password || ""}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="recipient-name"
                            className="col-form-label"
                          >
                            Phone:
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="recipient-name"
                            name="phone"
                            value={inputs.phone || ""}
                            onChange={handleChange}
                          />
                        </div>
                        <button className="btn btn-primary" type="submit">
                          {editUser ? "Update" : "Add"}
                        </button>
                      </form>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setIsModalOpen(false)}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <table className="table table-bordered text-center">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <th scope="row">{index + 1}</th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <div className="d-flex justify-content-center">
                  <button
                    className="btn btn-secondary me-2"
                    onClick={() => handleEdit(user)}
                    title="Edit User" // نص التوضيح عند التمرير على الأيقونة
                  >
                    <i className="fa fa-edit"></i> {/* أيقونة التعديل */}
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(user.id)}
                    title="Delete User" // نص التوضيح عند التمرير على الأيقونة
                  >
                    <i className="fa fa-trash"></i> {/* أيقونة الحذف */}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    title="Add Contract"
                    onClick={() => {
                      setIsContractModalOpen(true);
                      setNewContract({ ...newContract, user_id: user.id }); // تعيين user_id للعقد الجديد
                    }}

                    // className="btn btn-warning ms-2"
                    // onClick={() => setOpenDialog({ open: true, userId: user.id })}
                    // title="Add Task" // نص التوضيح عند التمرير على الأيقونة
                  >
                    <i className="fa fa-edit"></i>
                  </button>
                  <button
                    type="button"
                    // className="btn btn-secondary"
                    // title="Add Contract"
                    // onClick={() => {
                    //   setIsContractModalOpen(true);
                    //   setNewContract({ ...newContract, user_id: user.id }); // تعيين user_id للعقد الجديد
                    // }}

                    className="btn btn-warning ms-2"
                    onClick={() =>
                      setOpenDialog({ open: true, userId: user.id })
                    }
                    title="Add Task" // نص التوضيح عند التمرير على الأيقونة
                  >
                    <i className="fa fa-edit"></i>
                  </button>

                  <NewTask
                    open={openDialog.open}
                    onClose={() => setOpenDialog({ open: false, userId: null })}
                    userId={openDialog.userId}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
