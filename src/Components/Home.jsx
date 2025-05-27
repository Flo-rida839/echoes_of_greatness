import { useState, useEffect } from 'react';
import FeaturedArticle from './FeaturedArticle';
import ArticleCarousel from './ArticleCarousel';
import SearchBar from './SearchBar';
import '../styles/home.css';

function Home() {
  const [featuredArticles, setFeaturedArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch with local image paths
    setTimeout(() => {
      setFeaturedArticles([
        {
          title: "Leonardo da Vinci: The Renaissance Polymath",
          excerpt: "Exploring the many talents of history's greatest genius",
          image: "Leonardo.jpg", // Just the filename
          era: "Renaissance"
        },
        {
          title: "Cleopatra: The Last Pharaoh",
          excerpt: "The political strategies of Egypt's most famous queen",
          image: "cleopatra.jpg", // Just the filename
          era: "Ancient"
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h2>Discover the Legacies That Shaped Our World</h2>
          <p>Explore the lives of history's most influential figures and their enduring impact</p>
          <SearchBar />
        </div>
      </section>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          <section className="featured">
            <h2>Featured Articles</h2>
            <div className="featured-grid">
              {featuredArticles.map((article, index) => (
                <FeaturedArticle 
                  key={index} 
                  article={{
                    ...article,
                    // Add full public path here
                    image: `${process.env.PUBLIC_URL}/images/${article.image}`
                  }} 
                />
              ))}
            </div>
          </section>

          <ArticleCarousel />
        </>
      )}
    </div>
  );
}

export default Home;