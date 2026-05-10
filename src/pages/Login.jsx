import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../components/Button';
import Input from '../components/Input';
import './Login.css';

const API_LINK = import.meta.env.VITE_AUTH_LINK;

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mainError, setMainError] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [passErr, setPassErr] = useState('');

  useEffect(() => {
    if (localStorage.getItem('myToken')) {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMainError('');
    setEmailErr('');
    setPassErr('');

    let isWrong = false;

    if (email == '') {
      setEmailErr('Email is required');
      isWrong = true;
    } else {
      const checkEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!checkEmail.test(email)) {
        setEmailErr('Please enter a valid email address');
        isWrong = true;
      }
    }

    if (password == '') {
      setPassErr('Password is required');
      isWrong = true;
    } else if (password.length < 6) {
      setPassErr('Password must be at least 6 characters');
      isWrong = true;
    }

    if (isWrong == true) return;

    // check if we have our own user saved in local storage
    const savedData = localStorage.getItem('myNewUser');
    if (savedData) {
      const myUser = JSON.parse(savedData);

      if (myUser.email == email || myUser.firstName == email) {
        if (myUser.password == password) {

          const randText = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
          const myToken = `my_token_${randText}`;
          localStorage.setItem('myToken', myToken);
          const userNoPass = { ...myUser, password: '********' };
          console.log('Login successful with local user!\nToken:', myToken, '\nUser Info:', userNoPass);
          navigate('/');
          return;
        } else {
          setMainError('Invalid credentials');
          return;
        }
      }
    }

    // fallback to dummy api
    try {
      const res = await axios.post(`${API_LINK}/auth/login`, {
        username: email,
        password: password,
        expiresInMins: 60
      });

      const resultData = res.data;
      localStorage.setItem('myToken', resultData.accessToken);
      const dataNoPass = { ...resultData };
      if (dataNoPass.password) dataNoPass.password = '********';
      console.log('Login successful with api!\nToken:', resultData.accessToken, '\nUser Info:', dataNoPass);
      navigate('/');
    } catch (err) {
      console.log('Error logging in:', err);
      const errorMsg = err.response?.data?.message || 'User does not exist or Invalid credentials';
      setMainError(errorMsg);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit} className="login-form" noValidate>
          {mainError && <div className="error-message-box">{mainError}</div>}
          <div className="input-group">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailErr) setEmailErr('');
              }}
              autoComplete="off"
              className={emailErr ? 'input-error' : ''}
            />
            {emailErr && <span className="error-text">{emailErr}</span>}
          </div>
          <div className="input-group">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (passErr) setPassErr('');
              }}
              autoComplete="new-password"
              className={passErr ? 'input-error' : ''}
            />
            {passErr && <span className="error-text">{passErr}</span>}
          </div>
          <Button type="submit">Sign In</Button>
        </form>
        <div className="forgot-password-box">
          <a href="#" className="forgot-password-link">Forgot Password?</a>
        </div>
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;