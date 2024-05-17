import './Home.css'
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ onLogin }) => {
  const navigate = useNavigate();

  useEffect(() => {
      onLogin(null, null);

      navigate('/home');
  }, [onLogin, navigate]);

  return <p>登出中...</p>;
}

export default Logout;
