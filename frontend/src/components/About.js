import React, { useEffect, useRef, useState } from 'react';
import doctor1 from '../assets/Dr. Siddhartha Pincha.jpg';
import doctor2 from '../assets/Dr. Neeta Pincha.jpg';
import team1 from '../assets/Team1.jpg';
import team2 from '../assets/Team2.jpg';


const useOnScreen = (ref, threshold = 0.3) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting); // ✅ updates every time it enters or leaves
      },
      { threshold }
    );

    const current = ref.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [ref, threshold]);

  return visible;
};
const MeetTheDoctors = () => {
  const leftRef = useRef();
  const rightRef = useRef();
  const teamRef = useRef();

  const leftVisible = useOnScreen(leftRef);
  const rightVisible = useOnScreen(rightRef);
  const teamVisible = useOnScreen(teamRef);

  return (
    <section className="doctors-section">
  <h2>Meet Our Doctors</h2>
  <div className="doctors-grid">
    <div ref={leftRef} className={`doctor-card slide-left ${leftVisible ? 'visible' : ''}`}>
      <img className="doctor-img" src={doctor1} alt="Dr. Siddhartha Pincha" />
      <h3>Dr. Siddhartha Pincha</h3>
      <p className="qualification">BDS(Gold Medalist), MDS, Prosthodontics and Dental Implantology</p>
      <p className="bio">
        Senior Dentist with 12+ years of experience in dental implants, restorative and cosmetic dentistry.
      </p>
    </div>

    <div ref={rightRef} className={`doctor-card slide-right ${rightVisible ? 'visible' : ''}`}>
      <img className="doctor-img" src={doctor2} alt="Dr. Neeta Bothra" />
      <h3>Dr. Neeta Bothra</h3>
      <p className="qualification">BDS, FAGE(senior Dental sugeon)</p>
      <p className="bio">
        Senior Dentist with 12+ years of experience in restorative and cosmetic dentistry.
      </p>
    </div>
  </div>

  <div ref={teamRef} className={`team-photo ${teamVisible ? 'drop-in' : ''}`}>
    <div className="team-images">
      <img src={team1} alt="Team 1" />
      <img src={team2} alt="Team 2" />
    </div>
    <p>
      Our friendly and experienced dental team is here to care for your family's oral health.
    </p>
  </div>
</section>

  );
};

export default MeetTheDoctors;




