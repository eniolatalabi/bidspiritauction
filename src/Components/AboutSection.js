import React from "react";
import "./AboutSection.css";
import heroImage from "./featured.png";
import storyImage from "./Assets/bronze.png";
import cultureImage from "./Assets/culture.png";

const About = () => {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-text">
          <h1>About <br /> BidSpirit</h1>
          <span className="highlight">EST. 2024</span>
        </div>
        <div className="hero-image">
          <img src={heroImage} alt="Hero" />
        </div>
        <p >Connecting Collectors <br />with Exceptional <br />Auctions</p>
      </section>

      {/* Our Story Section */}
      <section className="story-section">
        <div className="story-image">
          <img src={storyImage} alt="Our Story" />
        </div>
        <div className="story-text">
          <h2>Our Story</h2>
          <span className="highlight">EST. 2024</span>
          <p>
            BidSpirit was founded with a simple mission: to make high-quality
            auctions accessible to art lovers, collectors, and enthusiasts
            worldwide. We offer a curated selection of fine art, antiques,
            furniture, and collectibles, bringing them directly to your
            fingertips. From our humble beginnings, we’ve grown into a trusted
            platform, providing a seamless, secure, and exciting auction
            experience.
          </p>
        </div>
      </section>

      {/* Our Culture Section */}
      <section className="culture-section">
        <div className="culture-image">
          <img src={cultureImage} alt="Our Culture" />
        </div>
        <div className="culture-text">
          <h2>Our Culture</h2>
          <p>
            At BidSpirit, we are driven by a passion for art and innovation.
            Our team is dedicated to creating a platform that not only meets
            but exceeds the expectations of our users. We value collaboration,
            integrity, and continuous growth, fostering an environment where
            ideas flourish and creativity thrives.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
