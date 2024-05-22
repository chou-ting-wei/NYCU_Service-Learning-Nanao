import { BrowserRouter as BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { CookiesProvider, useCookies } from 'react-cookie'

// import EditUser from './assets/EditUser'
import Home from './assets/Home'
import Interact from './assets/Interact/Interact'
import Login from './assets/Login'
import Logout from './assets/Logout'
import Navig from './assets/Navig'
import NotFound from './assets/NotFound'
import Profile from './assets/Profile'
// import Register from './assets/Register'
import Admin from './assets/Admin'
import Stat from './assets/Stat'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'

function App() {
  const url="http://localhost:3000/"
  const [cookies, setCookie] = useCookies(["user"]);

  return (
    <CookiesProvider>
      <BrowserRouter>
        <div className="App">
          <div className="toplb">
            <Navig user={cookies.user}/>
          </div>
          
          <div className="content">          
            <Routes>
              {/* <Route path="/edituser" element={<EditUser user={cookies.user} url={url}/>} /> */}
              <Route path="/home" element={<Home />} />
              <Route path="/interact" element={<Interact user={cookies.user} />} />
              <Route path="/login" element={<Login url={url}/>} />
              <Route path="/logout" element={<Logout url={url}/>} />
              {/* <Route path="/register" element={<Register url={url}/>} /> */}
              <Route path="/profile" element={<Profile user={cookies.user} url={url}/>} />
              <Route path="/admin" element={<Admin user={cookies.user} url={url}/>} />
              <Route path="/stat" element={<Stat url={url}/>} />
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </CookiesProvider>
  );
}

export default App