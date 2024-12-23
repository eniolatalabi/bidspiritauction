import React from 'react';
import './Policies.css';

const TermsOfUse = () => {
  return (
    <div className="policy-container">
      <h1>Terms of Use</h1>
      <p>Welcome to BidSpirit. By using our platform, you agree to the following terms of use:</p>
      <ul>
        <li><strong>Acceptance:</strong> By accessing and using BidSpirit, you accept these terms and agree to comply with them.</li>
        <li><strong>Use of Platform:</strong> Our platform is intended for lawful purposes only. You are responsible for your activities and any content you upload.</li>
        <li><strong>Account Responsibility:</strong> You are responsible for maintaining the confidentiality of your account and password.</li>
        <li><strong>Prohibited Activities:</strong> Do not engage in activities such as hacking, spamming, or violating others' rights.</li>
        <li><strong>Termination:</strong> We reserve the right to terminate or suspend your account for any violations of these terms.</li>
      </ul>
      <p>If you have questions about our terms, please contact us at <a href="mailto:hello@bidspirit.com">hello@bidspirit.com</a></p>
    </div>
  );
};

export default TermsOfUse;