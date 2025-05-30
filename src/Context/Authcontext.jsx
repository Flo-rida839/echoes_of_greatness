import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup as apiSignup, login as apiLogin } from '../utils/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const signup = async (userData) => {
    try {
      const response = await apiSignup(userData);
      setUser(response.user || { email: userData.email }); // Fallback if user not in response
      navigate('/');
    } catch (error) {
      console.error('Signup error:', error.response?.data?.error || error.message);
      throw error;
    }
  };

  const login = async (credentials) => {
    try {
      const response = await apiLogin(credentials);
      setUser(response.user || { email: credentials.email }); // Fallback if user not in response
      navigate('/');
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