import { useState, useEffect } from 'react';
import { useAuth } from '../Context/Authcontext';
import { Link, useNavigate } from 'react-router-dom';
import { googleLogin, githubLogin } from '../utils/api';
import '../styles/auth.css';

export default function SignupPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  // Handle OAuth callback
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const username = urlParams.get('username');
    const role = urlParams.get('role');
    if (token) {
      localStorage.setItem('token', token);
      setUser({ username, role: role || 'user', email: '' }); // Update context
      navigate('/');
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signup(formData);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to inscribe scroll');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    setError('');
    setLoading(true);
    try {
      if (provider === 'google') {
        googleLogin();
      } else if (provider === 'github') {
        githubLogin();
      }
    } catch (err) {
      setError(`Failed to login with ${provider}`);
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper ancient-parchment">
      <form onSubmit={handleSubmit} className="auth-form medieval-flair">
        <h1 className="illuminated-title elegant-drop-shadow">📜 Inscribe New Scroll</h1>
        {error && <p className="error-message">{error}</p>}
        
        <div className="form-group">
          <label htmlFor="username">Scribe's Mark (Username)</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Enter your unique mark"
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="first_name">Given Name</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleInputChange}
            placeholder="Your first name"
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="last_name">Family Name</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleInputChange}
            placeholder="Your family name"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Scroll of Contact (Email)</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Your email scroll"
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Sacred Key (Password)</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Your sacred key"
            className="form-input"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="auth-btn medieval-flair"
        >
          {loading ? 'Inscribing...' : '📝 Inscribe Scroll'}
        </button>

        <div className="social-login">
          <p className="divider">Or Inscribe with</p>
          <button
            type="button"
            onClick={() => handleSocialLogin('google')}
            disabled={loading}
            className="social-btn google-btn"
          >
            <svg className="social-icon" viewBox="0 0 24 24">
              <path d="M12.24 10.667V14.4h3.733c-.16 1.04-.693 1.893-1.373 2.573l2.24 1.733c1.36-1.28 2.133-3.093 2.133-5.306 0-.533-.053-1.067-.16-1.573H12.24z" fill="#4285F4"/>
              <path d="M12 20c2.667 0 4.933-.893 6.573-2.427l-2.24-1.733c-.906.64-2.133 1.013-3.333 1.013-2.56 0-4.733-1.733-5.493-4.067H4.48v2.027C6.107 17.867 8.907 20 12 20z" fill="#34A853"/>
              <path d="M6.507 13.067c-.187-.533-.293-1.093-.293-1.667s.107-1.133.293-1.667V7.707H4.48C4.027 8.8 3.8 10.067 3.8 11.4s.227 2.6.68 3.693l2.027-1.026z" fill="#FBBC05"/>
              <path d="M12 5.933c1.467 0 2.773.507 3.813 1.493l1.973-1.573C16.747 5.333 14.853 3.8 12 3.8c-3.227 0-5.933 1.493-7.733 3.533l2.24 1.733C9.067 5.733 10.293 5.36 12 5.36c2.56 0 4.733 1.733 5.493 4.067H15.467V7.4C17.893 9.133 15.093 11.267 12 11.267z" fill="#EA4335"/>
            </svg>
            Google
          </button>
          <button
            type="button"
            onClick={() => handleSocialLogin('github')}
            disabled={loading}
            className="social-btn github-btn"
          >
            <svg className="social-icon" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.462-1.11-1.462-.908-.619.069-.606.069-.606 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.091-.647.349-1.087.635-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.272.098-2.65 0 0 .84-.269 2.75 1.025A9.548 9.548 0 0112 7c.855 0 1.72.115 2.527.334 1.91-1.294 2.75-1.025 2.75-1.025.544 1.378.201 2.397.098 2.65.64.699 1.029 1.592 1.029 2.683 0 3.833-2.339 4.69-4.566 4.943.359.309.678.919.678 1.853 0 1.335-.013 2.414-.013 2.741 0 .267.18.704.688.482A10 10 0 0022 12c0-5.523-4.477-10-10-10z" fill="#000"/>
            </svg>
            GitHub
          </button>
        </div>

        <p className="auth-link">
          Already inscribed? <Link to="/login" className="underline">Enter here</Link>
        </p>
      </form>
    </div>
  );
}