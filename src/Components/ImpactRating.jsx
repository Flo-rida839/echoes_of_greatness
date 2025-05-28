// src/ImpactRating.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../Context/Authcontext';
import { getRatings, postRating } from '../utils/api';
import '../styles/ImpactRating.css';

function ImpactRating({ articleId }) {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [averageRating, setAverageRating] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);
  const [userRating, setUserRating] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchRatings() {
      try {
        const data = await getRatings(articleId);
        setAverageRating(data.average || 0);
        setRatingCount(data.count || 0);
        setUserRating(data.user_rating || null);
        setRating(data.user_rating || 0);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to load ratings');
      }
    }
    fetchRatings();
  }, [articleId]);

  const handleRating = async (newRating) => {
    if (!user) {
      setError('Please log in to submit a rating');
      return;
    }
    try {
      await postRating(articleId, newRating);
      setRating(newRating);
      setUserRating(newRating);
      setSubmitted(true);
      setError('');
      setTimeout(() => setSubmitted(false), 3000);
      // Refresh ratings
      const data = await getRatings(articleId);
      setAverageRating(data.average || 0);
      setRatingCount(data.count || 0);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit rating');
    }
  };

  return (
    <section className="impact-rating">
      <h2>Rate This Figure's Historical Impact</h2>
      {error && <p className="text-red-600 text-center mb-4">{error}</p>}
      <div className="rating-container">
        <div className="stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              className={`star ${star <= (hover || rating) ? 'active' : ''}`}
              onClick={() => handleRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(rating)}
              disabled={!user}
            >
              ★
            </button>
          ))}
        </div>
        <div className="rating-info">
          <p>Average Rating: {averageRating.toFixed(1)} ★ ({ratingCount} ratings)</p>
          {userRating && <p>Your Rating: {userRating} ★</p>}
          {submitted && <p className="thank-you">Thank you for your rating!</p>}
        </div>
      </div>
    </section>
  );
}

export default ImpactRating;