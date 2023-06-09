import React, { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useAuth();

  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = jwtDecode(token, process.env.REACT_APP_JWT_SECRET);
        setUsername(decodedToken.username);
      }
    } catch (err) {
      localStorage.removeItem('token');
      navigate('/login');
    }
    //eslint-disable-next-line
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      <div>Hello, {username}</div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
