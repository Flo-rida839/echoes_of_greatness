import React from 'react';
import { Link } from 'react-router-dom';
import'../styles/themes.css'; // We'll create this CSS file next

// Sample theme data (you can replace with API calls later)
const themesData = [
  {
    id: 1,
    title: "Revolutionary Leaders",
    description: "Figures who changed the course of history through political upheaval",
    image: "revolution.jpg",
    figures: [
      { id: 101, name: "Simón Bolívar" },
      { id: 102, name: "George Washington" },
      { id: 103, name: "Mahatma Gandhi" }
    ]
  },
  {
    id: 2,
    title: "Scientific Pioneers",
    description: "Innovators who transformed our understanding of the world",
    image: "science.jpg",
    figures: [
      { id: 201, name: "Marie Curie" },
      { id: 202, name: "Albert Einstein" },
      { id: 203, name: "Isaac Newton" }
    ]
  },
  {
    id: 3,
    title: "Artistic Visionaries",
    description: "Creators who redefined cultural expression",
    image: "art.jpg",
    figures: [
      { id: 301, name: "Leonardo da Vinci" },
      { id: 302, name: "Frida Kahlo" },
      { id: 303, name: "William Shakespeare" }
    ]
  }
];

const Themes = () => {
  return (
    <div className="themes-container">
      <h1 className="themes-title">Historical Themes</h1>
      <p className="themes-intro">
        Explore history through unifying themes that connect figures across time and geography.
      </p>
      
      <div className="themes-grid">
        {themesData.map((theme) => (
          <div key={theme.id} className="theme-card">
            <div className="theme-image-container">
              <img 
                src={`/images/themes/${theme.image}`} 
                alt={theme.title}
                className="theme-image"
              />
            </div>
            <div className="theme-content">
              <h2>{theme.title}</h2>
              <p>{theme.description}</p>
              
              <div className="theme-figures">
                <h3>Key Figures:</h3>
                <ul>
                  {theme.figures.map((figure) => (
                    <li key={figure.id}>
                      <Link to={`/article/${figure.id}`}>{figure.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              <Link to={`/theme/${theme.id}`} className="explore-button">
                Explore Theme
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Themes;