import React from "react";
import { useBids } from "../WishlistAndBidsContext"; // Access bids from context
import { format } from "date-fns"; // You can use the 'date-fns' library to format the date
import "./ActionPopup.css";

const BidsPopup = ({ onClose }) => {
  const { bids } = useBids(); // Get bids from context

  // Function to format date (only date, not time)
  const formatDate = (timestamp) => {
    return format(new Date(timestamp), "yyyy-MM-dd");
  };

  // Function to calculate time left (assumes bids have a deadline property)
  const calculateTimeLeft = (timestamp) => {
    const deadline = new Date(timestamp); // Set your deadline here
    const currentTime = new Date(); // Get current time
    console.log("Current Time: ", currentTime); // Log current time
    console.log("Deadline: ", deadline); // Log deadline time
    
    const timeLeft = deadline - currentTime; // Calculate the time difference

    if (timeLeft < 0) {
      return "Bid Closed"; // If the time has passed, return "Bid Closed"
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24)); // Calculate remaining days
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); // Calculate remaining hours
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)); // Calculate remaining minutes

    return `${days}d ${hours}h ${minutes}m`; // Return formatted time left
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>

        {bids.length === 0 ? (
          <div>
            <h2 className="popup-header">Your Bids</h2>
            <p className="popup-text">You haven’t made any bids yet.</p>
          </div>
        ) : (
          <div>
            <h2 className="popup-header">Your Bids</h2>
            <ul className="popup-list">
              {bids.map((bid, index) => (
                <li key={index} className="popup-list-item">
                  <img
                    src={bid.imageUrl}
                    alt={bid.name}
                    className="popup-item-image"
                  />
                  <div className="bid-text">
                    <span className="bid-title">{bid.name}</span>
                    <span className="bid-gallery">Gallery: {bid.gallery}</span>
                    <span className="bid-amount">Bid Amount: ${bid.bidAmount}</span>
                    <span className="bid-status">Status: {bid.status || "Processing"}</span>
                    {/* <span className="bid-time-left">Time Left: {calculateTimeLeft(bid.timestamp)}</span>  */}
                    <span className="bid-date">Date Placed: {formatDate(bid.timestamp)}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default BidsPopup;
