import './Login.css'
import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import axios from 'axios';

const Login = ({ url }) => {
    const userRef = useRef(null); // Focus the user input on initial render
    const [user, setUser] = useState(''); // State for username
    const [pwd, setPwd] = useState(''); // State for password
    const [errMsg, setErrMsg] = useState(''); // State for storing error messages
    const [success, setSuccess] = useState(false); // State to track login success
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const navigate = useNavigate(); // Hook for redirecting to other routes

    useEffect(() => {
        // Automatically focus the username input when the component mounts
        userRef.current?.focus();
    }, []);

    useEffect(() => {
        if (success) {
            setCookie("user", user, { path: "/" });
            navigate('/home');  // Redirect on success
        }
    }, [success, user, navigate]); // Run only when `success` changes
      
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(url + 'auth/login', {
                username: user,
                password: pwd
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            });
    
            if (response.status === 201) {
                setSuccess(true); 
            } else {
                throw new Error('Login failed');
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
                    setErrMsg('用戶不存在');
                } else if (error.response.status === 401) {
                    setErrMsg('密碼錯誤');
                } else {
                    setErrMsg('登錄失敗，請稍後再試');
                }
            } else {
                setErrMsg('網絡錯誤，請檢查您的連接');
            }
    
            setSuccess(false); 
        }
    };
    

    return (
        <div className="container">
            {cookies.user ? (
                <div className="logged">
                <div>
                    <h1>已登入！</h1>
                    <br></br>
                    <p><Link to="/home">回到首頁</Link></p>
                </div></div>
            ) : (
                <div className="center">
                    <div className="login">
                        <h1>登入</h1>
                        <br></br>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="username">帳號：</label>
                            <input
                                type="text"
                                id="username"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setUser(e.target.value)}
                                value={user}
                                required
                            />
                            <label htmlFor="password">密碼：</label>
                            <input
                                type="password"
                                id="password"
                                onChange={(e) => setPwd(e.target.value)}
                                value={pwd}
                                required
                            />
                            <div aria-live="assertive" className={errMsg ? "errmsg" : "offscreen"}>
                                {errMsg}
                            </div>
                            <button type="submit">送出</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Login;
