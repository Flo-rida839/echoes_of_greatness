import '../styles/sidebar.css';

function Sidebar({ article }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <h3>Timeline</h3>
        <ul className="timeline">
          {article.timeline.map((item, index) => (
            <li key={index}>
              <span className="year">{item.year}</span>
              <span className="event">{item.event}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="sidebar-section">
        <h3>Related Figures</h3>
        <ul className="related-figures">
          {article.relatedFigures.map((figure) => (
            <li key={figure.id}>
              <a href={`/article/${figure.id}`}>{figure.name}</a>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="sidebar-section">
        <h3>Did You Know?</h3>
        <p className="fun-fact">
          Leonardo wrote backwards in his notebooks, a technique known as mirror writing.
        </p>
      </div>
    </aside>
  );
}

export default Sidebar;