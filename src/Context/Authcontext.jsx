import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { signup as apiSignup, login as apiLogin } from '../utils/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Parse JWT token
  const parseJwt = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error('JWT parse error:', e);
      return null;
    }
  };

  // Initialize user from token or OAuth query params
  useEffect(() => {
    const initializeUser = async () => {
      // Check for OAuth query params (Google/GitHub)
      const searchParams = new URLSearchParams(location.search);
      const tokenFromUrl = searchParams.get('token');
      const idFromUrl = searchParams.get('id');
      const usernameFromUrl = searchParams.get('username');
      const emailFromUrl = searchParams.get('email');
      const roleFromUrl = searchParams.get('role');

      if (tokenFromUrl && idFromUrl && usernameFromUrl && emailFromUrl && roleFromUrl) {
        localStorage.setItem('token', tokenFromUrl);
        setUser({
          id: parseInt(idFromUrl),
          username: usernameFromUrl,
          email: emailFromUrl,
          role: roleFromUrl
        });
        navigate(roleFromUrl === 'admin' || roleFromUrl === 'editor' ? '/admin' : '/', { replace: true });
        return;
      }

      // Check for stored token
      const token = localStorage.getItem('token');
      if (token) {
        const decoded = parseJwt(token);
        if (decoded && decoded.user_id && !decoded.expired) {
          try {
            // Verify token with backend (optional, for security)
            const response = await fetch('https://flowurr27.pythonanywhere.com/api/auth/verify', {
              headers: { Authorization: `Bearer ${token}` }
            });
            if (response.ok) {
              const data = await response.json();
              setUser({
                id: decoded.user_id,
                username: data.username || 'User',
                email: data.email,
                role: decoded.role || 'user'
              });
            } else {
              localStorage.removeItem('token');
              setUser(null);
            }
          } catch (error) {
            console.error('Token verification error:', error);
            localStorage.removeItem('token');
            setUser(null);
          }
        } else {
          localStorage.removeItem('token');
          setUser(null);
        }
      }
    };

    initializeUser();
  }, [location, navigate]);

  const signup = async (userData) => {
    try {
      const response = await apiSignup(userData);
      const { user, token } = response;
      if (!user || !token) {
        throw new Error('Invalid signup response');
      }
      localStorage.setItem('token', token);
      setUser({
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role || 'user'
      });
      navigate(user.role === 'admin' || user.role === 'editor' ? '/admin' : '/');
    } catch (error) {
      console.error('Signup error:', error.response?.data?.error || error.message);
      throw error;
    }
  };

  const login = async (credentials) => {
    try {
      const response = await apiLogin(credentials);
      const { user, token } = response;
      if (!user || !token) {
        throw new Error('Invalid login response');
      }
      localStorage.setItem('token', token);
      setUser({
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role || 'user'
      });
      navigate(user.role === 'admin' || user.role === 'editor' ? '/admin' : '/');
    } catch (error) {
      console.error('Login error:', error.response?.data?.error || error.message);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);