import { useState } from 'react';
import '../styles/reflections.css';

function Reflections() {
  const [reflection, setReflection] = useState('');
  const [submittedReflections, setSubmittedReflections] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (reflection.trim()) {
      setIsSubmitting(true);
      // Simulate processing delay
      setTimeout(() => {
        setSubmittedReflections([...submittedReflections, reflection]);
        setReflection('');
        setIsSubmitting(false);
      }, 500);
    }
  };

  return (
    <section className="reflections">
      <div className="reflections-header">
        <h2>Reflections & Connections</h2>
        <p className="subtitle">How does this historical figure's story resonate with you today?</p>
      </div>
      
      <form onSubmit={handleSubmit} className="reflection-form">
        <textarea
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          placeholder="Share your thoughts..."
          rows="5"
          className="reflection-input"
        />
        <button 
          type="submit" 
          className="submit-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sharing...' : 'Submit Reflection'}
          <span className="ink-effect"></span>
        </button>
      </form>
      
      {submittedReflections.length > 0 && (
        <div className="reflections-list">
          <h3 className="community-title">Community Reflections</h3>
          <ul>
            {submittedReflections.map((item, index) => (
              <li key={index} className="reflection-item">
                <div className="quote-icon">"</div>
                <p>{item}</p>
                <div className="reflection-meta">
                  <span className="timestamp">Just now</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

export default Reflections;