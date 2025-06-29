import React from 'react';
import { FaYoutube, FaWhatsapp, FaInstagram, FaFacebook } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Siddhartha Dental Clinic And Implant Centre</p>
          <p>1ST FLOOR, MUNNI MARKET OPP. HUB MALL, GS Rd, Bhangagarh, Guwahati, Assam</p>
          <p>Phone: <strong>+91-69013 42433</strong></p>
          <p>Email: <strong>drsiddharthapincha@gmail.com</strong></p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#timings">Clinic Timings</a></li>
            <li><a href="#booking">Book Appointment</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Legal</h4>
          <ul>
            <li><a href="/privacy-policy" target="_blank">Privacy Policy</a></li>
            <li><a href="/refund-policy" target="_blank">Refund Policy</a></li>
            <li><a href="/terms-and-conditions" target="_blank">Terms & Conditions</a></li>
          </ul>
        </div>
      </div>

      {/* Social Media Buttons */}
      <div className="social-buttons" style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <a href="https://www.youtube.com/@siddharthadental" target="_blank" rel="noopener noreferrer" className="btn social-btn youtube">
          <FaYoutube size={24} />
        </a>
        <a href="https://wa.me/916901342433" target="_blank" rel="noopener noreferrer" className="btn social-btn whatsapp">
          <FaWhatsapp size={24} />
        </a>
        <a href="https://www.instagram.com/siddhartha_dental_clinic/" target="_blank" rel="noopener noreferrer" className="btn social-btn instagram">
          <FaInstagram size={24} />
        </a>
        <a href="https://www.facebook.com/siddhartha.dental.ghy/" target="_blank" rel="noopener noreferrer" className="btn social-btn facebook">
          <FaFacebook size={24} />
        </a>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Siddhartha Dental Clinic. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
