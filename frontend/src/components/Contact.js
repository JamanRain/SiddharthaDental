import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const Contact = () => {
  return (
    <>
      <section className="contact-section">

        <div className="map-container" style={{ marginTop: '2rem', textAlign: 'center', width: '100%', maxWidth: '100vw' }}>
          <h1>Find Us Here</h1>
          <iframe
            title="clinic-location-map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3580.9201894430175!2d91.76377097486946!3d26.16672859175145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375a590ff38a97fb%3A0x55cca84cecc49552!2sSiddhartha%20Dental%20Clinic%20and%20Implant%20Centre!5e0!3m2!1sen!2sin!4v1748438771116!5m2!1sen!2sin"
            width="100%"
            height="500"
            style={{ border: 0, borderRadius: '10px' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/916901342433"
        className="floating-whatsapp"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          background: '#25D366',
          padding: '12px',
          borderRadius: '50%',
          color: 'white',
          boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
          zIndex: 1000
        }}
      >
        <FaWhatsapp size={30} />
      </a>

      {/* Floating Book Button */}
      <a
        href="#booking"
        className="floating-book"
        style={{
          position: 'fixed',
          bottom: '500px',
          right: '20px',
          background: '#4635B1',
          color: 'white',
          padding: '10px 16px',
          borderRadius: '24px',
          fontWeight: '600',
          textDecoration: 'none',
          boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
          zIndex: 1000,
          fontSize: '1rem'
        }}
      >
        Book Now
      </a>
    </>
  );
};

export default Contact;
