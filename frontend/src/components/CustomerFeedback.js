import React, { useEffect, useRef } from 'react';

import user1 from "../assets/patient1.jpg";
import user2 from "../assets/patient2.jpg";
import user3 from "../assets/patient3.jpg";

const aiReviews = [
  {
    img: user1,
    
    text: "I had a great experience getting braces here. The doctor and staff were always friendly and professional. The first few days were a bit uncomfortable, but ghe results were totally worth it. I saw steady improvement overtime, and now I'm so happy with my smile. The hygiene is well maintained and they made the whole journey easy. Highly recommend to anyone thinking about getting braces!",
  },
  {
    img: user2,
    
    text: "Getting braces was a big decision for me, but Dr. Neeta made the entire journey incredibly smooth. Her guidance, precision, and friendly nature made every visit pleasant. The clinic is extremely hygienic. What I appreciated the most was the personal attention and transparency at every step. My experience here was nothing short of amazing. Thank you for giving me a reason to smile wider!",
  },
  {
    img: user3,
    
    text: "I’ve always been afraid of dental procedures, but my dental implant experience at this clinic was surprisingly comfortable. Dr. Siddhartha and his team explained everything clearly and made the process smooth and painless. The modern equipment and strict hygiene gave me real peace of mind. I’ll definitely return for future treatments.",
  }
];

const AICustomerFeedback = () => {
  const cardRefs = useRef([]);

useEffect(() => {
  const cards = document.querySelectorAll(".ai-card");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const el = entry.target;
        if (entry.isIntersecting) {
          el.classList.add("animate");
        } else {
          el.classList.remove("animate"); 
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  cards.forEach((card) => observer.observe(card));

  return () => cards.forEach((card) => observer.unobserve(card));
}, []);

  return (
    <section className="ai-review-section">
      <div className="ai-card-wrapper">
        {aiReviews.map((review, idx) => (
          <div
            key={idx}
            ref={(el) => (cardRefs.current[idx] = el)}
            className="ai-card"
            style={{ '--i': idx }}
          >
            <img src={review.img} alt={review.name} />
            <p className="review-text">"{review.text}"</p>
            <p className="reviewer-name">- {review.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AICustomerFeedback;