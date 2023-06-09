import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import login from '../services/login';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  useEffect(() => {
    if (token) {
      navigate('/');
    }
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    const { success, data, error } = await login(username, password);

    if (success) {
      setIsSuccess(true);
      localStorage.setItem('token', data.token);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } else {
      setIsSuccess(false);
      setErrorMessage(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md mx-auto p-4">
        <h1 className="text-4xl font-bold text-center mb-4">
          PDF Management & Collaboration System
        </h1>
        {isSuccess ? (
          <div className="bg-green-200 text-green-800 p-2 mb-4 rounded">
            Login successful!
          </div>
        ) : errorMessage ? (
          <div className="bg-red-200 text-red-800 p-2 mb-4 rounded">
            {errorMessage}
          </div>
        ) : null}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="username" className="block font-medium">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="password" className="block font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              autoComplete="on"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full"
            />
          </div>
          <button
            type="submit"
            className={`py-2 px-4 rounded w-full ${
              isSuccess ? 'bg-green-500' : 'bg-blue-500'
            } text-white`}
          >
            {isSuccess ? 'Logged In' : 'Log In'}
          </button>
        </form>
        <div className="text-center pt-4">
          <p className="text-sm">Don't have an account?</p>
          <Link to="/signup" className="text-blue-500 hover:underline">
            Create new account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
