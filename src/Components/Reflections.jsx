import { useState } from 'react';
// import '../styles/reflections.css';

function Reflections() {
  const [reflection, setReflection] = useState('');
  const [submittedReflections, setSubmittedReflections] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (reflection.trim()) {
      setSubmittedReflections([...submittedReflections, reflection]);
      setReflection('');
    }
  };

  return (
    <section className="reflections">
      <h2>Reflections & Connections</h2>
      <p>How does this historical figure's story resonate with you today?</p>
      
      <form onSubmit={handleSubmit}>
        <textarea
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          placeholder="Share your thoughts..."
          rows="4"
        />
        <button type="submit">Submit Reflection</button>
      </form>
      
      {submittedReflections.length > 0 && (
        <div className="reflections-list">
          <h3>Community Reflections</h3>
          <ul>
            {submittedReflections.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

export default Reflections;