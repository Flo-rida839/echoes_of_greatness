import { Link } from 'react-router-dom';
import '../styles/featured-article.css';

function FeaturedArticle({ article }) {
  return (
    <div className="featured-article">
      <div className="article-image">
        <img 
          src={article.image}  // Now using the full path passed from Home
          alt={article.title}
        />
      </div>
      <div className="article-content">
        <span className="era-badge">{article.era}</span>
        <h3>{article.title}</h3>
        <p>{article.excerpt}</p>
        <Link to={`/article/${article.id}`} className="read-more">
          Read More
        </Link>
      </div>
    </div>
  );
}

export default FeaturedArticle;