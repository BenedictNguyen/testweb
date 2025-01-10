import React, { useState, useEffect } from 'react';
import Photo1 from '../../assets/img/SPORT/img1.JPG';
import Photo2 from '../../assets/img/SPORT/img2.JPG';
import Photo3 from '../../assets/img/SPORT/img3.JPG';
import Photo4 from '../../assets/img/SPORT/img4.JPG';
import Photo5 from '../../assets/img/SPORT/img5.JPG';
import Photo6 from '../../assets/img/SPORT/img6.JPG';
import Photo7 from '../../assets/img/SPORT/img7.JPG';
import Photo8 from '../../assets/img/SPORT/img8.JPG';
import Photo9 from '../../assets/img/SPORT/img9.JPG';
import Photo10 from '../../assets/img/SPORT/img10.JPG';
import '../PhotoGallery/PhotoGallery.css';

const ImageGallery = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isForward, setIsForward] = useState(true);
  const images = [Photo1, Photo2, Photo3, Photo4, Photo5, Photo6, Photo7, Photo8, Photo9, Photo10];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        let newIndex;
        if (isForward) {
          newIndex = (prevIndex + 2) % images.length;
        } else {
          newIndex = (prevIndex - 2 + images.length) % images.length;
        }

        if (newIndex === 0 || newIndex === images.length - 1) {
          setIsForward(!isForward);
        }
        return newIndex;
      });
    }, 3000);

    return () => clearInterval(intervalId);
  }, [images.length, isForward]);

  return (
    <div className="photoGalleryContent">
      <h2 className="galleryTitle">Thư viện ảnh</h2>
      <div className="sliderContainer">
        <div className="imageSlider" style={{ transform: `translateX(-${(currentImageIndex * 100) / 5}%)` }}>
          {images.map((image, index) => (
            <div key={index} className="sliderItem">
              <img src={image} alt={`Image ${index + 1}`} className="sliderImage" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
