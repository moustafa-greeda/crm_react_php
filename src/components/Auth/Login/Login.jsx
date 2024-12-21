

import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import style from '../Login/Login.module.css';
import img from '../../images/image 1.png';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import axios from 'axios';
export default function Login() {
  let navigate = useNavigate();

  let validateSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .required("password is required")


      .min(3, "Password is too short - should be 8 chars or numbers minimum."),

  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validateSchema,
    onSubmit: async function Signin(values) {
      try {
        // Debugging the values being sent
        const response = await fetch(
          "http://localhost/backend/login/login.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
            mode: "cors", // Explicitly enable CORS
          }
        );
        const data = await response.json();
      console.log(data)
        if (!response.ok) {
           throw new Error(`HTTP error! status: ${response.status}`);
         
        }



       

      

        

        if (data.success) {
          // console.log("Login successful:", data.message);
          // // Store user ID in localStorage for later use
          // localStorage.setItem('userId', data.id); // Assuming `userId` is returned from the server
          const userId =data.id;
          const role=data.role;
          const token=data.token
          console.log(userId);
          localStorage.setItem('userId',userId);  
          localStorage.setItem('role',role); 
          // localStorage.setItem("isAdmin", data.role); 
          localStorage.setItem("activeUser", JSON.stringify(data.id));
          localStorage.setItem('token',token); 
           toast.success("You are logged In successfully!", {
                      position: "top-right",
                      autoClose: 2000,
                    });    
          if (data.role === "admin") {
            navigate("/dashboard");
            localStorage.setItem("userId", data.id); // Store userId in localStorage
            console.log("Admin User ID stored in localStorage:", data.id);
          } else {
            navigate("/user-dashboard");
            console.log(data.role);
          }
        } else {
          toast.error(`Login failed: ${data.message} `, {
            position: "top-right",
            autoClose: 2000,
          });
             console.log(
            "User ID from localStorage:",
            localStorage.getItem("userId")
          );

        if (data.success) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("userId", data.id);
          localStorage.setItem("isAdmin", data.role);

          // Check if data contains the userId
          if (data.role === "admin") {
            navigate("/dashboard");
            localStorage.setItem("userId", data.id); // Store userId in localStorage
          } else {
            navigate("/user-dashboard");
            localStorage.setItem("userId", data.id); // Store userId in localStorage
          }

          // Optionally, check if it's stored
        } else {
          console.log("Login failed:", data.message);

        }
      } 
     

     
   
    
    }
    catch (error) {
      console.error("Error during login:", error);
    }
    }

  });

  return (
    <>
      <section
        className={`${style.background} d-flex align-items-center justify-content-center`}
      >
        <img src={img} alt="" className={`${style.logo} d-flex `} />
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className=" col-md-6">
              <div className={`  p-4 ${style.box}`}>
                <h1 className="text-center fw-bold">Login</h1>
                <p className="text-center"> Enter Your email and password</p>
                <form
                  className={`mx-1 mx-md-4  `}
                  onSubmit={formik.handleSubmit}
                >
                  <div className="mb-3">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="form-control"
                      placeholder="Your Email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>

                  {formik.errors.email && formik.touched.email ? (
                    <p className={`${style.error}`}>{formik.errors.email}</p>
                  ) : (
                    ""
                  )}

                  <div className="mb-3">
                    <input
                      type="password"
                      id="Password"
                      name="password"
                      className="form-control"
                      placeholder="Password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>

                  {formik.errors.password && formik.touched.password ? (
                    <p className={`${style.error}`}>{formik.errors.password}</p>
                  ) : (
                    ""
                  )}

                  <button
                    type="submit"
                    disabled={!(formik.dirty && formik.isValid)}
                    class="btn btn-success btn-block w-100 mt-3 mb-3"
                  >
                    Sign Up!
                  </button>

                  <p className="text-center fw-bold  text-muted mt-2 mb-0">
                    Don't Have an account ?{" "}
                    <Link to="/register" className="fw-bold text-dark ">
                      <u>SignUp here</u>
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}