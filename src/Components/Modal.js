import React, { useState, useEffect, useRef } from "react";
import { useWishlist, useBids } from "../WishlistAndBidsContext"; 
import "./Modal.css";

const Modal = ({ product, isOpen, onClose }) => {
  const modalRef = useRef(null);

  // Calculate time remaining (optimized logic)
  const calculateTimeLeft = (timeString) => {
    const parts = timeString.split(":");
    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);
    const seconds = parseInt(parts[2], 10);
    
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    if (totalSeconds <= 0) {
      return { hours: 0, minutes: 0, seconds: 0, expired: true };
    }

    return {
      hours: Math.floor(totalSeconds / 3600),
      minutes: Math.floor((totalSeconds % 3600) / 60),
      seconds: totalSeconds % 60,
      expired: false,
    };
  };

  // Fetch wishlist and bids from context
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { placeBid } = useBids();

  const [timeLeft, setTimeLeft] = useState(
    product?.timeLeft ? calculateTimeLeft(product.timeLeft) : null
  );
  const [bidAmount, setBidAmount] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [wishlistMessage, setWishlistMessage] = useState(""); // Wishlist feedback
  const [isWishlist, setIsWishlist] = useState(isInWishlist(product.id)); // Track wishlist status

  // Countdown timer
  useEffect(() => {
    if (product?.status === "Live" && product?.timeLeft) {
      const countdown = setInterval(() => {
        setTimeLeft((prevTime) => {
          const newTime = calculateTimeLeft(
            `${prevTime.hours}:${prevTime.minutes}:${prevTime.seconds}`
          );
          if (newTime.expired) {
            clearInterval(countdown);
          }
          return newTime;
        });
      }, 1000);

      return () => clearInterval(countdown);
    }
  }, [product?.timeLeft, product?.status]);

  // Handle modal keyboard navigation and close
  useEffect(() => {
    if (isOpen) {
      const focusableElements = modalRef.current?.querySelectorAll(
        "button, input, textarea, [tabindex]:not([tabindex='-1'])"
      );
      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];

      const handleKeydown = (e) => {
        if (e.key === "Tab") {
          if (e.shiftKey && document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable.focus();
          } else if (!e.shiftKey && document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable.focus();
          }
        } else if (e.key === "Escape") {
          onClose();
        }
      };

      firstFocusable?.focus();
      document.addEventListener("keydown", handleKeydown);

      return () => document.removeEventListener("keydown", handleKeydown);
    }
  }, [isOpen, onClose]);

  // Bid input handling
  const handleBidChange = (e) => {
    const value = parseFloat(e.target.value);
    setBidAmount(value);

    if (value < product.lowestBid || value > product.highestBid) {
      setFeedbackMessage(`Bid must be between ${product.lowestBid} and ${product.highestBid}`);
    } else {
      setFeedbackMessage("");
    }
  };

  // Submit bid logic
  const handleSubmitBid = () => {
    if (!bidAmount || parseFloat(bidAmount) < parseFloat(product.baseBid.replace("$", ""))) {
      setFeedbackMessage("Please enter a valid bid amount above the base bid.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      placeBid(product.id, bidAmount); // Use placeBid from context
      setFeedbackMessage("Bid successfully submitted!");
      setBidAmount("");
      setIsSubmitting(false);
    }, 1000);
  };

  // Add to wishlist logic
  const toggleWishlist = () => {
    if (isWishlist) {
      removeFromWishlist(product.id); // Use removeFromWishlist from context
      setWishlistMessage("Removed from Wishlist");
    } else {
      addToWishlist(product); // Use addToWishlist from context
      setWishlistMessage("Added to Wishlist");
    }
    setIsWishlist(!isWishlist);
    setTimeout(() => setWishlistMessage(""), 2000); // Clear message after 2 seconds
  };

  // Render content based on auction status
  const renderContent = () => {
    switch (product?.status) {
      case "Live":
        return (
          <>
            <h2>Live Auction: {product.name}</h2>
            <p>Gallery: {product.gallery}</p> {/* Display gallery name */}
            <img src={product.image} alt={product.name} className="modal-image" />
            <p>{product.description}</p>
            <div className="auction-details">
              <p>Base Bid: {product.baseBid}</p>
              <p>Current Bid: {product.currentBid || product.baseBid}</p>
              <p>
                Time Left:{" "}
                {timeLeft?.expired ? (
                  <span className="expired">Auction Ended</span>
                ) : (
                  <span className="timer">
                    {`${timeLeft?.hours}:${timeLeft?.minutes}:${timeLeft?.seconds}`}
                  </span>
                )}
              </p>
              <div className="bid-input-row">
                <label htmlFor="bidAmount">Enter Bid:</label>
                <input
                  type="number"
                  id="bidAmount"
                  value={bidAmount}
                  onChange={handleBidChange}
                  placeholder="Enter bid"
                />
              </div>
              <button onClick={handleSubmitBid} disabled={timeLeft?.expired || isSubmitting}>
                {timeLeft?.expired ? "Auction Ended" : "Place Your Bid"}
              </button>
            </div>
            {feedbackMessage && <p className="feedback-message">{feedbackMessage}</p>}
          </>
        );
    
      case "Make Bid":
        return (
          <>
            <h2>Make Your Bid: {product.name}</h2>
            <p>Gallery: {product.gallery}</p> {/* Display gallery name */}
            <img src={product.image} alt={product.name} className="modal-image" />
            <p>{product.description}</p>
            <div className="auction-details">
              <p>Base Bid: {product.baseBid}</p>
              <p>Current Bid: {product.currentBid || product.baseBid}</p>
              <div className="bid-input-row">
                <label htmlFor="bidAmount">Enter Your Bid:</label>
                <input
                  type="number"
                  id="bidAmount"
                  value={bidAmount}
                  onChange={handleBidChange}
                  placeholder="Enter bid"
                />
              </div>
              <button onClick={handleSubmitBid} disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Bid"}
              </button>
            </div>
            {feedbackMessage && <p className="feedback-message">{feedbackMessage}</p>}
          </>
        );
    
      case "Upcoming":
        return (
          <>
            <h2>Upcoming Auction: {product.name}</h2>
            <p>Gallery: {product.gallery}</p> {/* Display gallery name */}
            <img src={product.image} alt={product.name} className="modal-image" />
            <p>{product.description}</p>
            <p>Base Bid: {product.baseBid}</p>
            <p>Auction Starts: {product.startDate}</p>
            <button onClick={toggleWishlist} className="details-button">
              {isWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
            </button>
            {wishlistMessage && <p className="wishlist-message">{wishlistMessage}</p>}
          </>
        );
    
      default:
        return <p>Invalid product status.</p>;
    }
    
  };

  return (
    isOpen && (
      <div className="modal-overlay" onClick={onClose}>
        <div
          className="modal-container"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          ref={modalRef}
        >
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
          {renderContent()}
        </div>
      </div>
    )
  );
};

export default Modal;
