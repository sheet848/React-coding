import React, { useState } from 'react'

const LikeButton = ({ initialCount = 0, initiallyLiked = false }) => {

    const [liked, setLiked] =  useState(initiallyLiked);
    const [count, setCount] = useState(initialCount);
    const [loading, setLoading] = useState(false);

    const toggleLike = async() => {
        if (loading) return;

        setLoading(true);
        setLiked(!liked);
        setCount((prev) => (liked ? prev-1 : prev + 1));

        try {
            await new Promise((r) => setTimeout(r, 500));
        } catch(e) {
            setLiked(liked);
            setCount((prev) => (liked ? prev + 1 : prev - 1));
        } finally {
            setLoading(false);
        }
    }

  return (
    <>
    <button
        onClick={toggleLike}
        disabled={loading}
        className={liked ? "redBG" : "whiteBG"}>
        <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill={liked ? "currentColor" : "none"}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 15l7-7 7 7"
        />
      </svg>
      <span>{count}</span>
    </button>
    </>
  )
}

export default LikeButton