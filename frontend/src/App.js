import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import VideoGallery from './components/VideoGallery';
import DentalFAQ from './components/DentalFAQ';
import CustomerReviews from './components/CustomerReviews';
import CustomerFeedback from './components/CustomerFeedback';
import Contact from './components/Contact';
import PhotoGallery from './components/PhotoGallery';
import ClinicTimings from './components/ClinicTimings';
import UserForm from './components/UserForm';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';

import PrivacyPolicy from './components/PrivacyPolicy';
import RefundPolicy from './components/RefundPolicy';
import TermsAndConditions from './components/TermsAndConditions';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './styles/styles.css';

function App() {
  const [showAdminButton, setShowAdminButton] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') {
        setShowAdminButton(true);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <Router>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <div id="home"><Hero /></div>
              <div id="about"><About /></div>
              <div id="services"><Services /></div>
              <div id="videos"><VideoGallery /></div>
              <div id="gallery"><PhotoGallery /></div>
              <div id="faq"><DentalFAQ /></div>
              <div id="reviews"><CustomerReviews /></div>
              <CustomerFeedback />
              <div id="timings"><ClinicTimings /></div>
              <div id="booking"><UserForm /></div>
              <div id="contact"><Contact /></div>

              {showAdminButton && !showAdminPanel && (
                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                  <button onClick={() => setShowAdminPanel(true)}>Go to Admin</button>
                </div>
              )}

              {showAdminPanel && (
                <div id="admin" style={{ marginTop: '3rem' }}>
                  <AdminDashboard />
                </div>
              )}

              <Footer />
            </>
          }
        />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      </Routes>
    </Router>
  );
}

export default App;

