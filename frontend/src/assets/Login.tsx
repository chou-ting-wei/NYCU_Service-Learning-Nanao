import './Login.css'
import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";

// Define your interface if you are using TypeScript
interface LoginResponse {
    status?: string;
    password?: string;
}

const Login = ({ onLogin, url }) => {
    const userRef = useRef(null);
    const errRef = useRef(null);
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [info, setInfo] = useState<LoginResponse | null>(null);
    const [role, setRole] = useState("user");
    const navigate = useNavigate();

    useEffect(() => {
        if (userRef.current) {
            userRef.current.focus();
        }
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    useEffect(() => {
        if (info) {
            if (info.status === "Failed") {
                setErrMsg('Unauthorized');
            } else if (info.password === pwd) {
                setSuccess(true);
            } else {
                setErrMsg('password incorrect');
            }
        }
    }, [info])

    useEffect(() => {
        if (success) {
            console.log(user);
            onLogin(user, role);
            navigate('/'); // This replaces history.push('/')
        }
    }, [success, onLogin, user, role, navigate])

    const handleSubmit = async (e) => {
        e.preventDefault();
        let formData = new FormData(); 
        formData.append('role', 'user');   
        formData.append('id', user);
        
        await fetch(url + 'sign-in', {
            method: "POST",
            headers: {
                "ngrok-skip-browser-warning": "69420"
            },
            body: formData
        })
        .then(res => res.json())
        .then((data: LoginResponse) => {
            setInfo(data);
        })
        .catch(err => {
            console.log(err.message);
            if (err.message === '404') {
                setErrMsg('Unauthorized');
            }
        })
    }

  return (
    <div className="container">
      { success && (
          <div>
              <h1>You are logged in!</h1>
              <br />
              <p>
                  <Link to="/">Go to Home</Link>
              </p>
          </div>
      )} 
        
      { success === false && (
      <>
      {/* <div className="top"></div>
      <div className="bottom"></div> */}
      <div className="center">
        <div className="login">
          <h1>Login</h1>
          <br></br>
          <div ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</div>
          <form onSubmit={handleSubmit}>
              <label htmlFor="username">Username:</label>
              <input
                  type="text"
                  id="username"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                  required
              />

              <label htmlFor="password">Password:</label>
              
              <input
                  type="password"
                  id="password"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  required
              />
              <button>Login</button>
          </form>
          <label>
              Need an Account?<br />
          </label>
          <p>
              <Link to="/register">Sign Up</Link>
          </p>
          </div>
        </div></>
        )}
    </div>
  );
}

export default Login;