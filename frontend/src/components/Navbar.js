import React, { useState } from 'react';
import logo from '../assets/Logo2.png';

const Navbar = () => {
  const [showAdminBtn, setShowAdminBtn] = useState(false);

  const handleKeySequence = (e) => {
    // Example: press Ctrl + Shift + A to reveal the button
    if (e.ctrlKey && e.shiftKey && e.key === 'A') {
      setShowAdminBtn(true);
    }
  };

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeySequence);
    return () => window.removeEventListener('keydown', handleKeySequence);
  }, []);

  const scrollToAdmin = () => {
    const adminEl = document.getElementById('admin');
    if (adminEl) {
      adminEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="Clinic Logo" className="logo-img" />
      </div>
      <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#booking">Book</a></li>
        <li><a href="#reviews">Reviews</a></li>
      </ul>

      {showAdminBtn && (
        <button 
          onClick={scrollToAdmin}
          style={{
            position: 'absolute',
            left: '700px',
            bottom: '20px',
            padding: '0.5rem 1rem',
            background: '#004080',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Go to Admin
        </button>
      )}
    </nav>
  );
};

export default Navbar;
