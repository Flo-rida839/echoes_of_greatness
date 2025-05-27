import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/carousel.css';

function ArticleCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const articles = [
    {
      id: 3,
      title: "Marie Curie: Pioneer of Radioactivity",
      excerpt: "The story of the first woman to win a Nobel Prize",
      image: "Marie-curie.jpg"
    },
    {
      id: 4,
      title: "Genghis Khan: The Mongol Conqueror",
      excerpt: "How he built the largest contiguous empire in history",
      image: "Genghis.jpg"
    },
    {
      id: 5,
      title: "Joan of Arc: The Maid of Orléans",
      excerpt: "A peasant girl who changed the course of the Hundred Years' War",
      image: "Joanofarc.jpeg"
    }
  ];

  // ... carousel navigation logic

  return (
    <div className="carousel">
      {articles.map((article, index) => (
        <div 
          key={article.id}
          className={`slide ${index === currentIndex ? 'active' : ''}`}
        >
          <img
            src={`${process.env.PUBLIC_URL}/images/${article.image}`}
            alt={article.title}
            className="carousel-image"
          />
          <div className="slide-content">
            <h3>{article.title}</h3>
            <p>{article.excerpt}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
export default ArticleCarousel;