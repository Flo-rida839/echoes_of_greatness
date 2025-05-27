import React, { useState } from 'react';
import '../styles/starRating.css';


function ImpactRating({ articleId }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [averageRating, setAverageRating] = useState(4.2); // Would come from API

  const handleRating = (newRating) => {
    setRating(newRating);
    // In a real app, would send to backend
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="impact-rating">
      <h2>Rate This Figure's Historical Impact</h2>
      <div className="rating-container">
        <div className="stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              className={`star ${star <= (hover || rating) ? 'active' : ''}`}
              onClick={() => handleRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(rating)}
            >
              ★
            </button>
          ))}
        </div>
        <div className="rating-info">
          <p>Average Rating: {averageRating.toFixed(1)} ★ ({Math.floor(Math.random() * 500)} ratings)</p>
          {submitted && <p className="thank-you">Thank you for your rating!</p>}
        </div>
      </div>
    </section>
  );
}

export default ImpactRating;