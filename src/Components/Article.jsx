// src/Article.jsx
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ArticleContent from './ArticleContent';
import Reflections from './Reflections';
import ImpactRating from './ImpactRating';
import CommentsSection from './CommentsSection';
import { getArticleById } from '../utils/api';
import '../styles/article.css';

function Article() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchArticle() {
      setLoading(true);
      setError(null);
      try {
        const data = await getArticleById(id);
        setArticle(data);
      } catch (err) {
        console.error('Error fetching article:', err);
        setError(err.response?.data?.error || 'Failed to load article.');
      } finally {
        setLoading(false);
      }
    }
    if (id) {
      fetchArticle();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="loading ancient-parchment">
        <h3>Consulting the Oracle...</h3>
        <div className="scribe-animation">✍️</div>
        <p className="loading-quote">"The manuscript is still being inked..."</p>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="error ancient-parchment">
        <h3>Scroll Not Found</h3>
        <p>{error || "We couldn't locate this piece of history. Perhaps it was lost in time?"}</p>
        <Link to="/" className="nav-btn">Return to Archive</Link>
      </div>
    );
  }

  return (
    <div
      className="article-wrapper"
      style={{
        backgroundImage: "url('/images/parchment-bg.jpg')",
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
      }}
    >
      <main className={`article-page ancient-scroll ${article.era.toLowerCase()}`.replace(/\s/g, '-')}>
        <header className="article-header">
          <h1 className="illuminated-title elegant-drop-shadow">{article.title}</h1>
          <p className="era-badge medieval-flair">{article.era} Era</p>
          {article.image_url && (
            <img
              src={article.image_url.startsWith('http') ? article.image_url : `/images/${article.image_url}`}
              alt={article.title}
              className="article-feature-image"
            />
          )}
        </header>

        <ArticleContent article={article} />

        {article.timeline?.length > 0 && (
          <section className="timeline-section">
            <h2 className="timeline-title">Chronicle of Events</h2>
            <div className="timeline">
              {article.timeline.map((item, index) => (
                <div key={index} className="timeline-item">
                  <span className="year">{item.year}</span>
                  <span className="event">{item.event}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="engagement-section">
          <h2 className="timeline-title">Engage with the Scroll</h2>
          <ImpactRating articleId={id} />
          <Reflections articleId={id} />
          <CommentsSection articleId={id} />
        </section>
      </main>

      <div className="historical-footer">
        <p>This scroll has been transcribed by the Guild of Code Scribes</p>
        <div className="seal-of-approval">⚜️</div>
      </div>
    </div>
  );
}

export default Article;