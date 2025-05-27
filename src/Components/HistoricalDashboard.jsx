import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/HistoricalDashboard.css';

const HistoricalDashboard = () => {
  const [content, setContent] = useState([]);
  const [activeTheme, setActiveTheme] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate API call with merged data
    const fetchData = async () => {
      const data = [
        {
          id: 1,
          type: 'theme',
          title: "Revolutionary Leaders",
          description: "Figures who changed history through political upheaval",
          image: "revolution.jpg",
          items: [
            { id: 101, name: "Simón Bolívar", image: "bolivar.jpg" },
            { id: 102, name: "George Washington", image: "washington.jpg" },
            { id: 103, name: "Mahatma Gandhi", image: "gandhi.jpg" }
          ]
        },
        {
          id: 201,
          type: 'article',
          title: "Marie Curie: Pioneer of Radioactivity",
          image: "curie.jpg",
          era: "Modern",
          excerpt: "The first woman to win a Nobel Prize"
        },
        // Add more mixed content...
      ];
      setContent(data);
    };
    fetchData();
  }, []);

  const handleCardInteraction = (id) => {
    navigate(`/article/${id}`);
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="gradient-text">Historical Nexus</h1>
        <p className="header-subtitle">Where Themes and Figures Converge</p>
      </header>

      <div className="content-grid">
        {content.map((item) => (
          <div 
            key={item.id}
            className={`content-card ${item.type}-card`}
            onMouseEnter={() => setActiveTheme(item.id)}
            onMouseLeave={() => setActiveTheme(null)}
          >
            <div className="card-media">
              <img 
                src={`/images/${item.type}s/${item.image}`}
                alt={item.title}
                className="card-image"
              />
              <div className="card-overlay">
                {item.type === 'theme' ? (
                  <>
                    <h2 className="card-title">{item.title}</h2>
                    <p className="card-description">{item.description}</p>
                  </>
                ) : (
                  <div className="article-preview">
                    <span className="era-badge">{item.era}</span>
                    <h3>{item.title}</h3>
                  </div>
                )}
              </div>
            </div>

            <div className="card-content">
              {item.type === 'theme' ? (
                <>
                  <div className="theme-figures">
                    {item.items.map((figure) => (
                      <div 
                        key={figure.id}
                        className="figure-chip"
                        onClick={() => handleCardInteraction(figure.id)}
                      >
                        <img
                          src={`/images/figures/${figure.image}`}
                          alt={figure.name}
                          className="figure-thumbnail"
                        />
                        <span>{figure.name}</span>
                      </div>
                    ))}
                  </div>
                  <button className="explore-button">
                    Explore Timeline →
                  </button>
                </>
              ) : (
                <>
                  <p className="article-excerpt">{item.excerpt}</p>
                  <Link 
                    to={`/article/${item.id}`}
                    className="read-more-link"
                  >
                    Deep Dive ▸
                  </Link>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoricalDashboard;