import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ArticleContent from './ArticleContent';
import Reflections from './Reflections';
import ImpactRating from './starRating';
import BuildLegacy from './BuildLegacy';
import CommentsSection from './CommentsSection';
import Sidebar from './Sidebar';
import { useAuth } from '../context/AuthContext';
import '../styles/article.css';
import '../styles/starRating.css';

function Article() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inkDry, setInkDry] = useState(false);
  const { currentUser, logout, api } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await api.get(`/articles/${id}`);
        setArticle(response.data);
        setTimeout(() => setInkDry(true), 500);
      } catch (error) {
        console.error('Error fetching article:', error);
        navigate('/not-found');
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id, api, navigate]);

  if (loading) return (
    <div className="loading ancient-parchment">
      <h3>Summoning Historical Spirits...</h3>
      <div className="scribe-animation">✍️</div>
      <p className="loading-quote">"Rome wasn't loaded in a day!"</p>
    </div>
  );

  const StarRating = ({ rating, onRate }) => {
    return (
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${rating >= star ? 'active' : ''}`}
            onClick={() => onRate(star)}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  const handleRating = async (rating) => {
    try {
      await api.post(`/articles/${id}/rating`, { rating });
      alert('Rating submitted!');
    } catch (error) {
      alert('Failed to submit rating.');
    }
  };

  return (
    <div className="article-wrapper" style={{ backgroundImage: "url('/images/parchment-bg.jpg')", backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
      <nav className="navbar parchment-header">
        <h2 className="nav-title fancy-font">The Grand Archive</h2>
        <div className="nav-links">
          {currentUser ? (
            <>
              <span className="nav-user">🧙‍♂️ {currentUser.name}</span>
              <button className="nav-btn" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-btn">Login</Link>
              <Link to="/signup" className="nav-btn">Join Guild</Link>
            </>
          )}
        </div>
      </nav>

      <div className={`article-page ${inkDry ? 'ink-dry' : ''}`}>
        <div className="article-main ancient-scroll">
          <div className="historical-header">
            <h1 className="illuminated-title elegant-drop-shadow">{article.title}</h1>
            <p className="era-badge medieval-flair">{article.era} Era</p>
          </div>

          <ArticleContent article={article} />

          <div className="engagement-sections">
            <div className="section-header">
              <h2><span className="first-letter">T</span>ime Traveler's Forum</h2>
              <p className="section-subtitle">"What would Leo tweet? Probably something genius..."</p>
            </div>

            <StarRating rating={article.userRating || 0} onRate={handleRating} />

            <Reflections />
            <ImpactRating articleId={id} />
            <BuildLegacy articleId={id} />
            <CommentsSection articleId={id} />
          </div>
        </div>

        <Sidebar article={article} />

        <div className="historical-footer">
          <p>This digital manuscript was prepared by the Guild of Code Scribes</p>
          <div className="seal-of-approval">⚜️</div>
        </div>
      </div>
    </div>
  );
}

export default Article;
