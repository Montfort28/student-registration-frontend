// frontend/src/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { authService } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const checkTokenAndFetchProfile = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setCurrentUser(null);
      setLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const isExpired = decoded.exp * 1000 < Date.now();

      if (isExpired) {
        localStorage.removeItem('token');
        setCurrentUser(null);
      } else {
        const response = await authService.getProfile();
        setCurrentUser(response.data.data);
      }
    } catch (err) {
      console.error('Token check failed:', err);
      localStorage.removeItem('token');
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkTokenAndFetchProfile();
  }, []);

  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      localStorage.setItem('token', response.data.token);
      setCurrentUser(response.data.data);
      navigate('/profile'); // All registered users are students
      return response.data;
    } catch (err) {
      throw err.response?.data || { message: 'Registration failed' };
    }
  };

  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      localStorage.setItem('token', response.data.token);
      setCurrentUser(response.data.data);

      // Redirect based on role
      if (response.data.data.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/profile');
      }

      return response.data;
    } catch (err) {
      throw err.response?.data || { message: 'Login failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
    navigate('/login');
  };

  const value = {
    currentUser,
    loading,
    register,
    login,
    logout,
    isAdmin: currentUser?.role === 'admin',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
