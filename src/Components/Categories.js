import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaSearch, FaTimes } from "react-icons/fa"; // Import FaTimes for clearing search
import ProductCard from "./ProductCard";
import Modal from "./Modal";
import BidsPopup from "./BidsPopUp";
import WishlistPopup from "./WishlistPopUp";
import products from "../Data/ProductData";
import "./Categories.css";

const Categories = () => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [filter, setFilter] = useState(""); // Filter state
  const [sortOrder, setSortOrder] = useState(""); // Sort order state
  const [wishlist, setWishlist] = useState([]);
  const [bids, setBids] = useState([]);
  const [popupType, setPopupType] = useState(null);

  const itemsPerPage = window.innerWidth <= 768 ? 4 : 10;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Parse the query parameters to set the filter
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const queryFilter = queryParams.get("filter");
    if (queryFilter) {
      setFilter(queryFilter.toLowerCase());
    } else {
      setFilter(""); // Default to show all if no filter is set
    }
  }, [location.search]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      performSearch();
    }
  };

  const performSearch = () => {
    const lowerCaseTerm = searchTerm.toLowerCase();
    const results = products.filter((product) =>
      product.name.toLowerCase().includes(lowerCaseTerm)
    );
    setFilteredProducts(results);
    setCurrentPage(1);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setFilteredProducts(products);
    setCurrentPage(1);
  };

  const paginatedProducts = filteredProducts
    .filter((product) => {
      if (!filter) return true;
      return product.slug.includes(filter.toLowerCase());
    })
    .sort((a, b) => {
      const priceA = a.currentBid
        ? parseFloat(a.currentBid.replace(/[^0-9.-]+/g, ""))
        : a.baseBid
        ? parseFloat(a.baseBid.replace(/[^0-9.-]+/g, ""))
        : 0;

      const priceB = b.currentBid
        ? parseFloat(b.currentBid.replace(/[^0-9.-]+/g, ""))
        : b.baseBid
        ? parseFloat(b.baseBid.replace(/[^0-9.-]+/g, ""))
        : 0;

      if (sortOrder === "price-high") return priceB - priceA;
      if (sortOrder === "price-low") return priceA - priceB;
      if (sortOrder === "a-z") return a.name.localeCompare(b.name);
      if (sortOrder === "z-a") return b.name.localeCompare(a.name);
      return 0;
    })
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCardClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const addToWishlist = (product) => {
    setWishlist((prevWishlist) => [...prevWishlist, product]);
  };

  const removeFromWishlist = (productId) => {
    setWishlist(wishlist.filter((product) => product.id !== productId));
  };

  const submitBid = (product, bidAmount) => {
    setBids((prevBids) => [
      ...prevBids,
      { ...product, bidAmount, status: "Submitted", date: new Date().toLocaleString() },
    ]);
  };

  const handlePopup = (type) => {
    setPopupType(type);
  };

  const closePopup = () => {
    setPopupType(null);
  };

  return (
    <div className="categories-page">
      <header className="categories-header">
        <h1>Explore Different Auctions</h1>
        <div className="header-decoration"></div>
      </header>

      <div className="search-filter-container" id="searchfilter">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for an auction..."
            className="search-input"
            value={searchTerm}
            onChange={handleSearch}
            onKeyPress={handleKeyPress}
          />
          {searchTerm && (
            <button className="search-icon" onClick={clearSearch}>
              <FaTimes color="#e64a19" size={20} />
            </button>
          )}
          <button className="search-icon" onClick={performSearch}>
            <FaSearch color="#e64a19" size={20} />
          </button>
        </div>

        <div className="filter-dropdown">
          <select
            id="filter-sort"
            onChange={(e) => setSortOrder(e.target.value)}
            value={sortOrder}
          >
            <option value="">Sort By</option>
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      <nav className="categories-nav">
        <ul>
          <li
            className={!filter ? "active" : ""}
            onClick={() => setFilter("")}
          >
            All
          </li>
          <li
            className={filter === "furniture" ? "active" : ""}
            onClick={() => setFilter("furniture")}
          >
            Furniture
          </li>
          <li
            className={filter === "antiques" ? "active" : ""}
            onClick={() => setFilter("antiques")}
          >
            Antiques
          </li>
          <li
            className={filter === "fine-arts" ? "active" : ""}
            onClick={() => setFilter("fine-arts")}
          >
            Fine Arts
          </li>
          <li
            className={filter === "collectibles" ? "active" : ""}
            onClick={() => setFilter("collectibles")}
          >
            Collectibles
          </li>
          <li
            className={filter === "popular" ? "active" : ""}
            onClick={() => setFilter("popular")}
          >
            Popular
          </li>
          <li
            className={filter === "live" ? "active" : ""}
            onClick={() => setFilter("live")}
          >
            Live
          </li>
          <li
            className={filter === "sponsored" ? "active" : ""}
            onClick={() => setFilter("sponsored")}
          >
            Sponsored
          </li>
          <li
            className={filter === "upcoming" ? "active" : ""}
            onClick={() => setFilter("upcoming")}
          >
            Upcoming
          </li>
        </ul>
      </nav>

      <div className="auction-grid">
        {paginatedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => handleCardClick(product)}
            addToWishlist={addToWishlist}
            removeFromWishlist={removeFromWishlist}
            isInWishlist={wishlist.some((item) => item.id === product.id)}
            onBid={submitBid}
          />
        ))}
      </div>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`page-button ${currentPage === index + 1 ? "active" : ""}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {selectedProduct && (
        <Modal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={handleCloseModal}
          onBidSubmit={submitBid}
        />
      )}

      {popupType === "wishlist" && (
        <WishlistPopup items={wishlist} onClose={closePopup} />
      )}
      {popupType === "bids" && <BidsPopup items={bids} onClose={closePopup} />}
    </div>
  );
};

export default Categories;
