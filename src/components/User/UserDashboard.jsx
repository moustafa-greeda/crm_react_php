import React, { useState, useEffect } from "react";
import '../User/userDashboard.css'
const UserDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  // Dynamically retrieve userId (e.g., from localStorage)
  const userId = localStorage.getItem("userId"); // Assumes you store userId in localStorage after login

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userId) {
          throw new Error("User ID is not available. Please log in.");
        }

        const response = await fetch(
          `http://localhost/backend/fetch_user.php?id=${userId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();

        // Check if user role is 'user'
        if (data.role === "user") {
          setUserData(data);
        } else {
          setError("Access Denied: Only users with role 'user' can view this page.");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div>
      {error ? (
        <h2 style={{ color: "red" }}>{error}</h2>
      ) : userData ? (
        <>
          <h1 className="fs-3 mb-2">
            Welcome <span className="highlight">{userData.name.split(" ")[0]}!</span>
          </h1>
          <h2 className="mt-4 fw-bold">Personal Information</h2>
          <div className="personal-info-container mt-2">
            <div className="info-item">
              <i className="fa-solid fa-user icon"></i>
              <div>
                <h4>Name</h4>
                <p>{userData.name}</p>
              </div>
            </div>
            <div className="info-item">
              <i className="fa-solid fa-envelope icon"></i>
              <div>
                <h4>Email</h4>
                <p>{userData.email}</p>
              </div>
            </div>
            <div className="info-item">
              <i class="fa-solid fa-phone icon"></i>
              <div>
                <h4>Phone Number</h4>
                <p>+20{userData.phone}</p>
              </div>
            </div>
            <div className="info-item">
              <i className="fa-solid fa-globe icon"></i>
              <div>
                <h4>Website</h4>
                <p>www.website.com</p>
              </div>
            </div>
          </div>

          <div className="text-center ty my-5">
            <h3>Thank you for choosing ZBOOMA</h3>
            <p>Our company is a leading company in the field of networks, web and mobile applications with modern programming techniques</p>

          </div>

          {/* slider */}
          <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
              <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="3" aria-label="Slide 4"></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active" data-bs-interval="5000">
                <div className="carousel-image-overlay">
                  <img src="/pexels-3.jpg" className="d-block w-100" alt="..." />
                  <div className="carousel-caption d-flex flex-column justify-content-center align-items-center text-white">
                    <h5>Quality</h5>
                    <p>We aim to deliver high-quality products. Hence. we take care of everything at the granular level.</p>
                  </div>
                </div>
              </div>
              <div className="carousel-item" data-bs-interval="5000">
                <div className="carousel-image-overlay">
                  <img src="/pexels-2.jpg" className="d-block w-100" alt="..." />
                  <div className="carousel-caption d-flex flex-column justify-content-center align-items-center text-white">
                    <h5>Reliabilty</h5>
                    <p>Our teams are made up of highly-skilled and certified engineers with industry- specific domain knowledge</p>
                  </div>
                </div>
              </div>
              <div className="carousel-item" data-bs-interval="5000">
                <div className="carousel-image-overlay">
                  <img src="/pexels-1.jpg" className="d-block w-100" alt="..." />
                  <div className="carousel-caption d-flex flex-column justify-content-center align-items-center text-white">
                    <h5>Flexibilty</h5>
                    <p>Our team keeps the requirements of our clients on priority & the development process transparent</p>
                  </div>
                </div>
              </div>
              <div className="carousel-item" data-bs-interval="5000">
                <div className="carousel-image-overlay">
                  <img src="/pexels-5.jpg" className="d-block w-100" alt="..." />
                  <div className="carousel-caption d-flex flex-column justify-content-center align-items-center text-white">
                    <h5>Competence</h5>
                    <p>Our team consists of expert developers who have knowledge of domain expertise for all business industries.</p>
                  </div>
                </div>
              </div>

            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>



          <div className="contact">
            <div className="container">
              <div className="main-title text-center fs-2 py-4 mt-5">
                <h3 className="">NEED HELP? <span className="highlight">CONTACT US</span></h3>
              </div>
              <div>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3418.894316584808!2d31.389946075591908!3d31.02919397444256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzHCsDAxJzQ1LjEiTiAzMcKwMjMnMzMuMSJF!5e0!3m2!1sen!2seg!4v1734603888976!5m2!1sen!2seg"
                  width="100%"
                  height="350"
                  style={{ border: "0" }}
                  className="mb-4"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />

              </div>

              <div className="contact-info">
                <div className="row g-4">
                  <div className="col-md-6">
                    <div className="contact-item">
                      <div className="icon">
                        <i className="fa-regular fa-map"></i>
                      </div>

                      <div className="content">
                        <h3 className="fw-bold fs-5">Our Address</h3>
                        <p>Mansoura Qism 2, El Mansoura 1, Dakahlia Governorate</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="contact-item">
                      <div className="icon">
                        <i className="fa-regular fa-envelope"></i>
                      </div>

                      <div className="content">
                        <h3 className="fw-bold fs-5">Email Us</h3>
                        <a href="mailto:contact@example.com">zbooma@gmail.com</a>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="contact-item">
                    <div className="icon">
                      <i className="fa-solid fa-phone"></i>
                    </div>
                    <div className="content">
                      <h3 className="fw-bold fs-5">Call Us</h3>
                      <p>+201012345678</p>
                    </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                   <div className="contact-item">
                   <div className="icon">
                      <i className="fa-solid fa-share-nodes"></i>
                    </div>

                    <div className="content">
                      <h3 className="fw-bold fs-5">Opening Hours</h3>
                      <p>Sat-Thurs: 9AM - 5PM</p>
                      <p>Friday: Closed</p>
                    </div>
                   </div>

                  </div>
                </div>
              </div>

              <div className="website d-flex mt-4 gap-3 align-items-center justify-content-center">
                <p className="fs-5">Need more guidance?</p>
                <button className="btn btnn">
                  <a href="https://zbooma.com/" target="_blank">Visit Our Website</a>
                </button>
              </div>

            </div>
          </div>



        </>
      ) : (
        <p>Loading...</p>
      )
      }
    </div >
  );
};

export default UserDashboard;
