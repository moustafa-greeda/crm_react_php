import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import style from "../Login/Login.module.css";
import img from "../../images/image 1.png";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Email is required.", { position: "top-right", autoClose: 2000 });
      return;
    }

    try {
      console.log("Sending email:", email); // Debugging log
      const response = await axios.post(
        "http://localhost/backend/login/forgot_password.php",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message, { position: "top-right", autoClose: 2000 });
      } else {
        toast.error(response.data.message, { position: "top-right", autoClose: 2000 });
      }
    } catch (error) {
      console.error("Error in submission:", error);
      toast.error("Something went wrong! Please try again.", { position: "top-right", autoClose: 2000 });
    }
  };

  return (
    <section className={`${style.background} d-flex align-items-center justify-content-center`}>
      <img src={img} alt="App Logo" className={`${style.logo} d-flex`} />
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-6">
            <div className={`p-4 ${style.box}`}>
              <h2 className="text-center fw-bold">Forgot Password</h2>
              <p className="text-center">Enter your registered email address:</p>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-success btn-block w-100 mb-3 mt-3">
                  Send Reset Link
                </button>
              </form>
              <p className="text-center fw-bold text-muted mt-2 mb-0">
                <Link to="/" className="fw-bold text-dark">
                  Go back to Login Page
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
