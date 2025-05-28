import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getAllArticles } from '../utils/api';
import '../styles/carousel.css';

function ArticleCarousel() {
  const [articles, setArticles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await getAllArticles();
        setArticles(data.slice(0, 5)); // limit to 5
      } catch (err) {
        console.error("Error fetching articles:", err);
      }
    };
    fetchArticles();
  }, []);

  const startProgress = () => {
    let time = 0;
    intervalRef.current = setInterval(() => {
      time += 100;
      setProgress((time / 5000) * 100);
      if (time >= 5000) {
        goToNext();
        time = 0;
      }
    }, 100);
  };

  useEffect(() => {
    if (articles.length > 0) {
      setProgress(0);
      clearInterval(intervalRef.current);
      startProgress();
    }
    return () => clearInterval(intervalRef.current);
  }, [currentIndex, articles]);

  const goToPrevious = () =>
    setCurrentIndex((prev) => (prev === 0 ? articles.length - 1 : prev - 1));

  const goToNext = () =>
    setCurrentIndex((prev) => (prev === articles.length - 1 ? 0 : prev + 1));

  const goToIndex = (index) => setCurrentIndex(index);

  if (articles.length === 0) return <p>Loading carousel...</p>;

  return (
    <div className="carousel-container">
      <div className="carousel">
        {articles.map((article, index) => (
          <div
            key={article.id}
            className={`slide ${index === currentIndex ? 'active' : ''}`}
          >
            <img
              src={
                article.image_url?.startsWith('http')
                  ? article.image_url
                  : `/images/${article.image_url || article.image}`
              }
              alt={article.title}
              className="carousel-image"
            />
            <div className="slide-content">
              <h3>{article.title}</h3>
              <p>{article.excerpt}</p>
              <Link to={`/articles/${article.id}`} className="read-more">
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>

      <button className="nav-button left" onClick={goToPrevious}>‹</button>
      <button className="nav-button right" onClick={goToNext}>›</button>

      <div className="carousel-dots">
        {articles.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default ArticleCarousel;
