import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const useAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
    } else {
      try {
        const secretKey = process.env.REACT_APP_JWT_SECRET;
        const decodedToken = jwtDecode(token, secretKey);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          navigate('/login');
        }
      } catch (error) {
        navigate('/login');
      }
    }
  });

  return null;
};

export default useAuth;
