import React, { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      const res = await fetch('http://localhost:5000/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (data.success) {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setStatus('Failed to send message.');
      }
    } catch (err) {
      setStatus('Error sending message.');
    }
  };

  return (
    <>
      <section className="contact-section">
        <h2>Contact Us</h2>
        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button type="submit">Send</button>
        </form>
        <p style={{ marginTop: '1rem', color: 'green' }}>{status}</p>

        <div className="map-container" style={{ marginTop: '2rem', textAlign: 'center', width: '100%', maxWidth: '100vw' }}>
          <h3>Find Us Here</h3>
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

        <div className="contact-info" style={{ marginTop: '1.5rem' }}>
          <p>Email: drsiddharthapincha@gmail.com</p>
          <p>Phone: +91 69013 42433</p>
          <p>Location: 1ST FLOOR, MUNNI MARKET OPP. HUB MALL, GS Rd, Bhangagarh, Guwahati, Assam</p>
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
          boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
        }}
      >
        <FaWhatsapp size={30} />
      </a>
    </>
  );
};

export default Contact;
