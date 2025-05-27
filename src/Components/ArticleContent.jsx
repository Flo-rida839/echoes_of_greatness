import '../styles/article-content.css';

function ArticleContent({ article }) {
  return (
    <article className="article-content">
      <header>
        <span className="era-badge">{article.era}</span>
        <h1>{article.title}</h1>
        <div className="article-image">
          <img src={`/images/${article.image}`} alt={article.title} />
          <p className="caption">Portrait of {article.title.split(':')[0]}</p>
        </div>
      </header>
      
      <div className="article-body">
        {article.content.split('\n').map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
      
      <div className="article-meta">
        <p>Published on: {new Date().toLocaleDateString()}</p>
      </div>
    </article>
  );
}

export default ArticleContent;