import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getArticles } from '../utils/api';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import '../styles/home.css';

// Mock data for testing
const mockArticles = [
  {
    id: 1,
    title: 'Fall of Rome',
    era: 'Ancient',
    content: 'The Western Roman Empire fell in 476 AD, marking the end of antiquity...',
    image_url: 'https://via.placeholder.com/300x180',
    timeline: [
      { year: '476 AD', event: 'Fall of the Western Roman Empire' },
      { year: '410 AD', event: 'Sack of Rome by Visigoths' },
    ],
    relatedFigures: [
      { id: 2, name: 'Romulus Augustulus' },
      { id: 3, name: 'Alaric I' },
    ],
  },
  {
    id: 2,
    title: 'Renaissance Art',
    era: 'Renaissance',
    content: 'The Renaissance brought a revival of art and culture in Europe...',
    image_url: 'https://via.placeholder.com/300x180',
    timeline: [
      { year: '1503', event: 'Mona Lisa painted by Leonardo' },
    ],
    relatedFigures: [
      { id: 4, name: 'Leonardo da Vinci' },
    ],
  },
];

function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const maxRetries = 3;

  const fetchArticles = async () => {
    try {
      const data = await getArticles();
      setArticles(data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch Chronicles:', err);
      if (retryCount < maxRetries) {
        setTimeout(() => {
          setRetryCount(retryCount + 1);
          fetchArticles();
        }, 2000 * (retryCount + 1));
        setError(`Scribing anew... (Attempt ${retryCount + 2}/${maxRetries})`);
      } else {
        // Fallback to mock data
        setArticles(mockArticles);
        setError(null);
        // Optionally keep error: setError('The ancient tomes could not be retrieved. Using local scrolls.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-parchment d-flex flex-column align-items-center justify-content-center text-amber-900">
        <h3 className="display-6 font-cinzel fw-bold mb-4 elegant-drop-shadow">
          Unfurling the Chronicles...
        </h3>
        <img
          src="https://danamartist.tumblr.com/post/612044507355250688/another-gif-attempt-flickering-candle-making/amp"
          alt="Flickering candle"
          className="candle-gif mb-3"
          onError={(e) => (e.target.src = 'https://i.ibb.co/c2qY8zv/candle.png')}
        />
        <p className="fs-5 font-noto">"Weaving tales from the annals of time..."</p>
      </div>
    );
  }

  if (error && articles.length === 0) {
    return (
      <div className="min-h-screen bg-parchment d-flex flex-column align-items-center justify-content-center text-amber-900">
        <h3 className="display-6 font-cinzel fw-bold mb-4 elegant-drop-shadow">
          The Archive Lies Silent
        </h3>
        <i className="fas fa-book-dead fa-3x mb-3"></i>
        <p className="fs-5 font-noto mb-4">{error}</p>
        <button
          onClick={() => {
            setLoading(true);
            setRetryCount(0);
            fetchArticles();
          }}
          className="btn btn-amber btn-lg font-noto text-white shadow-sm hover-scale"
        >
          Seek the Tomes Anew
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-parchment text-amber-900 py-5">
      <Navbar />
      <header className="text-center mb-5 position-relative">
        <div className="header-doodle"></div>
        <h1 className="display-4 font-cinzel fw-bold elegant-drop-shadow">
          Chronicles of Antiquity
        </h1>
        <p className="fs-5 font-noto text-amber-800 mt-2">
          Behold the sacred scrolls of history, preserved for eternity.
        </p>
      </header>
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <section className="article-section bg-parchment-light border-parchment rounded-3 shadow-sm py-4 px-3 mb-4">
              <h2 className="fs-3 font-cinzel fw-bold text-center mb-4 elegant-drop-shadow">
                Ancient Tomes
              </h2>
              <div className="row row-cols-1 row-cols-md-2 g-4">
                {articles.length === 0 ? (
                  <div className="col-12 text-center py-5">
                    <i className="fas fa-scroll fa-2x mb-3 text-amber-800"></i>
                    <p className="fs-5 font-noto text-amber-900">
                      No sacred scrolls reside in the archive at this hour.
                    </p>
                  </div>
                ) : (
                  articles.map((article, index) => (
                    <div className="col" key={article.id}>
                      <Link
                        to={`/article/${article.id}`}
                        className="text-decoration-none text-amber-900 article-card-link"
                        aria-label={`Peruse ${article.title}`}
                      >
                        <div
                          className="card article-card h-100 border-0 shadow-sm bg-white bg-opacity-75"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          {article.image_url && (
                            <img
                              src={
                                article.image_url.startsWith('http')
                                  ? article.image_url
                                  : `/images/${article.image_url}`
                              }
                              alt={article.title}
                              className="card-img-top"
                            />
                          )}
                          <div className="card-body p-3 position-relative">
                            <div className="card-doodle"></div>
                            <h3 className="card-title fs-5 font-cinzel fw-semibold mb-2">
                              {article.title}
                            </h3>
                            <p className="card-era fs-6 font-noto text-amber-700 mb-2">
                              {article.era} Era
                            </p>
                            <p className="card-excerpt fs-6 font-noto text-gray-600">
                              {article.content.length > 120
                                ? `${article.content.slice(0, 120)}...`
                                : article.content}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>
          <div className="col-lg-4 d-none d-lg-block">
            <Sidebar article={articles[0] || {}} />
          </div>
          <div className="col-12 d-lg-none">
            <div className="accordion" id="sidebarAccordion">
              <div className="accordion-item bg-parchment-light border-parchment">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button font-cinzel text-amber-900"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#sidebarCollapse"
                    aria-expanded="false"
                    aria-controls="sidebarCollapse"
                  >
                    Historical Insights
                  </button>
                </h2>
                <div
                  id="sidebarCollapse"
                  className="accordion-body collapse"
                >
                  <Sidebar article={articles[0] || {}} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer text-center">
        <img
          src="https://tenor.com/search/flipping-pages-gifs"
          alt="Turning book pages"
          className="book-gif mb-3"
          onError={(e) => (e.target.src = 'https://i.ibb.co/5Y0Z7pS/book.png')}
        />
        <p className="font-noto mb-2">
          © {new Date().getFullYear()} Chronicles of Antiquity. All rights reserved.
        </p>
        <div className="footer-links">
          <Link to="/about" className="font-noto mx-2">About</Link>
          <Link to="/contact" className="font-noto mx-2">Contact</Link>
          <Link to="/privacy" className="font-noto mx-2">Privacy</Link>
        </div>
      </footer>
    </div>
  );
}

export default Home;