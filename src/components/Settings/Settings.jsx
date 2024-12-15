// import React, { useState , useEffect } from 'react'
// import style from '../Settings/Settings.module.css'
// export default function Settings() {


//     return (
//         <>  
//             <div className="container-fluid">
//                 <div className="row justify-content-center">
//                     <div className="col-12 col-md-10 col-lg-12">
//                     <h5 className='text-dark fw-bold fs-3 ps-2'>Account Settings</h5>
//                         <div className="card bg-white text-white pb-5">
//                             <div className="mb-3 ms-3 me-3 mt-4">
//                                 <h4 className="p-2 fw-bold text-dark">My Profile</h4>
//                                 <div className="card p-3 d-flex flex-column flex-md-row align-items-center">

//                                     <div className="me-md-3 mb-3 mb-md-0">
//                                         <img
//                                             src="/avatar.png"
//                                             alt="picture"
//                                             className="img-fluid rounded-circle"
//                                             style={{ width: "100px", height: "100px", objectFit: "cover" }}
//                                         />
//                                     </div>

//                                     <div className="text-center text-md-start">
//                                         <h5 className="card-title">Name</h5>
//                                         <p className="card-text">Web Developer</p>
//                                         <p className="card-text">
//                                             <small className="text-muted">name@gmail.com</small>
//                                         </p>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="card ms-3 me-3 mt-3">
//                                 <div className="d-flex justify-content-between align-items-center flex-wrap">
//                                     <h4 className="p-3 fw-bold">Personal Information</h4>
//                                     <button className="m-3 btn btn-outline-success">
//                                         <i className="bi bi-pen pe-1"></i>Edit
//                                     </button>
//                                 </div>
//                                 <div className="card-body">
//                                     <form>
//                                         <div className="row mb-3">
//                                             <div className="col-md-6">
//                                                 <label htmlFor="firstName" className="form-label text-muted text-muted">First Name</label>
//                                                 <input type="text" className={`form-control ${style.inputts}`} id="firstName" />
//                                             </div>
//                                             <div className="col-md-6">
//                                                 <label htmlFor="lastName" className="form-label text-muted">Last Name</label>
//                                                 <input type="text" className={`form-control ${style.inputts}`} id="lastName" />
//                                             </div>
//                                         </div>
//                                         <div className="row mb-3">
//                                             <div className="col-md-6">
//                                                 <label htmlFor="phoneNumber" className="form-label text-muted">Phone Number</label>
//                                                 <input type="tel" className={`form-control ${style.inputts}`} id="phoneNumber" />
//                                             </div>
//                                             <div className="col-md-6">
//                                                 <label htmlFor="emailAddress" className="form-label text-muted">Email Address</label>
//                                                 <input type="email" className={`form-control ${style.inputts}`} id="emailAddress" />
//                                             </div>
//                                         </div>
//                                         <div className="row mb-3">
//                                             <div className="col-md-6">
//                                                 <label htmlFor="role" className="form-label text-muted">Role</label>
//                                                 <input type="text" className={`form-control ${style.inputts}`} id="role" />
//                                             </div>
//                                             <div className="col-md-6">
//                                                 <label htmlFor="department" className="form-label text-muted">Department</label>
//                                                 <input type="text" className={`form-control ${style.inputts}`} id="department" />
//                                             </div>
//                                         </div>
//                                         <button type="submit" className="btn text-dark float-end ps-5 pe-5" style={{ "backgroundColor": "var(  --main-color)", "borderRadius": "25px" }}>Save</button>
//                                     </form>
//                                 </div>
//                             </div>

//                         </div>
//                     </div>
//                 </div>
//             </div>


//         </>
//     )
// }
import React, { useState, useEffect } from 'react';
import style from '../Settings/Settings.module.css';

export default function Settings() {
    const [userData, setUserData] = useState({
        id: '',
        name: '',
        lastName: '',
        phone: '',
        email: '',
        role: '',
        department: '',
    });
    const [isEditable, setIsEditable] = useState(false); // Controls whether fields are editable
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    // Fetch the logged-in user's data when the component mounts
    useEffect(() => {
        const userId = localStorage.getItem('userId'); // Get user ID from localStorage or session
        if (userId) {
            fetch(`http://localhost/backend/fetch_user.php?id=${userId}`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.error) throw new Error(data.error);
                    setUserData(data); // Populate state with user data
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

    // Handle form field changes
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setUserData({ ...userData, [id]: value });
    };

    // Enable editing when the Edit button is clicked
    const handleEditClick = () => {
        setIsEditable(true);
    };

    // Handle saving the updated data
    const handleSaveClick = (e) => {
        e.preventDefault();

        fetch('http://localhost/backend/update_user.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData), // Send updated user data to the backend
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.error) throw new Error(data.error);
                alert('Profile updated successfully!');
                setIsEditable(false); // Disable editing after save
            })
            .catch((err) => alert(err.message));
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-danger">{error}</p>;

    return (
        <>
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
                                        <p className="card-text">{userData.role}</p>
                                        <p className="card-text">
                                            <small className="text-muted">{userData.email}</small>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Personal Information Section */}
                            <div className="card ms-3 me-3 mt-3">
                                <div className="d-flex justify-content-between align-items-center flex-wrap">
                                    <h4 className="p-3 fw-bold">Personal Information</h4>
                                    {!isEditable && (
                                        <button className="m-3 btn btn-outline-success" onClick={handleEditClick}>
                                            <i className="bi bi-pen pe-1"></i>Edit
                                        </button>
                                    )}
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleSaveClick}>
                                        <div className="row mb-3">
                                            <div className="col-md-6">
                                                <label htmlFor="name" className="form-label text-muted">Name</label>
                                                <input
                                                    type="text"
                                                    className={`form-control ${style.inputts}`}
                                                    id="name"
                                                    value={userData.name}
                                                    onChange={handleInputChange}
                                                    disabled={!isEditable}
                                                />
                                            </div>

                                            <div className="col-md-6">
                                                <label htmlFor="phone" className="form-label text-muted">Phone Number</label>
                                                <input
                                                    type="tel"
                                                    className={`form-control ${style.inputts}`}
                                                    id="phone"
                                                    value={userData.phone}
                                                    onChange={handleInputChange}
                                                    disabled={!isEditable}
                                                />
                                            </div>

                                        </div>
                                        <div className="row mb-3">

                                            <div className="col-md-6">
                                                <label htmlFor="email" className="form-label text-muted">Email Address</label>
                                                <input
                                                    type="email"
                                                    className={`form-control ${style.inputts}`}
                                                    id="email"
                                                    value={userData.email}
                                                    onChange={handleInputChange}
                                                    disabled={!isEditable}
                                                />
                                            </div>

                                            <div className="col-md-6">
                                                <label htmlFor="role" className="form-label text-muted">Role</label>
                                                <input
                                                    type="text"
                                                    className={`form-control ${style.inputts}`}
                                                    id="role"
                                                    value={userData.role}
                                                    onChange={handleInputChange}
                                                    disabled={!isEditable}
                                                />
                                            </div>
                                        </div>

                                        {isEditable && (
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
        </>
    );
}
