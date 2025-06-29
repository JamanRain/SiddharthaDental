import React from 'react';
import { Link } from 'react-router-dom';

const TermsAndConditions = () => {
  return (
    <div className="policy-container">
      <h2>Terms & Conditions</h2>
      <p>
        By using this website, you agree to our policies and procedures. Appointment slots are
        available on a first-come, first-served basis.
      </p>
      <p>
        Payments must be made in advance to confirm your booking. We reserve the right to cancel
        or reschedule appointments under special conditions.
      </p>
      <p>
        Users must provide accurate information during booking to avoid delays or cancellation.
      </p>

      <Link to="/" className="back-button">← Back to Home</Link>
    </div>
  );
};

export default TermsAndConditions;
