import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [inputs, setInputs] = useState({});

  function getUsers() {
    axios
      .get("http://localhost/chatapi/fetch_users.php")
      .then(function (response) {
        console.log(response.data);
        setUsers(response.data);
      });
  }

  useEffect(() => {
    getUsers();
  }, []);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("http://localhost/chatapi/add_user.php", inputs);
    console.log(inputs);
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
                          onChange={handleChange}
                        />
                      </div>
                      <button className="btn btn-primary">
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
      <table className="table table-bordered ">
        <thead className="">
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
            <tr>
              <th scope="row">{index}</th>
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
                      <a className="dropdown-item" href="#">
                        Edit
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Delete
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Add Project
                      </a>
                    </li>

                    <li>
                      <a className="dropdown-item" href="#">
                        Add Contarct
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
