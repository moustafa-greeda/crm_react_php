import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import style from "../Register/Register.module.css";
import img from "../../images/image 1.png";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  let navigate = useNavigate();

  // Validation schema for form fields
  const validateSchema = Yup.object({
    name: Yup.string()
      .min(5, "Name must be at least 5 characters")
      .required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password should be at least 8 characters long"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match") // Ensure passwords match
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "", // Add confirmPassword to the initial values
      role: "user"
    },
    validationSchema: validateSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch(
          "http://localhost/backend/login/register.php",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values)
          }
        );

        const data = await response.json();
        if (data.success) {
          navigate("/"); // Navigate to the home page after successful registration
        } else {
          alert(data.message); // Show any error message returned by the server
        }
      } catch (error) {
        console.error("Error during registration:", error);
        alert("An error occurred during registration.");
      }
    }
  });

  return (
    <section
      className={`${style.background} d-flex align-items-center justify-content-center`}
    >
      <img src={img} alt="" className={`${style.logo} d-flex float-end`} />
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-6">
            <div className={`p-4 ${style.box}`}>
              <h1 className="text-center fw-bold">Register</h1>
              <p className="text-center">
                Sign up now to keep track of your work.
              </p>
              <form className="mx-1 mx-md-4" onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Your Name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.name && formik.touched.name && (
                    <p className={`${style.error}`}>{formik.errors.name}</p>
                  )}
                </div>

                <div className="mb-3">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Your Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.email && formik.touched.email && (
                    <p className={`${style.error}`}>{formik.errors.email}</p>
                  )}
                </div>

                <div className="mb-3">
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.password && formik.touched.password && (
                    <p className={`${style.error}`}>{formik.errors.password}</p>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div className="mb-3">
                  <input
                    type="password"
                    name="confirmPassword"
                    className="form-control"
                    placeholder="Confirm Password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.confirmPassword &&
                    formik.touched.confirmPassword && (
                      <p className={`${style.error}`}>
                        {formik.errors.confirmPassword}
                      </p>
                    )}
                </div>

                <input type="hidden" name="role" value="user" readOnly />

                <button
                  type="submit"
                  disabled={!(formik.dirty && formik.isValid)}
                  className="btn btn-success btn-block w-100 mt-3 mb-3"
                >
                  Sign Up!
                </button>

                <p className="text-center fw-bold text-muted mt-2 mb-0">
                  Already have an account?{" "}
                  <Link to="/login" className="fw-bold text-dark">
                    <u>Login here</u>
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
