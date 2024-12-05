import React, { useState, useEffect } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [inputs, setInputs] = useState({});

  const getdata = async () => {
    const reqdata = await fetch("http://localhost/backend/fetch_users.php");
    const resdata = await reqdata.json();
    setUsers(resdata);
  };

  useEffect(() => {
    getdata();
  }, []);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInputs((values) => ({ ...values, [name]: value }));
  };
  const handleDelete = async (userId) => {
    try {
      const response = await axios.delete(
        `http://localhost/backend/delete_user.php?id=${userId}`
      );
      console.log("User deleted", response.data);

      // إزالة المستخدم المحذوف من الحالة (users)
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost/backend/add_user.php",
        inputs,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      console.log(response.data);

      // إضافة المستخدم الجديد إلى القائمة محليًا بدون الحاجة لإعادة تحميل البيانات من الخادم
      setUsers((prevUsers) => [
        ...prevUsers,
        { ...inputs, id: response.data.id } // افترض أن الاستجابة تحتوي على id للمستخدم
      ]);

      // مسح المدخلات بعد الإضافة
      setInputs({});
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div className="Users">
      <div className="container-fluid p-2">
        <div className="col justify-content-end d-flex">
          <div>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              data-bs-whatever="@getbootstrap"
            >
              Add User
            </button>
            <div
              className="modal fade"
              id="exampleModal"
              tabIndex={-1}
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      New User
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
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
                      <button
                        className="btn btn-primary"
                        data-bs-dismiss="modal"
                      >
                        Add
                      </button>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <table className="table table-bordered">
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
                <div className="btn-group">
                  <button
                    type="button"
                    className="btn btn-secondary dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Action
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="/#">
                        Edit
                      </a>
                    </li>
                    <li>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="btn dropdown-item"
                      >
                        Delete
                      </button>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item" href="/#">
                        Add Project
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/#">
                        Add Contract
                      </a>
                    </li>
                  </ul>
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
