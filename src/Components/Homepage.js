import React, { useState } from "react";
import "./Homepage.css";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";
import featuredImage from "./featured.png";
import ProductCard from "./ProductCard";
import products from "../Data/ProductData";
import Modal from "./Modal";

// Search function
const searchProducts = (searchTerm) => {
  if (!searchTerm) return products;

  const lowercasedTerm = searchTerm.toLowerCase();

  return products.filter((product) => {
    const { name, category, description, tag } = product;
    return (
      name.toLowerCase().includes(lowercasedTerm) ||
      category.toLowerCase().includes(lowercasedTerm) ||
      description.toLowerCase().includes(lowercasedTerm) ||
      (tag && tag.toLowerCase().includes(lowercasedTerm))
    );
  });
};

const Homepage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setFilteredProducts(searchProducts(searchTerm));
  };

  const clearSearch = () => {
    setSearchTerm(""); // Clear the search term
    setFilteredProducts(products); // Reset the product list
  };

  const handleCategoryClick = (category) => {
    navigate(`/categories?filter=${category}`);
  };

  const handleViewLiveAuctions = () => {
    navigate("/categories?filter=live");
  };

  const handleViewUpcomingAuctions = () => {
    navigate("/categories?filter=upcoming");
  };

  // Filter products with "Live" status and search term
  const liveProducts = filteredProducts.filter(
    (product) => product.status === "Live"
  );

  // Display two products at a time
  const visibleProducts = liveProducts.slice(currentIndex, currentIndex + 2);

  // Filter products with "Upcoming" status and search term
  const upcomingProducts = filteredProducts.filter(
    (product) => product.status === "Upcoming"
  );

  // Display two upcoming products at a time
  const visibleUpcomingProducts = upcomingProducts.slice(
    currentIndex,
    currentIndex + 2
  );

  const handleNext = () => {
    if (currentIndex + 2 < liveProducts.length) {
      setCurrentIndex((prevIndex) => prevIndex + 2);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 2);
    }
  };

  // Filter sponsored products by "tag"
  const sponsoredProducts = filteredProducts.filter(
    (product) => product.tag === "sponsored"
  );

  // Display 4 sponsored products
  const displayedSponsored = sponsoredProducts.slice(0, 4);

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-arch">
            <img
              src={featuredImage}
              alt="Interior Design"
              className="hero-image"
            />
          </div>
          <div className="hero-text">
            <h1>
              Discover & Bid on the <br />
              World’s Finest <br /> Treasures
            </h1>
            <form onSubmit={handleSearchSubmit} className="hero-search">
              <div className="search-input-container">
                <input
                  type="text"
                  placeholder="Search here"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                {searchTerm && (
                  <button
                    type="button"
                    className="clear-search-btn"
                    onClick={clearSearch}
                  >
                    <FaTimes color="#e64a19" size={20} />
                  </button>
                )}
              </div>
              <button type="submit">
                <FaSearch color="#e64a19" size={20} />
              </button>
            </form>
            <p>
              Find Fine Art and Rare <br /> Antiques – Join Real-Time <br /> Auctions
              Today!
            </p>
          </div>
        </div>
      </section>

      {/* Search Results */}
      {searchTerm && (
        <section className="search-results">
          <h2>Search Results for "{searchTerm}"</h2>
          <div className="search-results-list">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => openModal(product)}
                />
              ))
            ) : (
              <p>No products found for "{searchTerm}"</p>
            )}
          </div>
        </section>
      )}

      {/* Categories Section */}
      <section className="categories-section">
        <div className="categories">
          <h2>Explore Different Auctions Here</h2>
          <div className="circles">
            <div
              className="category-circle fine-arts"
              onClick={() => handleCategoryClick("fine-arts")}
            >
              Fine Arts
            </div>
            <div
              className="category-circle furniture"
              onClick={() => handleCategoryClick("furniture")}
            >
              Furniture
            </div>
            <div
              className="category-circle antiques"
              onClick={() => handleCategoryClick("antiques")}
            >
              Antiques
            </div>
            <div
              className="category-circle collectibles"
              onClick={() => handleCategoryClick("collectibles")}
            >
              Collectibles
            </div>
          </div>
        </div>
      </section>

      {/* Live Section */}
      <section className="live-section">
        <div className="livetext-card">
          <div className="live-texts">
            <h2 className="live-title">
              Live <br /> Auctions
            </h2>
            <p className="live-description">
              Find Fine Art and Rare <br /> Antiques – Join Real-Time <br /> Auctions Today!
            </p>
          </div>
          <div className="live-carousel">
            <button
              className={`arrow-btn left-arrow ${
                currentIndex === 0 ? "disabled" : ""
              }`}
              onClick={handlePrev}
              disabled={currentIndex === 0}
            >
              <FaArrowLeft size={20} />
            </button>
            <div className="live-cards">
              {visibleProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => openModal(product)}
                />
              ))}
            </div>
            <button
              className={`arrow-btn right-arrow ${
                currentIndex + 2 >= liveProducts.length ? "disabled" : ""
              }`}
              onClick={handleNext}
              disabled={currentIndex + 2 >= liveProducts.length}
            >
              <FaArrowRight size={20} />
            </button>
          </div>
          <div className="button-container">
            <button className="view-live-btn" onClick={handleViewLiveAuctions}>
              View Live Auctions
            </button>
          </div>
        </div>
      </section>

      {/* Sponsored Section */}
      <section className="sponsored-section">
        <div className="sponsoredtext-card">
          <div className="sponsored-header">
            <h2 className="live-title">
              Sponsored <br /> Auctions
            </h2>
            <p className="live-description">
              Explore Future Auctions: <br />
              Fine Art, Antiques, Furniture, <br /> and Collectibles.
            </p>
          </div>
          <div className="sponsored-layout">
            <div className="left-sponsored">
              {displayedSponsored.slice(0, 2).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => openModal(product)}
                />
              ))}
            </div>
            <div className="right-sponsored">
              {displayedSponsored.slice(2).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => openModal(product)}
                />
              ))}
            </div>
          </div>
          <div className="button-container">
            <button
              className="view-sponsored-btn"
              onClick={() => navigate("/categories?filter=sponsored")}
            >
              View Sponsored Auctions
            </button>
          </div>
        </div>
      </section>

      {/* Upcoming Section */}
  <section className="live-section">
  <div className="livetext-card">
    <div className="live-texts">
      <h2 className="live-title">
        Upcoming <br /> Auctions
      </h2>
      <p className="live-description">
        Featured events and items <br /> you don’t want to miss.
      </p>
    </div>
    <div className="live-carousel">
      <button
        className={`arrow-btn left-arrow ${
          currentIndex === 0 ? "disabled" : ""
        }`}
        onClick={handlePrev}
        disabled={currentIndex === 0}
      >
        <FaArrowLeft size={20} />
      </button>
      <div className="live-cards">
        {visibleUpcomingProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => openModal(product)} // Open modal with selected product
          />
        ))}
      </div>
      <button
        className={`arrow-btn right-arrow ${
          currentIndex + 2 >= upcomingProducts.length ? "disabled" : ""
        }`}
        onClick={handleNext}
        disabled={currentIndex + 2 >= upcomingProducts.length}
      >
        <FaArrowRight size={20} />
      </button>
    </div>
    <div className="button-container">
      <button
        className="view-live-btn"
        onClick={handleViewUpcomingAuctions}
      >
        View Upcoming Auctions
      </button>
    </div>
  </div>
</section>

      {/* Modal integration */}
      {isModalOpen && (
        <Modal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default Homepage;
