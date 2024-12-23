import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom"; // Import useLocation for dynamic active links
import "./Header.css";
import logo from "./Assets/mainlogo.png";
import { FaList, FaBars, FaTimes } from "react-icons/fa";
import BidsPopup from "./BidsPopUp";
import WishlistPopup from "./WishlistPopUp";
import products from "../Data/ProductData";

const Header = () => {
  const [visitorCount, setVisitorCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [popupType, setPopupType] = useState(null);
  const [popupData, setPopupData] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [showForm, setShowForm] = useState(true);

  const [WelcomeFormData, setWelcomeFormData] = useState({
    title: "Welcome to the BidSpirit!",
    label: "Enter Your First Name:",
    placeholder: "John",
    buttonText: "Submit",
  });

  const location = useLocation(); // Get the current location

  useEffect(() => {
    const storedVisitorCount = sessionStorage.getItem("visitorCount");
    if (storedVisitorCount) {
      setVisitorCount(parseInt(storedVisitorCount, 10));
    } else {
      setVisitorCount(0);
    }
    sessionStorage.setItem("visitorCount", visitorCount);

    // Reset visited links when session ends
    sessionStorage.removeItem("visitedLinks");

  }, [visitorCount]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (firstName.trim()) {
      sessionStorage.setItem("firstName", firstName);
      const newVisitorCount = visitorCount + 1;
      sessionStorage.setItem("visitorCount", newVisitorCount);
      setVisitorCount(newVisitorCount);

      setWelcomeFormData({
        title: `Welcome, ${firstName}!`,
        label: `Hello, ${firstName}! Ready to explore?`,
        placeholder: `${firstName}`,
        buttonText: "Explore Now",
      });

      setShowForm(false);
    } else {
      alert("Please enter a valid first name.");
    }
  };

  const handleHamburgerClick = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handlePopup = (type) => {
    setPopupType(type);
    fetchPopupData(type);
  };

  const closePopup = () => {
    setPopupType(null);
    setPopupData([]);
  };

  const fetchPopupData = (type) => {
    const data =
      type === "bids"
        ? products.filter((product) => product.isBid)
        : products.filter((product) => product.isWishlist);

    setPopupData(data);
  };

  const isFormFilled = firstName.trim() !== ""; // Check if the form is filled

  return (
    <header className={`header ${isFormFilled ? "" : "inactive"}`}>
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Logo" className="logo-img" />
        </Link>
        <span className="visitor-counter">{visitorCount} Visited</span>
      </div>

      <div className="hamburger" onClick={handleHamburgerClick}>
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {!showForm && (
        <nav className={`nav-links ${isMobileMenuOpen ? "active" : ""}`}>
          <ul>
            <li>
              <Link
                to="/categories"
                className={location.pathname === "/categories" ? "active-link" : ""}
              >
                Categories
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={location.pathname === "/about" ? "active-link" : ""}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={location.pathname === "/contact" ? "active-link" : ""}
              >
                Contact
              </Link>
            </li>
            {isMobileMenuOpen && (
              <>
                <li className="blacko" onClick={() => handlePopup("bids")}>
                  My Bids
                </li>
                <li className="blacko" onClick={() => handlePopup("wishlist")}>
                  My Wishlist
                </li>
              </>
            )}
          </ul>
        </nav>
      )}

      <div className="profile-section">
        <div
          className="dropdown"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <FaList className="dropdown-icon" />
          {showDropdown && (
            <div className="dropdown-menu">
              <ul>
                <li onClick={() => handlePopup("bids")}>My Bids</li>
                <li onClick={() => handlePopup("wishlist")}>My Wishlist</li>
              </ul>
            </div>
          )}
        </div>
        {firstName && <div className="profile-name">Hello, {firstName}!</div>}
      </div>

      {showForm && (
        <div className="welcome-form">
          <form onSubmit={handleFormSubmit}>
            <h3>{WelcomeFormData.title}</h3>
            <label htmlFor="firstName">{WelcomeFormData.label}</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder={WelcomeFormData.placeholder}
              required
            />
            <button type="submit">{WelcomeFormData.buttonText}</button>
          </form>
        </div>
      )}

      {popupType === "bids" && (
        <BidsPopup items={popupData} onClose={closePopup} />
      )}
      {popupType === "wishlist" && (
        <WishlistPopup items={popupData} onClose={closePopup} />
      )}
    </header>
  );
};

export default Header;
