import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';


import beforeImage from '../assets/RB.jpg';
import afterImage from '../assets/RA.jpg';

const reviews = [
  {
    name: "Rounak Agarwal",
    feedback: "I wanted to take a moment to express my deepest gratitude for the incredible transformation you've brought to my smile through the dental caps. Before coming to your practice, I was hesitant and somewhat self-conscious about my teeth. However, your expertise and gentle approach immediately put me at ease. From our initial consultation to the final fitting of the caps, every step of the process was handled with utmost professionalism and care. I am truly amazed by the results. Not only do my new dental caps look incredibly natural, but they have also restored my confidence in ways I never imagined possible. I find myself smiling more often, and the compliments I've received from friends and family are a testament to your skill and dedication. Beyond the aesthetic improvements, I appreciate your thorough explanations throughout the treatment, which helped me understand the procedures and feel comfortable throughout. Your patience and attention to detail are truly commendable. Thank you once again for your exceptional work and for making this experience so positive. I will gladly recommend your services to anyone seeking top-notch dental care.",
    beforeImage: beforeImage,
    afterImage: afterImage,
  },
  {
    name: "Bishal Rai",
    feedback: "I recently got a root canal treatment (RCT) done at Siddharth Dental Clinic by Dr. Siddharth Pincha, and I must say the experience was outstanding. From the very first consultation to the final procedure, Dr. Siddharth and his team were incredibly professional, skilled, and patient-friendly. He explained the entire process in detail, ensuring I was comfortable and well-informed at every step. The procedure itself was smooth and nearly painless, thanks to his expertise and gentle approach. The clinic is well-equipped with modern technology, maintaining high hygiene standards, which further added to my confidence in the treatment. What truly sets Dr. Siddharth apart is his dedication to patient care. He patiently addressed all my concerns and made sure I was comfortable throughout. The post-procedure care and follow-up were also commendable. If you are looking for a skilled and reliable dentist, I highly recommend Dr. Siddharth Pincha. His precision, professionalism, and compassionate approach make him one of the best in the field. I am extremely satisfied with my treatment and grateful for the excellent care I received",
  },
  {
    name: "Udipta Deka",
    feedback: "I have done Root Canal. Treatment at Siddhartha Dental Clinic and Implant Centre...The treatment procedure was very much easy comfortable painless and smooth..I m very happy to get treatment here....All the environment of the clinic is hygenic and clean..All staff of this clinic are good and polite...I m recommending u all to get the best dental treatment in Guwahati and North East India.....😊",
  },
  {
    name: "Ananya Das",
    feedback: " I hv done upper and lower wisdom teeth removal from Dr Siddhartha sir...Procedure was so smooth and painless and healing is also very smooth.. Previously I got fear to remove these wisdom teeth but Dr Siddhartha sir gave me that faith to remove these teeth...Now I m very glad that there is no pain... I m fully satisfied with this treatment...Environment of this clinic is also very friendly and clean...All stuff of this clinic is also very polite and friendly...Now I m recomending u all Dr Siddhartha Pincha sir to get the best treatment in Guwahati..."
  },
  
  {
    name: "Injamul Ali",
    feedback: "Dr. Siddhartha expertise and attention to detail are truly commendable. During my braces treatment, they took the time to listen to my concerns and thoroughly explain the treatment options available to me. His knowledge and clear communication instilled confidence in me. If you are looking for a dentist who will provide top-notch care in a welcoming environment, look no further than Dr Siddhartha and their wonderful team ."
  },
  { 
    name: "Shampi Ghosh",
    feedback: "I started my braces treatment a year ago and believe me the journey was amazing, initially I had to go through a little discomfort but with the passage of time it became comfortable, thanks to Siddharth Dental Clinic, now I can smile confidently without hesitation 🙂 U can come here for improving ur smile without a second thought."
  },
  {
    name: "Saharuk Choudhury",
    feedback: "The Doctor provided an excellent service. He was very careful and precise , showed absolute professionalism in his work.I got my Filling, RCT, Scaling done and the results are excellent. I am very pleased to have had this treatment from him and would trust him with further treatment."
  }
];

const CustomerReviews = () => {
  return (
    <section className="reviews-section">
      <h2>😊 What Our Patients Say</h2>
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        loop={true}
      >
        {reviews.map((review, idx) => (
          <SwiperSlide key={idx}>
            <div className="review-card">
              {review.beforeImage && review.afterImage && (
                <div className="review-images">
                  <div>
                    <img src={review.beforeImage} alt="Before treatment" className="review-image" />
                    <p className="image-caption">Before</p>
                  </div>
                  <div>
                    <img src={review.afterImage} alt="After treatment" className="review-image" />
                    <p className="image-caption">After</p>
                  </div>
                </div>
              )}
              <p className="review-text">"{review.feedback}"</p>
              <h4 className="review-name">- {review.name}</h4>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default CustomerReviews;

