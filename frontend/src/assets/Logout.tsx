import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Logout = ({ onLogin, url }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      onLogin(null, null);

      try {
        await axios.delete(url + 'auth/logout', {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        navigate('/home');
      } catch (error) {
        console.error(error);
        // Optionally update the UI to inform the user
      }
    };

    logout();
  }, [onLogin, navigate, url]); // Include `url` if it can change during component life

  return <p>登出中...</p>; // Displays while logging out
}

export default Logout;
