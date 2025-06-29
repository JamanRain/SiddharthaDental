import React from 'react';
import { Link } from 'react-router-dom';

const RefundPolicy = () => {
  return (
    <div className="policy-container">
      <h2>Refund Policy</h2>
      <p>
        Consultation booking payments are non-refundable unless the clinic cancels or reschedules
        the appointment due to unforeseen circumstances.
      </p>
      <p>
        If you are unable to attend your booked appointment, please inform us at least 24 hours
        in advance to reschedule.
      </p>
      <p>
        All refund-related queries must be emailed to <strong>drsiddharthapincha@gmail.com</strong>.
      </p>

      <Link to="/" className="back-button">← Back to Home</Link>
    </div>
  );
};

export default RefundPolicy;

