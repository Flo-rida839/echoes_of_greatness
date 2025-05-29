import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/sidebar.css';

function Sidebar({ article }) {
  const [currentIconIndex, setCurrentIconIndex] = useState(0);

  const historicalIcons = [
    {
      name: 'Leonardo da Vinci',
      funFact: 'Leonardo wrote backwards in his notebooks, a technique known as mirror writing, possibly to keep his ideas secret.',
      saying: 'Learning never exhausts the mind.'
    },
    {
      name: 'Joan of Arc',
      funFact: 'Joan, a peasant girl, led the French army to victory at Orléans at age 17, guided by divine visions.',
      saying: 'I am not afraid; I was born to do this.'
    },
    {
      name: 'Niccolò Machiavelli',
      funFact: 'Machiavelli wrote "The Prince" while exiled, drawing from his observations of ruthless political strategies.',
      saying: 'It is better to be feared than loved, if you cannot be both.'
    },
    {
      name: 'William Shakespeare',
      funFact: 'Shakespeare invented over 1,700 words, including "lonely," "generous," and "obscene."',
      saying: 'All the world’s a stage, and all the men and women merely players.'
    },
    {
      name: 'Maya Angelou',
      funFact: 'Maya Angelou was mute for five years as a child, during which she developed her love for literature.',
      saying: 'You may not control all the events that happen to you, but you can decide not to be reduced by them.'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIconIndex((prevIndex) => (prevIndex + 1) % historicalIcons.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <aside className="sidebar bg-parchment-light border-parchment p-3 rounded-3 shadow-sm">
      <div className="sidebar-section mb-4">
        <h3 className="fs-5 font-cinzel fw-bold text-amber-900 elegant-drop-shadow mb-3">
          <i className="fas fa-scroll me-2"></i>Timeline of Events
        </h3>
        <ul className="timeline list-unstyled">
          {article?.timeline?.map((item, index) => (
            <li key={index} className="timeline-item mb-2 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <span className="year font-noto fw-bold text-amber-800">{item.year}</span>
              <span className="event font-noto text-amber-900 ms-2">{item.event}</span>
            </li>
          )) || (
            <li className="font-noto text-amber-900">No timeline events available.</li>
          )}
        </ul>
      </div>

      <div className="sidebar-section mb-4">
        <h3 className="fs-5 font-cinzel fw-bold text-amber-900 elegant-drop-shadow mb-3">
          <i className="fas fa-users me-2"></i>Related Figures
        </h3>
        <ul className="related-figures list-unstyled">
          {article?.relatedFigures?.map((figure) => (
            <li key={figure.id} className="mb-1">
              <Link
                to={`/article/${figure.id}`}
                className="text-decoration-none font-noto text-amber-900 hover:text-amber-700"
              >
                {figure.name}
              </Link>
            </li>
          )) || (
            <li className="font-noto text-amber-900">No related figures found.</li>
          )}
        </ul>
      </div>

      <div className="sidebar-section mb-4">
        <h3 className="fs-5 font-cinzel fw-bold text-amber-900 elegant-drop-shadow mb-3">
          <i className="fas fa-book-open me-2"></i>Did You Know?
        </h3>
        <div className="position-relative">
          <img
            src="https://www.svgrepo.com/download/509107/writing.svg"
            alt="Scribe writing"
            className="scribe-cartoon mb-2"
          />
          <p className="fun-fact font-noto text-amber-900 animate-fade-in">
            {historicalIcons[currentIconIndex].funFact}
          </p>
        </div>
      </div>

      <div className="sidebar-section">
        <h3 className="fs-5 font-cinzel fw-bold text-amber-900 elegant-drop-shadow mb-3">
          <i className="fas fa-quote-left me-2"></i>Famous Sayings
        </h3>
        <blockquote className="saying font-noto text-amber-900 animate-fade-in">
          <p className="mb-1">"{historicalIcons[currentIconIndex].saying}"</p>
          <footer className="blockquote-footer text-amber-800">
            — {historicalIcons[currentIconIndex].name}
          </footer>
        </blockquote>
      </div>
    </aside>
  );
}

export default Sidebar;