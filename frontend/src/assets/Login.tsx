import './Login.css'
import { useRef, useState, useEffect } from 'react';
import { Form, Link, useNavigate } from "react-router-dom";

// Define your interface if you are using TypeScript
interface LoginResponse {
    status: string;
    password: string;
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
    const [response, setResponse] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (userRef.current) {
            userRef.current.focus();
        }
    }, [])

    // useEffect(() => {
    //     setErrMsg('');
    // }, [user, pwd])

    // useEffect(() => {
    //     if (info) {
    //         if (info.status === "Failed") {
    //             setErrMsg('Unauthorized');
    //         } else if (info.password === pwd) {
    //             setSuccess(true);
    //         } else {
    //             setErrMsg('password incorrect');
    //         }
    //     }
    // }, [info])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        // const formData = {};
        formData['username'] = user;
        formData['password'] = pwd;
        const formDataStr = JSON.stringify(formData);
        // console.log(fromDataStr);

        setResponse(await fetch(url + 'user/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: formDataStr,
        }));        
    };

    useEffect(() => {
        if (response.status === 400) {
            setErrMsg('用戶不存在');
        }
        if (response.status === 401) {
            setErrMsg('密碼錯誤');
        }

        if (response.ok) {
            setSuccess(true);
        }

        if (success) {
            // console.log(user);
            onLogin(user);
            navigate('/home');
        }
    }, [success, onLogin, user, role, navigate, response.ok, response.status])


    return (
        <div className="container">
            {success && (
                <div>
                    <h1>已登入！</h1>
                    <br />
                    <p>
                        <Link to="/home">回到首頁</Link>
                    </p>
                </div>
            )}

            {success === false && (
                <>
                    {/* <div className="top"></div>
      <div className="bottom"></div> */}
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
                                <div ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</div>
                                <button>送出</button>
                            </form>
                            {/* <label>
                                沒有帳號嗎？<br />
                            </label>
                            <p>
                                <Link to="/register">註冊新帳號</Link>
                            </p> */}
                        </div>
                    </div></>
            )}
        </div>
    );
}

export default Login;