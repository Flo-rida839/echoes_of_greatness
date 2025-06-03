import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { signup as apiSignup, login as apiLogin } from '../utils/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Initialize user from token
  useEffect(() => {
    const initializeUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('https://flowurr27.pythonanywhere.com/api/user', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUser({
            id: response.data.id,
            username: response.data.username || 'Scribe',
            email: response.data.email,
            role: response.data.role?.toLowerCase() || 'user' // Normalize role
          });
          console.log('Initialized user:', response.data);
        } catch (error) {
          console.error('User initialization error:', error.response?.data || error.message);
          localStorage.removeItem('token');
          setUser(null);
        }
      }
      setLoading(false);
    };
    initializeUser();
  }, []);

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
        username: user.username || 'Scribe',
        email: user.email,
        role: user.role?.toLowerCase() || 'user' // Normalize role
      });
      console.log('Signup user:', user);
      navigate(user.role?.toLowerCase() === 'admin' || user.role?.toLowerCase() === 'editor' ? '/admin' : '/');
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
        username: user.username || 'Scribe',
        email: user.email,
        role: user.role?.toLowerCase() || 'user' // Normalize role
      });
      console.log('Login user:', user);
      navigate(user.role?.toLowerCase() === 'admin' || user.role?.toLowerCase() === 'editor' ? '/admin' : '/');
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

  if (loading) {
    return (
      <div className="min-h-screen bg-parchment d-flex align-items-center justify-content-center text-amber-900">
        <h3 className="font-cinzel fw-bold medieval-flair">Verifying Scribe’s Credentials...</h3>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);