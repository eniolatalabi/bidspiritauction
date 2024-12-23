import React, { useState, useEffect } from "react";
import "./Footer.css";

const Footer = () => {
  const [dateTime, setDateTime] = useState("");
  const [location, setLocation] = useState("your location");
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", scheduleTime: "" });
  const [formErrors, setFormErrors] = useState({ name: "", phone: "", scheduleTime: "" });
  const [formSuccess, setFormSuccess] = useState("");

  // Update date and time dynamically
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const formattedDate = now.toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const formattedTime = now.toLocaleTimeString();
      setDateTime(`${formattedDate} | ${formattedTime}`);
    };
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch user's location using Geolocation API and Nominatim reverse geocoding
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          console.log("Latitude:", latitude, "Longitude:", longitude); // Debugging log

          try {
            // Use Nominatim for reverse geocoding
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );

            const data = await response.json();
            console.log("Geolocation Data:", data); // Debugging log

            if (data && data.address) {
              const { city, town, state, country } = data.address;
              setLocation(`${city || town || state}, ${country}`);
            } else {
              setLocation("Location unavailable");
            }
          } catch (error) {
            console.error("Error fetching location:", error);
            setLocation("Unable to determine location");
          }
        },
        () => {
          console.error("Geolocation permission denied.");
          setLocation("Location permission denied");
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setLocation("Geolocation not supported");
    }
  }, []);

  // Handle form visibility
  const toggleFormVisibility = () => {
    setFormVisible(!formVisible);
    setFormSuccess("");
    setFormErrors({ name: "", phone: "", scheduleTime: "" });
  };

  // Handle form field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Form validation
  const validateForm = () => {
    let errors = { name: "", phone: "", scheduleTime: "" };
    let valid = true;

    if (!formData.name) {
      errors.name = "Name is required.";
      valid = false;
    }

    if (!formData.phone) {
      errors.phone = "Phone number is required.";
      valid = false;
    }

    if (!formData.scheduleTime) {
      errors.scheduleTime = "Please choose a time to schedule the call.";
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setFormSuccess("Your request has been submitted successfully!");
      setFormData({ name: "", phone: "", scheduleTime: "" });
    }
  };

  return (
    <footer className="footer-container">
      <div className="footer-row">
        {/* Brand Section */}
        <div className="footer-brand">
          <h2>BidSpirit</h2>
          <p>
            Unlock the full potential of <br /> your auctions. Get listed, <br /> reach global collectors,
            and <br /> maximize your profits in <br /> today's competitive market.
          </p>
          <button className="cta-button" onClick={toggleFormVisibility}>Get Listed</button>

          {/* Dropdown Form */}
          {formVisible && (
            <div className="form-overlay">
              <div className="form-container">
                <button className="close-btn" onClick={toggleFormVisibility}>X</button>
                <h3>Contact Us for Listing</h3>
                {formSuccess && <div className="success-message">{formSuccess}</div>}
                <form onSubmit={handleSubmit}>
                  <div className="form-field">
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    {formErrors.name && <div className="error-message">{formErrors.name}</div>}
                  </div>

                  <div className="form-field">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                    {formErrors.phone && <div className="error-message">{formErrors.phone}</div>}
                  </div>

                  <div className="form-field">
                    <label htmlFor="scheduleTime">Preferred Time for Call</label>
                    <input
                      type="datetime-local"
                      id="scheduleTime"
                      name="scheduleTime"
                      value={formData.scheduleTime}
                      onChange={handleChange}
                      required
                    />
                    {formErrors.scheduleTime && <div className="error-message">{formErrors.scheduleTime}</div>}
                  </div>

                  <button type="submit" className="submit-button">Submit</button>
                </form>
              </div>
            </div>
          )}
        </div>

        {/* Links */}
        <div className="footer-links">
          <div>
            <h4>Company</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Home</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h4>Support</h4>
            <ul>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">FAQs</a></li>
            </ul>
          </div>
          <div>
            <h4>Resources</h4>
            <ul>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Contact Section */}
        <div className="footer-contact">
          <h4>Contact</h4>
          <p>Capital Building, 332, Ikorodu Rd, Maryland, Lagos</p>
          <a href="https://maps.google.com/?q=Capital+Building,+332,+Ikorodu+Rd,+Maryland,+Lagos" className="map-link">View on Maps</a>
          <p>+23470123345678</p>
          <p>hello@BidSpirit.com</p>
          <div className="social-icons">
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="scrolling-ticker">
          <p>{dateTime} | Live from {location} | Join us now and unlock exclusive opportunities worldwide!</p>
        </div>
        <p>&copy; {new Date().getFullYear()} BidSpirit. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
