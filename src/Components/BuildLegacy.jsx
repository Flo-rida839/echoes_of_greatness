import { useState } from 'react';
import '../styles/build-legacy.css';

function BuildLegacy({ articleId }) {
  const [link, setLink] = useState('');
  const [description, setDescription] = useState('');
  const [contributions, setContributions] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (link.trim() && description.trim()) {
      setContributions([...contributions, { link, description }]);
      setLink('');
      setDescription('');
    }
  };

  return (
    <section className="build-legacy">
      <h2>Build the Legacy</h2>
      <p>Share examples of how this figure's influence continues today</p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Related Link:</label>
          <input
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="https://example.com"
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="How does this link connect to the figure's legacy?"
            rows="3"
            required
          />
        </div>
        <button type="submit">Contribute</button>
      </form>
      
      {contributions.length > 0 && (
        <div className="contributions-list">
          <h3>Community Contributions</h3>
          <ul>
            {contributions.map((item, index) => (
              <li key={index}>
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  {item.description}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

export default BuildLegacy;