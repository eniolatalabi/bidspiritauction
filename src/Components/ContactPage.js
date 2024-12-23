import React, { useState } from "react";
import './ContactPage.css';
import featuredImage from './featured.png';
import { FaPlus, FaTimes, FaStar } from "react-icons/fa";

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What is BidSpirit, and how does it work?",
      answer:
        "BidSpirit is a platform designed to streamline bidding processes and auction management. We ensure transparency and efficiency, offering tools for businesses to achieve their goals.",
    },
    {
      question: "Is BidSpirit suitable for small businesses?",
      answer:
        "Yes, BidSpirit is designed to support businesses of all sizes, offering scalable tools that fit the needs of startups and enterprises alike.",
    },
    {
      question: "What industries benefit most from BidSpirit?",
      answer:
        "BidSpirit is ideal for industries such as construction, procurement, real estate, technology, and more. If your business involves bidding or auctioning, we can help.",
    },
    {
      question: "Is my data safe on BidSpirit's platform?",
      answer:
        "Absolutely. We prioritize security with advanced encryption and data protection measures to safeguard your sensitive information.",
    },
    {
      question: "Does BidSpirit support international operations?",
      answer:
        "Yes, BidSpirit enables global participation, allowing businesses to connect and engage in cross-border bidding and auctions.",
    },
    {
      question: "How can I customize BidSpirit for my business?",
      answer:
        "BidSpirit offers flexible customization options, including branding and tailored features, ensuring our platform aligns with your unique business needs.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <h2 className="faq-title">Frequently Asked Questions</h2>
      <div className="faq-container">
        {faqs.map((faq, index) => (
          <div className="faq-item" key={index}>
            <div
              className="faq-question"
              onClick={() => toggleFAQ(index)}
            >
              <span>{index + 1 < 10 ? `0${index + 1}` : index + 1}</span>
              {faq.question}
              <button className="faq-icon" aria-label="Toggle FAQ">
                {activeIndex === index ? <FaTimes /> : <FaPlus />}
              </button>
            </div>
            <div
              className={`faq-answer ${
                activeIndex === index ? "visible" : ""
              }`}
            >
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const ReviewsSection = ({ userFirstName }) => {
  const [reviews, setReviews] = useState([
    {
      name: "Jane Doe",
      email: "jane.doe@example.com",
      message: "BidSpirit has transformed the way we handle bidding. Highly recommended!",
      rating: 5,
    },
    {
      name: "John Smith",
      email: "john.smith@example.com",
      message: "Great platform! Simple and effective for small businesses.",
      rating: 4,
    },
    {
      name: "Mary Johnson",
      email: "mary.johnson@example.com",
      message: "Customer support is excellent, and the tools are very user-friendly.",
      rating: 5,
    },
  ]);

  const [formData, setFormData] = useState({
    email: "",
    message: "",
    rating: "5",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.message || !formData.rating) return;

    const newReview = {
      name: userFirstName || "Anonymous",
      email: formData.email,
      message: formData.message,
      rating: parseInt(formData.rating),
    };

    setReviews([newReview, ...reviews]);

    setFormData({
      email: "",
      message: "",
      rating: "5",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <section className="reviews-section">
      <h2 className="reviews-title">We Value Your Feedback</h2>
      <div className="reviews-container">
        <div className="reviews-list">
          {reviews.map((review, index) => (
            <div className="review-item" key={index}>
              <h3>{review.name}</h3>
              <p>{review.email}</p>
              <p>{review.message}</p>
              <div className="review-rating">
                {[...Array(review.rating)].map((_, i) => (
                  <FaStar key={i} className="star filled" />
                ))}
                {[...Array(5 - review.rating)].map((_, i) => (
                  <FaStar key={i} className="star" />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="reviews-form">
          <h3>Help Us Get Better</h3>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />

            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Share your experience"
              required
            ></textarea>

            <label htmlFor="rating">Rating</label>
            <select
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
            >
              <option value="5">5 - Excellent</option>
              <option value="4">4 - Very Good</option>
              <option value="3">3 - Good</option>
              <option value="2">2 - Fair</option>
              <option value="1">1 - Poor</option>
            </select>

            <button type="submit">Submit Review</button>
          </form>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <div className="contact">
      <section className="contact-hero">
        <div className="heroes">
          <div className="contact-hero-content">
            <h1>Let’s Chat We Respond Fast</h1>
            <p className="contact-subtitle">Get in Touch</p>
            <div className="contact-info">
              <p>Email: <a href="mailto:Hello@Bidsprint.com">Hello@Bidspirit.com</a></p>
              <p>Phone: <a href="tel:+2348143123456">+234 814 3123 456</a></p>
            </div>
          </div>
          <div className="contact-hero-image">
            <img src={featuredImage} alt="Featured" />
          </div>
        </div>
      </section>

      <section className="contact-location">
        <h2 className="location-title">Our Location</h2>
        <div className="location-content">
          <div className="location-map">
            <iframe
              src="https://www.google.com/maps?q=Capital+Building,+332+Ikorodu+Rd,+Maryland,+Lagos&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Capital Building Map"
            ></iframe>
          </div>
          <div className="location-address">
            <h3>Connecting Near and Far</h3>
            <p className="address-title">Headquarters</p>
            <p>
              Capital Building, 332, Ikorodu Rd, <br />
              Maryland, Lagos
            </p>
          </div>
        </div>
      </section>

      <FAQSection />
      <ReviewsSection userFirstName="John" />
    </div>
  );
};

export default Contact;
