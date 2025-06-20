import React, { useState } from 'react'

const StarRating = ({ maxStars=5, onChange, initialRating=0, readOnly=false }) => {

    const [rating, setRating] = useState(initialRating);
    const [hoverRating, setHoverRating] = useState(0);

    const handleClick = (value) => {
        if(readOnly) return;
        setRating(value);
        onChange && onChange(value);
    }

  return (
    <>
    <div
    style={{ display: "inline-flex", gap: 4, cursor: readOnly ? "default" : "pointer" }}
    >
        {[...Array(maxStars)].map((_, i) => {
            const starValue = i + 1;
            const filled = hoverRating ? starValue <= hoverRating : starValue <= rating;

            return (
                <>
                <svg
                    key={starValue}
                    onClick={() => handleClick(starValue)}
                    onMouseEnter={() => !readOnly && setHoverRating(starValue)}
                    onMouseLeave={() => !readOnly && setHoverRating(0)}
                     width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill={filled ? "gold" : "lightgray"}
                    stroke="gray"
                    strokeWidth="1"
                    style={{ cursor: readOnly ? "default" : "pointer" }}
                    aria-hidden="true"
                >
                    <path d="M12 2 L15 9 L22 9 L16 14 L18 21 L12 17 L6 21 L8 14 L2 9 L9 9 Z" /> 
                </svg>
                </>
            );
        })}
    </div>
    </>
  )
}

export default StarRating