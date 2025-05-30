import axios from 'axios';

// Base URL for the API
const API_URL = 'https://flowurr27.pythonanywhere.com';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptor to include Authorization header with token
api.interceptors.request.use((config) => {
  console.log('Interceptor called for:', config.url); // Debug log
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  console.error('Interceptor error:', error);
  return Promise.reject(error);
});

// Authentication APIs
export const signup = async (userData) => {
  const response = await api.post('/api/auth/register', {
    username: userData.username,
    email: userData.email,
    password: userData.password,
    first_name: userData.first_name,
    last_name: userData.last_name,
  });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

export const login = async (credentials) => {
  const response = await api.post('/api/auth/login', credentials);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

export const googleLogin = () => {
  window.location.href = `${API_URL}api/auth/google`;
};

export const githubLogin = () => {
  window.location.href = `${API_URL}api/auth/github`;
};

// Article APIs
export const getArticleById = async (id) => {
  const response = await api.get(`/api/articles/${id}`);
  return response.data;
};

export const getArticles = async () => {
  const response = await api.get('/api/articles');
  return response.data;
};

// Theme APIs
export const getThemes = async () => {
  const response = await api.get('/api/themes');
  return response.data;
};

export const getThemeById = async (id) => {
  const response = await api.get(`/api/themes/${id}`);
  return response.data;
};

// Engagement APIs
export const getReflections = async (articleId) => {
  const response = await api.get(`/api/articles/${articleId}/reflections`);
  return response.data;
};

export const postReflection = async (articleId, content) => {
  const response = await api.post(`/api/articles/${articleId}/reflections`, { content });
  return response.data;
};

export const getRatings = async (articleId) => {
  const response = await api.get(`/api/articles/${articleId}/ratings`);
  return response.data;
};

export const postRating = async (articleId, rating) => {
  const response = await api.post(`/api/articles/${articleId}/ratings`, { rating });
  return response.data;
};

// Admin APIs
export const createArticle = async (articleData) => {
  const response = await api.post('/api/admin/articles', articleData);
  return response.data;
};

export default api;