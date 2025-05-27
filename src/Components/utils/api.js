import axios from 'axios';

const API_BASE = 'https://api.https://flowurr27.pythonanywhere.com/'; // replace with your actual API URL

export const getArticleById = async (id) => {
  const response = await axios.get(`${API_BASE}/articles/${id}`);
  return response.data;
};
