import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ArticleContent from './ArticleContent';
import Reflections from './Reflections';
import ImpactRating from './ImpactRating';
import BuildLegacy from './BuildLegacy';
import CommentsSection from './CommentsSection';
import Sidebar from './Sidebar';
import '../styles/article.css';

function Article() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setArticle({
        id: id,
        title: "Leonardo da Vinci: The Renaissance Polymath",
        content: "Detailed article content here...",
        image: "da-vinci.jpg",
        era: "Renaissance",
        timeline: [
          { year: "1452", event: "Born in Vinci, Italy" },
          { year: "1482", event: "Began working for Ludovico Sforza in Milan" }
        ],
        relatedFigures: [
          { id: 5, name: "Michelangelo" },
          { id: 6, name: "Raphael" }
        ]
      });
      setLoading(false);
    }, 800);
  }, [id]);

  if (loading) return <div className="loading">Loading Article...</div>;

  return (
    <div className="article-page">
      <div className="article-main">
        <ArticleContent article={article} />
        
        <div className="engagement-sections">
          <Reflections />
          <ImpactRating articleId={id} />
          <BuildLegacy articleId={id} />
          <CommentsSection articleId={id} />
        </div>
      </div>
      
      <Sidebar article={article} />
    </div>
  );
}

export default Article;