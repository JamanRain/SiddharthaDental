import React from "react";
import clinic1 from "../assets/clinic1.jpg";
import clinic3 from "../assets/clinic3.jpg";
import clinic4 from "../assets/clinic4.jpg";
import clinic5 from "../assets/clinic5.jpg";
import clinic6 from "../assets/clinic6.jpg";
import clinic7 from "../assets/clinic7.jpg";
import clinic8 from "../assets/clinic8.jpg";
import clinic9 from "../assets/clinic9.jpg";
import clinic11 from "../assets/clinic11.jpg";
import clinic12 from "../assets/clinic12.jpg";
import clinic25 from "../assets/clinic25.jpeg";
import clinic26 from "../assets/clinic26.jpeg";

const photos1 = [
  { src: clinic26, alt: "Gallery photo 26" },
  { src: clinic3, alt: "Gallery photo 3" },
  { src: clinic4, alt: "Gallery photo 4" },
  { src: clinic5, alt: "Gallery photo 5" },
  { src: clinic6, alt: "Gallery photo 6" },
  { src: clinic1, alt: "Gallery photo 1" }
  
];

const photos2 = [
   { src: clinic11, alt: "Gallery photo 11" },
  { src: clinic12, alt: "Gallery photo 12" },
  { src: clinic7, alt: "Gallery photo 7" },
  { src: clinic8, alt: "Gallery photo 8" },
  { src: clinic9, alt: "Gallery photo 9" },
  { src: clinic25, alt: "Gallery photo 24" }
 

];

const PhotoGallery = () => {
  return (
    <section className="photo-gallery-section">
      <h2>Gallery</h2>

      {/* First gallery */}
      <div className="gallery-scroll-wrapper">
        {photos1.map((photo, index) => (
          <div
            className="gallery-item"
            key={`photo1-${index}`}
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            <img src={photo.src} alt={photo.alt} loading="lazy" />
          </div>
        ))}
      </div>

      {/* Second gallery */}
      <h2 style={{ marginTop: "3rem" }}></h2>
      <div className="gallery-scroll-wrapper">
        {photos2.map((photo, index) => (
          <div
            className="gallery-item"
            key={`photo2-${index}`}
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            <img src={photo.src} alt={photo.alt} loading="lazy" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default PhotoGallery;
