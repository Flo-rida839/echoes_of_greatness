import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getArticles } from '../utils/api';
import Navbar from './Navbar'
import '../styles/home.css';

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
      console.error('Failed to fetch articles:', err);
      if (retryCount < maxRetries) {
        setTimeout(() => {
          setRetryCount(retryCount + 1);
          fetchArticles();
        }, 2000 * (retryCount + 1));
        setError(`Retrying... (Attempt ${retryCount + 2}/${maxRetries})`);
      } else {
        setError('Failed to connect to the archive. Please check your connection or try again later.');
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
      <div className="flex flex-col items-center justify-center min-h-screen bg-parchment text-amber-900">
        <h3 className="text-2xl font-serif font-bold mb-4">Unrolling the Archive...</h3>
        <div className="scribe-animation animate-spin text-4xl">📜</div>
        <p className="mt-4 text-lg font-serif">"Gathering tales from the ages..."</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-parchment text-amber-900">
        <h3 className="text-2xl font-serif font-bold mb-4">Archive Access Failed</h3>
        <p className="mb-6 text-lg font-serif">{error}</p>
        <button
          onClick={() => {
            setLoading(true);
            setRetryCount(0);
            fetchArticles();
          }}
          className="px-6 py-2 bg-amber-800 text-white font-serif rounded hover:bg-amber-700 transition-transform transform hover:scale-105"
        >
          Retry Now
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-parchment text-amber-900 py-8">
      <Navbar />
      <h1 className="text-4xl font-serif font-bold text-center mb-8 elegant-drop-shadow">
        Historical Archive
      </h1>
      <div className="article-grid container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {articles.length === 0 ? (
          <div className="col-span-full text-center py-8">
            <p className="text-lg font-serif text-amber-900">
              No scrolls found in the archive.
            </p>
          </div>
        ) : (
          articles.map((article, index) => (
            <Link
              key={article.id}
              to={`/article/${article.id}`}
              className="article-card-link"
              aria-label={`Read more about ${article.title}`}
            >
              <div
                className="article-card bg-white bg-opacity-80 backdrop-blur-sm rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {article.image_url && (
                  <img
                    src={article.image_url.startsWith('http') ? article.image_url : `/images/${article.image_url}`}
                    alt={article.title}
                    className="card-image w-full h-48 object-cover rounded-t-lg"
                  />
                )}
                <div className="card-content p-4">
                  <h2 className="card-title text-xl font-serif font-semibold mb-2">{article.title}</h2>
                  <p className="card-era text-sm text-amber-700 mb-2">{article.era} Era</p>
                  <p className="card-excerpt text-gray-600">
                    {article.content.length > 120
                      ? `${article.content.slice(0, 120)}...`
                      : article.content}
                  </p>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;