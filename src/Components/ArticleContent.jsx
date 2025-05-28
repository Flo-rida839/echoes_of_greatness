// src/ArticleContent.jsx
import '../styles/article-content.css';

function ArticleContent({ article }) {
  return (
    <article className="article-content">
      <header>
        <span className="era-badge">{article.era}</span>
        <h1>{article.title}</h1>
        {article.image_url && (
          <div className="article-image">
            <img
              src={article.image_url.startsWith('http') ? article.image_url : `/images/${article.image_url}`}
              alt={article.title}
              className="article-image"
            />
            <p className="caption">Portrait of {article.title.split(':')[0]}</p>
          </div>
        )}
      </header>

      <div className="article-body">
        {article.content.split('\n').map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

      <div className="article-meta">
        <p>Published on: {new Date(article.created_at).toLocaleDateString()}</p>
      </div>
    </article>
  );
}

export default ArticleContent;