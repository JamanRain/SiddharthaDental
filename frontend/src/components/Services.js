import React, { useRef, useEffect, useState } from 'react';
import implantImg from '../assets/Implant.jpg';
import bracesImg from '../assets/braces.jpg';
import smileImg from '../assets/smile.png';
import canalImg from '../assets/canal.jpg';
import cosmeticImg from '../assets/cosmetic.jpg';
import crownImg from '../assets/crown.jpg';

const Services = () => {
  const services = [
    {
      name: "Dental Implants",
      desc: "Dental implants offer a permanent solution for missing teeth. They look, feel, and function like natural teeth, allowing you to eat, speak, and smile with complete confidence. Our advanced techniques ensure a seamless, comfortable procedure.",
      img: implantImg,
    },
    {
      name: "Braces",
      desc: "We provide modern orthodontic solutions to straighten teeth and correct bite issues. Whether you choose traditional braces or clear aligners, our personalized plans help you achieve a beautiful, healthy smile at any age.",
      img: bracesImg,
    },
    {
      name: "Smile Correction",
      desc: "From veneers to tooth reshaping and gum contouring, our smile correction treatments are designed to enhance your natural beauty. Let us help you achieve the radiant, confident smile you’ve always dreamed of.",
      img: smileImg,
    },
    {
      name: "Root Canal",
      desc: "Our gentle root canal treatments save infected or damaged teeth, relieving pain and restoring function. We use the latest technology for precise, efficient procedures with faster healing and long-lasting results.",
      img: canalImg,
    },
    {
      name: "Cosmetic Dentistry",
      desc: "Cosmetic dentistry combines art and science to improve your smile’s appearance. We offer whitening, bonding, veneers, and more, all customized to suit your facial aesthetics and personal preferences.",
      img: cosmeticImg,
    },
    {
      name: "Crown & Bridge",
      desc: "Crowns and bridges restore damaged or missing teeth, providing strength and natural appearance. Our custom-made restorations blend seamlessly with your existing teeth for lasting durability and function.",
      img: crownImg,
    }
  ];

  const refs = useRef([]);
  const [visibleIndexes, setVisibleIndexes] = useState([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number(entry.target.getAttribute('data-index'));
          if (entry.isIntersecting) {
            setVisibleIndexes((prev) =>
              prev.includes(idx) ? prev : [...prev, idx]
            );
          }
        });
      },
      { threshold: 0.3 }
    );

    refs.current.forEach((ref) => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, []);

  const positionClasses = [
    'from-left-top',    // 0
    'from-top',         // 1
    'from-right-top',   // 2
    'from-left-bottom', // 3
    'from-bottom',      // 4
    'from-right-bottom' // 5
  ];

  return (
    <section className="services-section">
      <h2>Our Services</h2>
      <div className="services-grid">
        {services.map((service, index) => (
          <div
            key={index}
            ref={(el) => (refs.current[index] = el)}
            data-index={index}
            className={`service-card ${positionClasses[index]} ${
              visibleIndexes.includes(index) ? 'animate' : ''
            }`}
          >
            <div className="service-image-placeholder">
              <img 
                src={service.img} 
                alt={service.name} 
                style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }} 
              />
            </div>
            <div className="service-content">
              <h3>{service.name}</h3>
              <p>{service.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
