import React from "react";
import { useState, useEffect } from "react";
// import { useNavigate } from 'react-router-dom';
import { useNavigate } from "react-router";
import axios from 'axios';


const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [massage, setMassage] = useState("");
  const naviget = useNavigate();

  useEffect(() => {
    let login = localStorage.getItem("login");
    if(login){
        naviget("/dashboard");
    }
    let loginStatus = localStorage.getItem("loginStatus");
    if(loginStatus){
        setError(loginStatus);
        setTimeout(function(){
            localStorage.clear();
            window.location.reload();
        }, 3000);
    }
    setTimeout(function(){
        setMassage("");
    }, 3000);
}, [massage]);

const handleInputChange = (e, type) => {
    switch(type){
        case "user":
            setError("");
            setUser(e.target.value);
            if(e.target.value === ""){
                setError("Username has left blank");
            }
            break;
        case "pass":
            setError("");
            setPassword(e.target.value);
            if(e.target.value === ""){
                setError("Password has left blank");
            }
            break;
        default:
    }
}


const loginSubmit = async () => {
  if (user !== "" && password !== "") {
    var url = "http://localhost/backend/login/login.php";
    var data = {
      user: user,
      pass: password,
    };

    try {
      const response = await axios.post(url, data, {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        
      });
      const result = response.data;
      

      if (result[0].result === "Invalid username!" || result[0].result === "Invalid password!") {
        console.log(result[0].result);
        setError(result[0].result);
      } else {
        setMassage(result[0].result);
        setTimeout(function () {
          localStorage.setItem("login", true);
          localStorage.setItem("user", user);
          // localStorage.setItem("id", id);
          naviget("/dashboard");
        }, 3000);
      }
    } catch (err) {
      setError("Error: " + err.message);
      console.log(err);
    }
  } else {
    setError("All fields are required!");
  }
};

  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card bg-dark text-white"
              style={{ borderRadius: "1rem" }}
            >
              <div className="card-body p-5 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-white-50 mb-5">
                    Please enter your login and password!
                  </p>

                  <p className="text-white-50 mb-5">
                    {error !== "" ? (
                      <span style={{ color: "red" }}>{error}</span>
                    ) : (
                      <span style={{ color: "green" }}>{massage}</span>
                    )}
                  </p>
                  <div
                    data-mdb-input-init
                    className="form-outline form-white mb-4"
                  >
                    <input
                      type="email"
                      id="typeEmailX"
                      className="form-control form-control-lg "
                      placeholder="Email"
                      value={user}
                      onChange={(e) => handleInputChange(e, "user")}
                    />
                    <label className="form-label" htmlFor="typeEmailX"></label>
                  </div>
                  <div
                    data-mdb-input-init
                    className="form-outline form-white mb-4"
                  >
                    <input
                      type="password"
                      id="typePasswordX"
                      className="form-control form-control-lg  "
                      placeholder="Password"
                      value={password}
                      onChange={(e) => handleInputChange(e, "pass")}
                    />
                    <label
                      className="form-label"
                      htmlFor="typePasswordX"
                    ></label>
                  </div>

                  <button
                    data-mdb-button-init
                    data-mdb-ripple-init
                    className="btn btn-outline-light btn-lg px-5"
                    type="submit"
                    onClick={loginSubmit}
                  >
                    Login
                  </button>
                  <div className="d-flex justify-content-center text-center mt-4 pt-1">
                    <a href="#!" className="text-white">
                      <i className="fab fa-facebook-f fa-lg" />
                    </a>
                    <a href="#!" className="text-white">
                      <i className="fab fa-twitter fa-lg mx-4 px-2" />
                    </a>
                    <a href="#!" className="text-white">
                      <i className="fab fa-google fa-lg" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
