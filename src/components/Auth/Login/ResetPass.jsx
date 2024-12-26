import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import style from "../Login/Login.module.css";
import img from "../../images/image 1.png";
import { toast } from "react-toastify";


const ResetPassword = () => {
    const { token } = useParams(); // Get the token from URL
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [isTokenValid, setIsTokenValid] = useState(false); // State to store token validity
    const [isLoading, setIsLoading] = useState(true); // Loading state to wait for token validation

    useEffect(() => {
        // Validate the token
        axios
            .get(`http://localhost/backend/login/reset-password.php?token=${token}`)
            .then((response) => {
                if (response.data.success) {
                    setIsTokenValid(true); // Token is valid
                    setMessage(response.data.message);
                    
                } else {
                    setIsTokenValid(false); // Token is invalid
                    setMessage(response.data.message);
                }
            })
            .catch((error) => {
                console.error("Error fetching token validation", error);
                setIsTokenValid(false); // Set token as invalid on error
                setMessage("An error occurred while validating the token");
            })
            .finally(() => {
                setIsLoading(false); // Set loading to false after validation
            });
    }, [token]);

    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .required('Password is required')
                .min(8, 'Password should be at least 8 characters long'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Confirm password is required'),
        }),
        onSubmit: (values) => {
            const requestData = {
                token: token,
                password: values.password,
            };

            // Handle password reset request
            axios
                .post('http://localhost/backend/login/reset-password.php', requestData, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                .then((response) => {
                    if (response.data.success) {
                        setMessage('Password reset successfully!');
                        setError('');
                        toast.success('Password reset successfully!', { position: "top-right", autoClose: 2000 });
                    } else {
                        setError(response.data.message);
                        setMessage('');
                        toast.error('Failed to reset password!', { position: "top-right", autoClose: 2000 });
                    }
                })
                .catch((err) => {
                    setError('An error occurred: ' + err.message);
                    setMessage('');
                });
        },
    });

    if (isLoading) {
        return (
            <section className={`${style.background} d-flex align-items-center justify-content-center`}>
                <img src={img} alt="Logo" className={`${style.logo}`} />
                <div className="container">
                    <h2>Validating token...</h2>
                </div>
            </section>
        );
    }
    return (
        <section className={`${style.background} d-flex align-items-center justify-content-center`}>
            <img src={img} alt="Logo" className={`${style.logo} d-flex`} />
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-6">

                        {isTokenValid ? (
                            <div className={`p-4 ${style.box}`}>
                                <h1 className="text-center fw-bold">Reset Password</h1>
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="mb-3">
                                        <input
                                            type="password"
                                            name="password"
                                            placeholder="New Password"
                                            className="form-control"
                                            value={formik.values.password}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.errors.password && formik.touched.password ? (
                                            <p className={`${style.error}`}>{formik.errors.password}</p>
                                        ) : null}
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            placeholder="Confirm Password"
                                            className="form-control"
                                            value={formik.values.confirmPassword}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
                                            <p className={`${style.error}`}>{formik.errors.confirmPassword}</p>
                                        ) : null}
                                    </div>
                                    <button type="submit" className="btn btn-success w-100">
                                        Reset Password
                                    </button>
                                </form>

                                {message && <p className="text-success mt-3">{message}</p>}
                                {error && <p className="text-danger mt-3">{error}</p>}
                                <p className="fw-bold text-muted my-0">
                                    <Link to="/" className="fw-bold text-dark">
                                        Go back to Login Page
                                    </Link>
                                </p>
                            </div>
                        ) : (
                            <div className={`p-4 ${style.box}`}>
                                <h1 className="text-center text-danger">Invalid Token</h1>
                                <div className='text-center my-2'>
                                    {message && <p className="text-danger m-0">{message}</p>}
                                    <a href="/forgot-password" className="btn btn-danger text-center mt-3">
                                        Request a New Token
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ResetPassword;
