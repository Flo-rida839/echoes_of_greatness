// src/Reflections.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../Context/Authcontext';
import { getReflections, postReflection } from '../utils/api';
import { Link } from 'react-router-dom';
import '../styles/reflections.css';

function Reflections({ articleId }) {
  const { user } = useAuth();
  const [reflections, setReflections] = useState([]);
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReflections() {
      setLoading(true);
      try {
        const data = await getReflections(articleId);
        setReflections(data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to load reflections');
      } finally {
        setLoading(false);
      }
    }
    fetchReflections();
  }, [articleId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError('Please log in to post a reflection');
      return;
    }
    if (!content.trim()) {
      setError('Reflection content cannot be empty');
      return;
    }
    try {
      await postReflection(articleId, content);
      setContent('');
      setError('');
      const data = await getReflections(articleId);
      setReflections(data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to post reflection');
    }
  };

  if (loading) {
    return <p>Loading reflections...</p>;
  }

  return (
    <section className="reflections-section">
      <h2>Share Your Reflections</h2>
      {error && <p className="text-red-600 text-center mb-4">{error}</p>}
      {user ? (
        <form onSubmit={handleSubmit} className="reflection-form">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Reflect on this historical figure..."
            className="w-full p-3 rounded-xl border-2 border-[#d6b760] bg-[#fff9e6]"
          />
          <button
            type="submit"
            className="bg-[#9c7b3e] text-white font-semibold py-2 px-4 rounded-xl hover:bg-[#b08948] transition duration-300"
          >
            Submit Reflection
          </button>
        </form>
      ) : (
        <p>Please <Link to="/login" className="underline">log in</Link> to share a reflection</p>
      )}
      <div className="reflections-list">
        {reflections.length > 0 ? (
          reflections.map((reflection) => (
            <div key={reflection.id} className="reflection">
              <p><strong>{reflection.username}</strong> ({new Date(reflection.created_at).toLocaleDateString()})</p>
              <p>{reflection.content}</p>
            </div>
          ))
        ) : (
          <p>No reflections yet. Be the first to share!</p>
        )}
      </div>
    </section>
  );
}

export default Reflections;