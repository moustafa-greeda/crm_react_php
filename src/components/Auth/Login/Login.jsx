
import React, { useState } from 'react';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import style from '../Login/Login.module.css'
import img from '../../images/image 1.png'
import { Link, useNavigate } from 'react-router-dom';
export default function Login() {
  let navigate = useNavigate();
  let validateSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .required("password is required")
      .min(3, "Password is too short - should be 8 chars or numbers minimum.")
  });
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: ""
    },
    validationSchema: validateSchema,

    onSubmit: async function Signin(values) {
      try {
        console.log(values); // Debugging the values being sent
        const response = await fetch(
          "http://localhost/backend/login/login.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(values),
            mode: "cors" // Explicitly enable CORS
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // if (data.success) {
        //   console.log("Login successful:", data.message);
        //   navigate("/dashboard");
        // } else {
        //   console.log("Login failed:", data.message);
        // }
        if (data.success) {
          if (data.role === "admin") {
            navigate("/dashboard");
            console.log(data.role);
          } else {
            navigate("/user-dashboard");
            console.log(data.role);          }
        }
      } catch (error) {
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











