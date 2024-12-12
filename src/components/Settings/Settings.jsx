import React from 'react'
import style from '../Settings/Settings.module.css'
export default function Settings() {
    return (
        <>  
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-10 col-lg-12">
                    <h5 className='text-dark fw-bold fs-3 ps-2'>Account Settings</h5>
                        <div class="card bg-white text-white pb-5">
                            <div className="mb-3 ms-3 me-3 mt-4">
                                <h4 className="p-2 fw-bold text-dark">My Profile</h4>
                                <div class="card p-3 d-flex flex-column flex-md-row align-items-center">

                                    <div class="me-md-3 mb-3 mb-md-0">
                                        <img
                                            // src="https://img.favpng.com/6/0/18/clip-art-circle-shape-image-openclipart-png-favpng-8LaDYwUtsjyxu3XtD5VVcYeRm.jpg"
                                            src="/avatar.png"
                                            alt="picture"
                                            class="img-fluid rounded-circle"
                                            style={{ width: "100px", height: "100px", objectFit: "cover" }}
                                        />
                                    </div>

                                    <div className="text-center text-md-start">
                                        <h5 class="card-title">Name</h5>
                                        <p class="card-text">Web Developer</p>
                                        <p class="card-text">
                                            <small class="text-muted">name@gmail.com</small>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="card ms-3 me-3 mt-3">
                                <div className="d-flex justify-content-between align-items-center flex-wrap">
                                    <h4 className="p-3 fw-bold">Personal Information</h4>
                                    <button className="m-3 btn btn-outline-success">
                                        <i class="bi bi-pen pe-1"></i>Edit
                                    </button>
                                </div>
                                <div className="card-body">
                                    <form>
                                        <div class="row mb-3">
                                            <div class="col-md-6">
                                                <label for="firstName" class="form-label text-muted text-muted">First Name</label>
                                                <input type="text" class={`form-control ${style.inputts}`} id="firstName" />
                                            </div>
                                            <div class="col-md-6">
                                                <label for="lastName" class="form-label text-muted">Last Name</label>
                                                <input type="text" class={`form-control ${style.inputts}`} id="lastName" />
                                            </div>
                                        </div>
                                        <div class="row mb-3">
                                            <div class="col-md-6">
                                                <label for="phoneNumber" class="form-label text-muted">Phone Number</label>
                                                <input type="tel" class={`form-control ${style.inputts}`} id="phoneNumber" />
                                            </div>
                                            <div class="col-md-6">
                                                <label for="emailAddress" class="form-label text-muted">Email Address</label>
                                                <input type="email" class={`form-control ${style.inputts}`} id="emailAddress" />
                                            </div>
                                        </div>
                                        <div class="row mb-3">
                                            <div class="col-md-6">
                                                <label for="role" class="form-label text-muted">Role</label>
                                                <input type="text" class={`form-control ${style.inputts}`} id="role" />
                                            </div>
                                            <div class="col-md-6">
                                                <label for="department" class="form-label text-muted">Department</label>
                                                <input type="text" class={`form-control ${style.inputts}`} id="department" />
                                            </div>
                                        </div>
                                        <button type="submit" class="btn text-dark float-end ps-5 pe-5" style={{ "backgroundColor": "var(  --main-color)", "borderRadius": "25px" }}>Save</button>
                                    </form>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}
