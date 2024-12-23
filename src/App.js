import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import CategoryPage from "./Components/Categories";
import About from "./Components/AboutSection";
import Contact from "./Components/ContactPage";
import { WishlistAndBidsProvider } from "./WishlistAndBidsContext";
import Homepage from "./Components/Homepage";

function App() {
  return (
    <WishlistAndBidsProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/categories" element={<CategoryPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </Router>
    </WishlistAndBidsProvider>
  );
}

export default App;
