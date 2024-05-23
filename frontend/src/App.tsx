import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CookiesProvider, useCookies } from 'react-cookie';
import React, { useEffect, useState } from 'react';

// import EditUser from './assets/EditUser'
import Home from './assets/Home';
import Interact from './assets/Interact/Interact';
import Login from './assets/Login';
import Logout from './assets/Logout';
import Navig from './assets/Navig';
import NotFound from './assets/NotFound';
import Profile from './assets/Profile';
// import Register from './assets/Register';
import Admin from './assets/Admin';
import Stat from './assets/Stat';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import withAuthRedirect from './assets/withAuthRedirect';

function App() {
  const url = "http://localhost:3000/";
  const [cookies, setCookie] = useCookies(["user"]);

  return (
    <CookiesProvider>
      <Router>
        <div className="App">
          <div className="toplb">
            <Navig user={cookies.user} />
          </div>
          
          <div className="content">          
            <Routes>
              {/* <Route path="/edituser" element={<EditUser user={cookies.user} url={url}/>} /> */}
              <Route path="/home" element={<Home />} />
              <Route path="/interact" element={React.createElement(withAuthRedirect(Interact), { user: cookies.user })} />
              <Route path="/login" element={<Login url={url} />} />
              <Route path="/logout" element={<Logout url={url} />} />
              {/* <Route path="/register" element={<Register url={url} />} /> */}
              <Route path="/profile" element={React.createElement(withAuthRedirect(Profile), { user: cookies.user, url })} />
              <Route path="/admin" element={React.createElement(withAuthRedirect(Admin), { user: cookies.user, url })} />
              <Route path="/stat" element={React.createElement(withAuthRedirect(Stat), { user: cookies.user, url })} />
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </Router>
    </CookiesProvider>
  );
}

export default App;
