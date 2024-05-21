import './Home.css'
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => { 
  return (
    <div className="home">
      <Link to="/login">
        <button className="login-button">登入</button>
      </Link>
    </div>
  );
}

export default Home;