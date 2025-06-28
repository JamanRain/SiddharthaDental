import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import AnimatedCounter from './AnimatedCounter';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const heroImages = [
  require('../assets/slider1.jpg'),
  require('../assets/slider2.jpg'),
  require('../assets/slider3.jpg')
];

const Hero = () => {
  const [showStats, setShowStats] = useState(false);
  const statsRef = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    fade: true,
    arrows: false
  };

  // IntersectionObserver for stats animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowStats(true);
          observer.disconnect(); // Only animate once
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) observer.unobserve(statsRef.current);
    };
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="hero-slider-container">
        <Slider {...settings}>
          {heroImages.map((img, index) => (
            <div key={index}>
              <div
                className="hero-slide"
                style={{ backgroundImage: `url(${img})` }}
              ></div>
            </div>
          ))}
        </Slider>

        <div className="hero-overlay">
          <h1>
            <span className="text-primary">SIDDHARTHA DENTAL</span> CLINIC
          </h1>
          <p>Delivering healthy smiles with compassion and technology.</p>
          <a href="#contact" className="btn">CONTACT</a>
        </div>
      </section>

      {/* Stats Section */}
      <section
        className={`stats-section ${showStats ? 'show' : ''}`}
        ref={statsRef}
      >
        <div className="stat-box">
          <h2><AnimatedCounter end={100} duration={10} />+</h2>
          <h4>Dental Tools & Procedures</h4>
          <p>Advanced equipment and techniques for effective treatment.</p>
        </div>
        <div className="stat-box">
          <h2><AnimatedCounter end={3000} duration={12} />+</h2>
          <h4>Days of Delivering</h4>
          <p>Over 7 years of trusted dental care in Guwahati.</p>
        </div>
        <div className="stat-box">
          <h2><AnimatedCounter end={8000} duration={14} />+</h2>
          <h4>Happy Patients</h4>
          <p>Building trust with every smile we restore and protect.</p>
        </div>
      </section>
    </>
  );
};

export default Hero;



