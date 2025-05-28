// src/CommentsSection.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../Context/Authcontext';
import { getReflections, postReflection } from '../utils/api';
import { Link } from 'react-router-dom';
import '../styles/comments.css';

function CommentsSection({ articleId }) {
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
      // Refresh reflections
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
    <section className="comments-section">
      <h2>Join the Discussion</h2>
      {error && <p className="text-red-600 text-center mb-4">{error}</p>}
      <div className="comments-container">
        {user ? (
          <form onSubmit={handleSubmit} className="comment-form">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your reflection..."
              className="w-full p-3 rounded-xl border-2 border-[#d6b760] bg-[#fff9e6]"
            />
            <button
              type="submit"
              className="bg-[#9c7b3e] text-white font-semibold py-2 px-4 rounded-xl hover:bg-[#b08948] transition duration-300"
            >
              Post Reflection
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
      </div>
    </section>
  );
}

export default CommentsSection;