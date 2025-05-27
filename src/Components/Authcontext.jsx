import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const api = axios.create({
    baseURL: 'https:// flowurr27.pythonanywhere.com/api', // Replace with your actual API URL
    withCredentials: true,
  });

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
    } catch (error) {
      alert(error?.response?.data?.message || 'Signup failed');
    }
  }

  async function login(credentials) {
    try {
      const response = await api.post('/auth/login', credentials);
      localStorage.setItem('token', response.data.token);
      setCurrentUser(response.data.user);
      navigate('/');
    } catch (error) {
      alert(error?.response?.data?.message || 'Login failed');
    }
  }

  async function googleLogin(googleToken) {
    try {
      const response = await api.post('/auth/google', { token: googleToken });
      localStorage.setItem('token', response.data.token);
      setCurrentUser(response.data.user);
      navigate('/');
    } catch (error) {
      alert(error?.response?.data?.message || 'Google login failed');
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

  return (
    <AuthContext.Provider value={{ currentUser, api, signup, login, googleLogin, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
