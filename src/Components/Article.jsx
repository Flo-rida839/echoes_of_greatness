import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ArticleContent from './ArticleContent';
import '../styles/article.css';
import { getArticleById } from './utils/api';


function Article() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await getArticleById(id);
        setArticle(data);
      } catch (error) {
        console.error("Failed to fetch article:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container">
        <p className="loading-text">Loading article...</p>
        <div className="loader" />
      </div>
    );
  }

  return (
    <div className={`article-page ${article.era}`}>
      <main className="article-main">
        <header className="article-header">
          <h1 className="article-title">{article.title}</h1>
          <span className="era-tag">{article.era} Era</span>
        </header>

        <ArticleContent article={article} />

        <section className="timeline-section">
          <h2 className="timeline-title">Timeline of Events</h2>
          <div className="timeline">
            {article.timeline.map((item, index) => (
              <div key={index} className="timeline-item">
                <span className="year">{item.year}</span>
                <span className="event">{item.event}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Article;
