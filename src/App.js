import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import CategoryPage from "./Components/Categories";
import About from "./Components/AboutSection";
import Contact from "./Components/ContactPage";
import TermsOfUse from "./Components/TermOfUse"; 
import PrivacyPolicy from "./Components/Policy"; 
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
          <Route path="/terms-of-use" element={<TermsOfUse />} /> {/* Add Terms of Use route */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} /> {/* Add Privacy Policy route */}
        </Routes>
        <Footer />
      </Router>
    </WishlistAndBidsProvider>
  );
}

export default App;
