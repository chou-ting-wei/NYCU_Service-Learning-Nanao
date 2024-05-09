import './Register.css'
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
// import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;
const REGISTER_URL = '/register';

const Register = ({url}) => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [name, setName] = useState('');

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();
    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    let headers = {

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!validName || !validPwd || !validMatch){
            setErrMsg("Unable to Register")
            return;
        }
        let formData = new FormData(); 
        formData.append('id', user);  
        formData.append('password', pwd );
        formData.append('name', name );
        fetch(url+'user-sign-up', {
            method: 'POST',
            headers:{

            },
            body: formData
        }).then((response) => {
            console.log(response.text);
            return response.text(); 
        }).then((data) => {
            if(data=='id is already used'){
                setErrMsg("id is already used");
            }
            else{
                navigate('/login');
            }
        })
        .catch((error) => {
            console.log(`Error: ${error.message}`);
        })
    }
    return ( 
        <div className="contain">
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <a href="#">Sign In</a>
                    </p>
                </section>
            ) : (
                <>
                <div className="top"></div>
                <div className="bottom"></div>
                <div className="center">
                <div className="register">
                    <h1>Register</h1>
                    <br></br>
                    <div ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</div>
                    <form onSubmit={handleSubmit}>
                        {/* <label htmlFor="user">
                            Name:
                        </label>
                        <input
                            type="text"
                            id="user"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            required
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        /> */}
                        <label htmlFor="username">
                            姓名:
                            {/* <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"}  /> */}
                        </label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                            4 to 24 characters.Must begin with a letter.
                        </p>


                        <label htmlFor="password">
                            密碼:
                            {/* <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} /> */}
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                            {/* <FontAwesomeIcon icon={faInfoCircle} /> */}
                            8 to 24 characters.
                            Must include uppercase and lowercase letters, a number
                        </p>


                        <label htmlFor="confirm_pwd">
                            確認密碼:
                            {/* <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} /> */}
                        </label>
                        <input
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="pwdnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            {/* <FontAwesomeIcon icon={faInfoCircle} /> */}
                            Must match the first password input field.<br></br>
                        </p>
                        <button>Sign Up</button>
                    </form>
                    <label>
                        Already registered?<br />
                    </label>
                        <span className='Link'>
                            <Link to="/login">Sign In</Link>
                        </span>
                </div>
            </div></>
            )}
        </div>
    );
}

export default Register;