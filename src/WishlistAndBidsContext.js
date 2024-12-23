import React, { createContext, useState, useContext } from "react";
import  products  from "./Data/ProductData";


// Create Contexts for Wishlist and Bids
const WishlistContext = createContext();
const BidsContext = createContext();

// Custom Hooks to Access Contexts
export const useWishlist = () => useContext(WishlistContext);
export const useBids = () => useContext(BidsContext);

// Provider Component
export const WishlistAndBidsProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]); // Wishlist items
  const [bids, setBids] = useState([]); // Bids made (initially empty)

  // Add item to wishlist
  const addToWishlist = (item) => {
    setWishlist((prevWishlist) => {
      if (!prevWishlist.some((wishItem) => wishItem.id === item.id)) {
        return [...prevWishlist, item];
      }
      return prevWishlist; // Don't add if already in the list
    });
  };

  // Remove item from wishlist
  const removeFromWishlist = (id) => {
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== id));
  };

  // Check if item is in wishlist
  const isInWishlist = (id) => {
    return wishlist.some((item) => item.id === id);
  };

  // Add a bid (with duplicate check)
  const addBid = (bid) => {
    setBids((prevBids) => {
      const isDuplicate = prevBids.some(
        (existingBid) =>
          existingBid.productId === bid.productId &&
          existingBid.bidAmount === bid.bidAmount
      );
      if (isDuplicate) {
        console.warn("Duplicate bid detected. Bid not added.");
        return prevBids;
      }
      return [...prevBids, bid];
    });
  };

  const placeBid = (productId, bidAmount) => {
    // Find the product by ID in the products array
    const product = products.find((p) => p.id === productId);
  
    if (!product) {
      console.error("Product not found for the given ID:", productId);
      return;
    }
  
    setBids((prevBids) => {
      // Check if there's already a bid for the same product
      const existingBidIndex = prevBids.findIndex((bid) => bid.productId === productId);
  
      const newBid = {
        productId,
        bidAmount,
        name: product.name,
        imageUrl: product.image,
        gallery: product.gallery || "Default Gallery",
        timestamp: new Date().toISOString(),
      };
  
      if (existingBidIndex !== -1) {
        // Update the existing bid
        const updatedBids = [...prevBids];
        updatedBids[existingBidIndex] = newBid;
        return updatedBids;
      }
  
      // Add new bid if no duplicates
      return [...prevBids, newBid];
    });
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}
    >
      <BidsContext.Provider value={{ bids, addBid, placeBid }}>
        {children}
      </BidsContext.Provider>
    </WishlistContext.Provider>
  );
};
