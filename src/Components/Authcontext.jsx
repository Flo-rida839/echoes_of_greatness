import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Initialize axios instance
  const api = axios.create({
    baseURL: 'https://your-api-url.com/api',
    withCredentials: true // For cookies if using httpOnly tokens
  });

  // Set up request interceptor for auth token
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  async function signup(userData) {
    try {
      const response = await api.post('/auth/register', userData);
      localStorage.setItem('token', response.data.token);
      setCurrentUser(response.data.user);
      navigate('/');
      return response;
    } catch (error) {
      throw error.response.data;
    }
  }

  async function login(credentials) {
    try {
      const response = await api.post('/auth/login', credentials);
      localStorage.setItem('token', response.data.token);
      setCurrentUser(response.data.user);
      navigate('/');
      return response;
    } catch (error) {
      throw error.response.data;
    }
  }

  async function googleLogin(googleToken) {
    try {
      const response = await api.post('/auth/google', { token: googleToken });
      localStorage.setItem('token', response.data.token);
      setCurrentUser(response.data.user);
      navigate('/');
      return response;
    } catch (error) {
      throw error.response.data;
    }
  }

  function logout() {
    localStorage.removeItem('token');
    setCurrentUser(null);
    navigate('/login');
  }

  async function checkAuth() {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await api.get('/auth/me');
        setCurrentUser(response.data.user);
      }
    } catch (error) {
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    checkAuth();
  }, []);

  const value = {
    currentUser,
    api,
    signup,
    login,
    googleLogin,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}