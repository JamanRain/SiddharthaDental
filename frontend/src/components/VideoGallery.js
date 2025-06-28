import React, { useState, useRef } from 'react';


const videos = [
  { id: 'enQA5CEAwqc', title: 'The Best In The City' },
  { id: 'EpWHyEsgClA', title: 'Braces Treatment' },
  { id: 'r-FUraoqSuE', title: 'Front Tooth Treatment' },
  { id: 'NMlTElaXA1k', title: 'Aligners Treatment' },
  { id: 'i1q4zBQ_wc4', title: 'Teeth Correction Without Braces' },
  { id: 'vRar2L-68Xs', title: 'Live Braces Removal' },
  { id: '1DuWBzjNJx0', title: 'Best Implant Centre' },
   { id: 'BuI6Oi1qa9Q', title: 'Smile designing' }, 
];

const VideoGallery = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = current.offsetWidth / 1.2;
      current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="video-gallery-container">
      <h2>Watch Our YouTube Videos</h2>

      <div className="video-scroll-wrapper">
        <button className="arrow left" onClick={() => scroll('left')}>{'‹'}</button>

        <div className="video-thumbnails" ref={scrollRef}>
          {videos.map((video) => (
            <div key={video.id} className="thumbnail" onClick={() => setSelectedVideo(video.id)}>
              <img src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`} alt={video.title} />
              <p>{video.title}</p>
            </div>
          ))}
        </div>

        <button className="arrow right" onClick={() => scroll('right')}>{'›'}</button>
      </div>

      {/* Modal */}
      {selectedVideo && (
        <div className="modal-overlay" onClick={() => setSelectedVideo(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
              title="YouTube video"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
            <button className="close-btn" onClick={() => setSelectedVideo(null)}>×</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoGallery;
