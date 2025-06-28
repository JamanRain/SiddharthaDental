import React, { useState, useRef, useEffect } from 'react';

const faqs = [
  {
    question: "How often should I visit the dentist?",
    answer: "It is recommended to visit the dentist every 6-12 months for a routine check-up and cleaning.",
  },
  {
    question: "What causes tooth sensitivity?",
    answer: "Tooth sensitivity can be caused by enamel wear, exposed roots, or cavities. Using anti-sensitivity toothpaste can help in short term.",
  },
  {
    question: "How should I brush my teeth?",
    answer: "Use a soft-bristled toothbrush and fluoride toothpaste. Brush in brisk and short strokes combined with horizontal and vertical motions near the gums for 3-4 minutes twice a day. Make sure you touch every surface of your teeth and also use dental floss for cleaning in between your teeth",
  },
  {
    question: "What’s the best way to whiten my teeth?",
    answer: "Professional whitening by a dentist is the safest. Avoid over-the-counter strips unless recommended.",
  },
  {
    question: "Is flossing really necessary?",
    answer: "Yes, flossing removes plaque and food particles from between the teeth where a toothbrush can't reach, helping prevent gum disease and cavities.",
  },
  {
    question: "What causes bad breath?",
    answer: "Bad breath can result from poor oral hygiene, food particles stuck in the mouth, dry mouth, or underlying medical conditions.",
  },
  {
    question: "Are electric toothbrushes better than manual ones?",
    answer: "Electric toothbrushes can be more effective at removing plaque, especially for people with limited dexterity, but manual brushing done properly works well too.",
  },
  {
    question: "Can diet affect my dental health?",
    answer: "Yes, sugary and acidic foods can increase risk of cavities and enamel erosion. A balanced diet supports healthy teeth and gums.",
  },
  {
    question: "What should I do if I have a toothache?",
    answer: "Rinse your mouth with warm water, gently floss to remove any stuck debris, and see a dentist promptly to diagnose the cause. You can apply clove oil as a home remedy",
  },
  {
    question: "How can I prevent gum disease?",
    answer: "Brush twice daily, floss daily, avoid tobacco, and visit your dentist regularly for cleanings and check-ups."
  },
   {
    question: "Why do my gums bleed while brushing or flossing?",
    answer: "Bleeding gums are usually a sign of plaque buildup or early gum disease (gingivitis). It can also result from brushing too hard or new flossing habits. If it continues, consult your dentist—it may lead to more serious issues if left untreated.",
  }
  
];

const useOnScreen = (ref) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(false); // reset to false to allow retrigger
          setTimeout(() => setVisible(true), 50); // re-trigger visibility
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return visible;
};


const DentalFAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const ref = useRef();
  const visible = useOnScreen(ref);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={`faq-section ${visible ? 'animate' : ''}`} ref={ref}>
      <h2>🦷 Dental FAQs</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div className="faq-item" key={index}>
            <div className="faq-question" onClick={() => toggleAnswer(index)} style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>{faq.question}</span>
              <button
                className={`faq-arrow ${openIndex === index ? 'open' : 'closed'}`}
                aria-label={openIndex === index ? "Collapse answer" : "Expand answer"}
                style={{
                  fontSize: '0.8rem',
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  marginLeft: '0.5rem',
                  cursor: 'pointer',
                  color: 'inherit',
                  userSelect: 'none',
                  outline: 'none',
                  transition: 'transform 0.3s ease',
                  transform: openIndex === index ? 'rotate(0deg)' : 'rotate(180deg)',
                }}
              >
                ^
              </button>
            </div>
            {openIndex === index && <div className="faq-answer" style={{ marginTop: '0.5rem', color: '#000000' }}>{faq.answer}</div>}
          </div>
        ))}
      </div>
    </div>
  );
};


export default DentalFAQ;

