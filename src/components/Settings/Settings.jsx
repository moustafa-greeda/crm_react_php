import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import style from '../Settings/Settings.module.css';

export default function Settings() {
    const [userData, setUserData] = useState({
        id: '',
        name: '',
        phone: '',
        email: '',
    });
    const [isEditableInfo, setIsEditableInfo] = useState(false);
    const [isEditablePassword, setIsEditablePassword] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            fetch(`http://localhost/backend/fetch_user.php?id=${userId}`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.error) throw new Error(data.error);
                    setUserData(data);
                    setLoading(false);
                })
                .catch((err) => {
                    setError(err.message);
                    setLoading(false);
                });
        } else {
            setError('No user ID found. Please log in.');
            setLoading(false);
        }
    }, []);

    const infoFormik = useFormik({
        initialValues: {
            name: userData.name,
            phone: userData.phone,
            email: userData.email,
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            name: Yup.string().min(3, 'Name must be at least 3 characters long'),
            phone: Yup.string().matches(/^\d{10}$/, 'Phone number must be 10 digits'),
            email: Yup.string().email('Invalid email'),
        }),
        onSubmit: (values) => {
            const updatedData = {
                ...values,
                id: userData.id, // Include the user ID here
                password: '', // Ensure password is sent as an empty string if not updating the password
            };
            fetch('http://localhost/backend/update_user.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData), // Send the full updated data including ID and empty password
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.error) throw new Error(data.error);
                    alert('Profile updated successfully!');
                    setIsEditableInfo(false);
                })
                .catch((err) => alert(err.message));
        },
    });

    const passwordFormik = useFormik({
        initialValues: {
            currentPassword: '',
            newPassword: '',
        },
        validationSchema: Yup.object({
            currentPassword: Yup.string().required('Current password is required'),
            newPassword: Yup.string().required('New password is required').min(8, 'Password should be at least 8 characters long'),
        }),
        onSubmit: (values) => {
            fetch('http://localhost/backend/change_password.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: userData.id, ...values }),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.error) throw new Error(data.error);
                    alert('Password changed successfully!');
                    setIsEditablePassword(false);
                    passwordFormik.resetForm();
                })
                .catch((err) => alert(err.message));
        },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-danger">{error}</p>;

    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-12 col-md-10 col-lg-12">
                    <h5 className="text-dark fw-bold fs-3 ps-2 mb-3">Account Settings</h5>
                    <div className="card bg-white text-white pb-5">
                        <div className="mb-3 ms-3 me-3 mt-4">
                            <h4 className="p-2 fw-bold text-dark">My Profile</h4>
                            <div className="card p-3 d-flex flex-column flex-md-row align-items-center">
                                <div className="me-md-3 mb-3 mb-md-0">
                                    <img
                                        src="/avatar.png"
                                        alt="User Profile"
                                        className="img-fluid rounded-circle"
                                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                    />
                                </div>
                                <div className="text-center text-md-start">
                                    <h5 className="card-title">{userData.name}</h5>
                                    <p className="card-text m-0">{userData.role}</p>
                                    <p className="card-text m-0">
                                        <small className="text-muted">{userData.email}</small>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Personal Information Section */}
                        <div className="card ms-3 me-3 mt-3">
                            <div className="d-flex justify-content-between align-items-center flex-wrap">
                                <h4 className="p-3 fw-bold">Personal Information</h4>
                                {!isEditableInfo && (
                                    <button className="m-3 btn btn-outline-success" onClick={() => setIsEditableInfo(true)}>
                                        <i className="bi bi-pen pe-1"></i>Edit
                                    </button>
                                )}
                            </div>
                            <div className="card-body">
                                <form onSubmit={infoFormik.handleSubmit}>
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <label htmlFor="name" className="form-label text-muted">Name</label>
                                            <input
                                                type="text"
                                                className={`form-control ${style.inputts}`}
                                                id="name"
                                                value={infoFormik.values.name}
                                                onChange={infoFormik.handleChange}
                                                onBlur={infoFormik.handleBlur}
                                                disabled={!isEditableInfo}
                                            />
                                            {infoFormik.errors.name && infoFormik.touched.name && (
                                                <p className="text-danger">{infoFormik.errors.name}</p>
                                            )}
                                        </div>

                                        <div className="col-md-6">
                                            <label htmlFor="phone" className="form-label text-muted">Phone Number</label>
                                            <input
                                                type="tel"
                                                className={`form-control ${style.inputts}`}
                                                id="phone"
                                                value={infoFormik.values.phone}
                                                onChange={infoFormik.handleChange}
                                                onBlur={infoFormik.handleBlur}
                                                disabled={!isEditableInfo}
                                            />
                                            {infoFormik.errors.phone && infoFormik.touched.phone && (
                                                <p className="text-danger">{infoFormik.errors.phone}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-12">
                                            <label htmlFor="email" className="form-label text-muted">Email Address</label>
                                            <input
                                                type="email"
                                                className={`form-control ${style.inputts}`}
                                                id="email"
                                                value={infoFormik.values.email}
                                                onChange={infoFormik.handleChange}
                                                onBlur={infoFormik.handleBlur}
                                                disabled={!isEditableInfo}
                                            />
                                            {infoFormik.errors.email && infoFormik.touched.email && (
                                                <p className="text-danger">{infoFormik.errors.email}</p>
                                            )}
                                        </div>
                                    </div>
                                    {isEditableInfo && (
                                        <button
                                            type="submit"
                                            className="btn text-dark float-end ps-5 pe-5"
                                            style={{ backgroundColor: 'var(--main-color)', borderRadius: '25px' }}
                                        >
                                            Save
                                        </button>
                                    )}
                                </form>
                            </div>
                        </div>

                        {/* Change Password Section */}
                        <div className="card ms-3 me-3 mt-3">
                            <div className="d-flex justify-content-between align-items-center flex-wrap">
                                <h4 className="p-3 mb-3 fw-bold">Change Password</h4>
                                {!isEditablePassword && (
                                    <button className="m-3 btn btn-outline-success" onClick={() => setIsEditablePassword(true)}>
                                        <i className="bi bi-pen pe-1"></i>Edit
                                    </button>
                                )}
                            </div>
                            <div className="card-body">
                                <form onSubmit={passwordFormik.handleSubmit}>
                                    <div className="row mb-3">
                                        <div className="col-md-12">
                                            <label htmlFor="currentPassword" className="form-label text-muted">Current Password</label>
                                            <div className="position-relative">
                                                <input
                                                    type={showCurrentPassword ? 'text' : 'password'}
                                                    className={`form-control ${style.inputts}`}
                                                    id="currentPassword"
                                                    value={passwordFormik.values.currentPassword}
                                                    onChange={passwordFormik.handleChange}
                                                    onBlur={passwordFormik.handleBlur}
                                                    disabled={!isEditablePassword}
                                                />
                                                <i
                                                    className={`bi ${showCurrentPassword ? 'bi-eye-slash' : 'bi-eye'} position-absolute`}
                                                    style={{ top: '50%', right: '10px', cursor: 'pointer', transform: 'translateY(-50%)' }}
                                                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                                ></i>

                                            </div>
                                            {passwordFormik.errors.currentPassword && passwordFormik.touched.currentPassword && (
                                                <p className="text-danger">{passwordFormik.errors.currentPassword}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-12">
                                            <label htmlFor="newPassword" className="form-label text-muted">New Password</label>
                                            <div className="position-relative">
                                                <input
                                                    type={showNewPassword ? 'text' : 'password'}
                                                    className={`form-control ${style.inputts}`}
                                                    id="newPassword"
                                                    value={passwordFormik.values.newPassword}
                                                    onChange={passwordFormik.handleChange}
                                                    onBlur={passwordFormik.handleBlur}
                                                    disabled={!isEditablePassword}
                                                />
                                                <i
                                                    className={`bi ${showNewPassword ? 'bi-eye-slash' : 'bi-eye'} position-absolute`}
                                                    style={{ top: '50%', right: '10px', cursor: 'pointer', transform: 'translateY(-50%)' }}
                                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                                ></i>

                                            </div>
                                            {passwordFormik.errors.newPassword && passwordFormik.touched.newPassword && (
                                                <p className="text-danger">{passwordFormik.errors.newPassword}</p>
                                            )}
                                        </div>
                                    </div>
                                    {isEditablePassword && (
                                        <button
                                            type="submit"
                                            className="btn text-dark float-end ps-5 pe-5"
                                            style={{ backgroundColor: 'var(--main-color)', borderRadius: '25px' }}
                                        >
                                            Save
                                        </button>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
