import React, { useCallback, useEffect, useState } from 'react'

const images = [
    { src: "https://via.placeholder.com/600x300?text=Slide+1", alt: "Slide 1"},
    { src: "https://via.placeholder.com/600x300?text=Slide+2", alt: "Slide 2"},
    { src: "https://via.placeholder.com/600x300?text=Slide+3", alt: "Slide 3"},
];

const Carousel = ({ autoSlide = true, interval = 3000 }) => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const totalSlides = images.length;

    const goToNext = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, [totalSlides]);

    const goToPrev = useCallback(() => {
        setCurrentIndex((prev) => (prev -1 + totalSlides) % totalSlides);
    }, [totalSlides]);

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    useEffect(() => {
        if(!autoSlide) return;
        const id = setInterval(goToNext, interval);
        return () => clearInterval(id);
    }, [goToNext, interval, autoSlide]);

  return (
    <>
    <div>
        {/* Slide */}
        <div>
            <img src={images[currentIndex].src} 
                alt={images[currentIndex].alt} />
        </div>

        {/* Navigation Buttons */}
        <button onClick={goToPrev}>Left</button>
        <button onClick={goToNext}>Right</button>

        {/* Dots */}
        <div>
            {
                images.map((_, idx) => (
                    <button key={idx} onClick={() => goToSlide(idx)}></button>
                ))
            }
        </div>
    </div>
    </>
  )
}

export default Carousel