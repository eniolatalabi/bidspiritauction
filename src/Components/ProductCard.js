import React, { useState, useEffect } from "react";
import { FaClock, FaHeart, FaTag } from "react-icons/fa";
import { useWishlist, useBids } from "../WishlistAndBidsContext"
import "./ProductCard.css";

const ProductCard = ({ product, onClick }) => {
  const { addToWishlist, removeFromWishlist, wishlistItems = [] } = useWishlist(); // Default to empty array if undefined
  const { placeBid } = useBids();

  // Check if the product is in the wishlist based on the wishlistItems array
  const isInWishlist = wishlistItems.some(item => item.id === product.id);
  const [isWishlist, setIsWishlist] = useState(isInWishlist); // Track wishlist status
  const [wishlistMessage, setWishlistMessage] = useState("");

  const toggleWishlist = () => {
    setIsWishlist(!isWishlist);
    setWishlistMessage(!isWishlist ? "Added to Wishlist" : "Removed from Wishlist");

    // Call the addToWishlist or removeFromWishlist from context
    if (!isWishlist) {
      addToWishlist(product); // Add to wishlist
    } else {
      removeFromWishlist(product.id); // Remove from wishlist
    }

    setTimeout(() => {
      setWishlistMessage("");
    }, 2000);
  };

  const handleBid = () => {
    // Assuming you are submitting a fixed amount for now
    placeBid(product.id, 100);  // Submit a bid of 100 (can be dynamic)
  };

  const renderButton = () => {
    return (
      <button className="black-button" onClick={handleBid}>
        {product.status === "Live"
          ? "Join Bid"
          : product.status === "Upcoming"
          ? "Details"
          : "Make Bid"}
      </button>
    );
  };

  const renderBadge = () => {
    if (product.status === "Live") {
      return (
        <div className="live-badge">
          <div className="live-circle"></div> Live
        </div>
      );
    } else if (product.status === "Upcoming") {
      return (
        <div className="upcoming-badge">
          <div className="badge-circle"></div> Upcoming
        </div>
      );
    } else if (product.status === "Sponsored") {
      return (
        <div className="sponsored-badge">
          <div className="badge-circle"></div> Sponsored
        </div>
      );
    }
    return null;
  };

  return (
    <div className="product-card" onClick={() => onClick(product)}>
      {/* Upper Section */}
      <div className="upper-section">
        {/* Wishlist Icon */}
        <div className="wishlist-container" onClick={(e) => {
          e.stopPropagation(); // Prevent triggering the modal when toggling wishlist
          toggleWishlist();
        }}>
          <FaHeart className={`wishlist-icon ${isWishlist ? "filled-heart" : "empty-heart"}`} />
          {wishlistMessage && <div className="wishlist-message">{wishlistMessage}</div>}
        </div>

        {/* Status Badge */}
        {renderBadge()}

        {/* Image with Hover Description */}
        <div className="image-container">
          <img className="product-image" src={product.image} alt={product.name} />
          <div className="hover-description">
            <p>{product.description}</p>
          </div>
        </div>
      </div>

      {/* Lower Section */}
      <div className="lower-section">
        {/* Label and Timing */}
        <div className="label-timing-section">
          <div className="label">
            <FaTag className="icon" /> <span>{product.category}</span>
          </div>
          <div className="timing">
            <FaClock className="icon" />
            {product.status === "Upcoming"
              ? product.startDate || "N/A"
              : product.timeLeft || "N/A"}
          </div>
        </div>
        {/* Product Name */}
        <div className="product-details">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-price">
            {product.status === "Upcoming"
              ? `Base Bid: ${product.baseBid}`
              : `Current Bid: ${product.currentBid || product.baseBid}`}
          </p>
          {/* Footer Button */}
          <div className="card-footer">{renderButton()}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;