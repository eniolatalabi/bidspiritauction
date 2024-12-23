import React from "react";
import { useWishlist } from "../WishlistAndBidsContext"; // useWishlist hook to get global state
import "./ActionPopup.css";

const WishlistPopup = ({ onClose }) => {
  const { wishlist, removeFromWishlist } = useWishlist(); // Add removeFromWishlist function

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        {wishlist.length === 0 ? (
          <div>
            <h2 className="popup-header">Your Wishlist</h2>
            <p className="popup-text">
              You haven’t added any items to your wishlist yet.
            </p>
          </div>
        ) : (
          <div>
            <h2 className="popup-header">Your Wishlist</h2>
            <ul className="popup-list">
              {wishlist.map((item, index) => (
                <li key={index} className="popup-list-item">
                  {/* Image and item details */}
                  <div className="wishlist-item">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="popup-item-image"
                      width={100}
                    />
                    <div className="popup-item-details">
                      <h3 className="wishlist-item-name">{item.name}</h3>
                      <p className="wishlist-item-status">{item.status}</p>

                      {/* Bid Information */}
                      {item.baseBid && (
                        <p className="wishlist-item-bid">
                          Base Bid: ${item.baseBid}
                        </p>
                      )}
                      {item.currentBid && (
                        <p className="wishlist-item-bid">
                          Current Bid: ${item.currentBid}
                        </p>
                      )}

                      {/* Start Date or Time Left */}
                      {item.startDate ? (
                        <p className="wishlist-item-start-date">
                          Start Date: {item.startDate}
                        </p>
                      ) : item.timeLeft ? (
                        <p className="wishlist-item-time-left">
                          Time Left: {item.timeLeft}
                        </p>
                      ) : null}

                      {/* Gallery - Render as a string */}
                      {item.gallery && (
                        <p className="wishlist-item-gallery">
                          Gallery: {item.gallery}
                        </p>
                      )}

                      {/* Remove button */}
                      <button
                        className="remove-button"
                        onClick={() => removeFromWishlist(item.id)}
                      >
                        Remove
                      </button>
                    </div>
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

export default WishlistPopup;
