import React from 'react';
import './Policies.css';

const PrivacyPolicy = () => {
  return (
    <div className="policy-container">
      <h1>Privacy Policy</h1>
      <p>At BidSpirit, we value your privacy. This policy outlines how we handle your information:</p>
      <ul>
        <li><strong>Data Collection:</strong> We collect data to improve your experience, such as account details and usage data.</li>
        <li><strong>Data Usage:</strong> Your data is used to provide services, improve our platform, and communicate with you.</li>
        <li><strong>Data Protection:</strong> We implement security measures to protect your personal information.</li>
        <li><strong>Third-Party Sharing:</strong> We do not share your data with third parties without your consent, except as required by law.</li>
        <li><strong>Your Rights:</strong> You can request access to, correction of, or deletion of your personal data.</li>
      </ul>
      <p>If you have questions about our privacy practices, please contact us at <a href="mailto:hello@bidspirit.com">hello@bidspirit.com</a>.</p>
    </div>
  );
};

export default PrivacyPolicy;