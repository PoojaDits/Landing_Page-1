import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../components/Button';
import Input from '../components/Input';
import './Login.css';

const API_LINK = import.meta.env.AUTH_API;

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [mainError, setMainError] = useState('');


  useEffect(() => {
    if (localStorage.getItem('myToken')) {
      navigate('/');
    }
  }, [navigate]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };


  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMainError('');

    if (!validateForm()) return;

    try {

      const demoUser = localStorage.getItem('demoUser');
      if (demoUser) {
        const userData = JSON.parse(demoUser);
        if (userData.email === formData.email && userData.password === formData.password) {

          const mockToken = 'demo-token-' + Date.now();
          localStorage.setItem('myToken', mockToken);

          console.log('Demo login successful!\nToken:', mockToken, '\nUser Info:', {
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email
          });

          localStorage.setItem('myUser', JSON.stringify({
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email
          }));

          navigate('/');
          return;
        }
      }


      const response = await axios.post(`${API_LINK}/auth/login`, {
        username: formData.email,
        password: formData.password,
        expiresInMins: 60,
      });

      const { accessToken, ...userData } = response.data;
      localStorage.setItem('myToken', accessToken);
      localStorage.setItem('myUser', JSON.stringify(userData));


      const safeUserData = { ...userData };
      if (safeUserData.password) safeUserData.password = '********';
      console.log('Login successful!\nToken:', accessToken, '\nUser Info:', safeUserData);

      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      console.log('API URL:', `${API_LINK}/auth/login`);
      console.log('Request data:', {
        username: formData.email,
        password: formData.password,
        expiresInMins: 60,
      });
      const errorMessage = error.response?.data?.message || 'User does not exist or invalid credentials';
      setMainError(errorMessage);
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
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="off"
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="input-group">
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
              className={errors.password ? 'input-error' : ''}
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
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