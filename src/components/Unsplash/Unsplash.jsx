import React, { useEffect, useState,useRef } from 'react';
import axios from 'axios';
import './Unsplash.scss';

function UnsplashImages({ searchTerm }) {
  const [images, setImages] = useState([]);
  const imageSetsRef = useRef([]);

  useEffect(() => {
    if (searchTerm) {
      axios.get(`https://api.unsplash.com/search/photos`, {
        params: { query: searchTerm, per_page: 300 },
        headers: {
          Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`
        }
      }).then(response => {
        setImages(response.data.results);
      }).catch(error => {
        console.error("Error fetching images from Unsplash", error);
      });
    }
  }, [searchTerm]);

  const handleMouseEnter = () => {
    // Arrête l'animation pour chaque image-set
    imageSetsRef.current.forEach(el => {
      if (el) el.style.animationPlayState = 'paused';
    });
  };

  const handleMouseLeave = () => {
    // Reprend l'animation pour chaque image-set
    imageSetsRef.current.forEach(el => {
      if (el) el.style.animationPlayState = 'running';
    });
  };

  return (
    <div 
      className="unsplash image-gallery"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={el => imageSetsRef.current[0] = el} className="image-set">
        {images.map((image, index) => (
          <img key={`img1-${index}`} src={image.urls.small} alt={image.alt_description} />
        ))}
      </div>
      <div ref={el => imageSetsRef.current[1] = el} className="image-set">
        {images.map((image, index) => (
          <img key={`img2-${index}`} src={image.urls.small} alt={image.alt_description} />
        ))}
      </div>
    </div>
  );
}

export default UnsplashImages;
