import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <div className="policy-container">
      <h2>Privacy Policy</h2>
      <p>
        We at Siddhartha Dental Clinic value your privacy. We collect only essential
        personal information such as name, contact number, and email for appointment
        purposes. We never share your data with third parties without your consent.
      </p>
      <p>
        All transactions are securely processed through trusted payment gateways.
        We take appropriate security measures to protect your information.
      </p>
      <p>
        By using our website and booking services, you consent to our privacy policy.
      </p>

      <Link to="/" className="back-button">← Back to Home</Link>
    </div>
  );
};

export default PrivacyPolicy;

