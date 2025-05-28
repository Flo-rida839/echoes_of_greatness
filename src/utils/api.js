// src/utils/api.js
import axios from 'axios';

// Base URL for the API (adjust based on your Flask server)
const API_URL = 'https://flowurr27.pythonanywhere.com/';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptor to include Authorization header with token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Authentication APIs
export const signup = async (userData) => {
  const response = await api.post('/auth/register', {
    username: userData.name, // Adjust based on backend requirements
    email: userData.email,
    password: userData.password,
    first_name: userData.name,
  });
  // Save token to localStorage
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  // Save token to localStorage
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

// Article APIs
export const getArticleById = async (id) => {
  const response = await api.get(`api/articles/${id}`);
  return response.data;
};

export const getArticles = async () => {
  const response = await api.get('api/articles');
  return response.data;
};

// Theme APIs
export const getThemes = async () => {
  const response = await api.get('/themes');
  return response.data;
};

export const getThemeById = async (id) => {
  const response = await api.get(`/themes/${id}`);
  return response.data;
};

// Engagement APIs
export const getReflections = async (articleId) => {
  const response = await api.get(`/articles/${articleId}/reflections`);
  return response.data;
};

export const postReflection = async (articleId, content) => {
  const response = await api.post(`/articles/${articleId}/reflections`, { content });
  return response.data;
};

export const getRatings = async (articleId) => {
  const response = await api.get(`/articles/${articleId}/ratings`);
  return response.data;
};

export const postRating = async (articleId, rating) => {
  const response = await api.post(`/articles/${articleId}/ratings`, { rating });
  return response.data;
};

// Admin APIs
export const createArticle = async (articleData) => {
  const response = await api.post('/admin/articles', articleData);
  return response.data;
};

export default api;