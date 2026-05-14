import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../components/Button';
import Input from '../components/Input';
import './Signup.css';

const API_LINK = import.meta.env.AUTH_API;

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [mainError, setMainError] = useState('');

  // Redirect if already logged in
  useEffect(() => {
    if (localStorage.getItem('myToken')) {
      navigate('/');
    }
  }, [navigate]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First Name is required';
    } else if (!/^[A-Za-z ]+$/.test(formData.firstName)) {
      newErrors.firstName = 'Only letters and spaces allowed';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last Name is required';
    } else if (!/^[A-Za-z ]+$/.test(formData.lastName)) {
      newErrors.lastName = 'Only letters and spaces allowed';
    }

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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMainError('');

    if (!validateForm()) return;

    try {
      // Store form data temporarily
      localStorage.setItem('myNewUser', JSON.stringify(formData));



      const response = await axios.post(`${API_LINK}/users/add`, formData);


      // Since dummyjson doesn't persist new users for login,
      // we'll store the credentials locally for demo purposes
      localStorage.setItem('demoUser', JSON.stringify({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName
      }));

      // alert(`Account created successfully! You can now login with:\n\nEmail: ${formData.email}\nPassword: ${formData.password}`);

      navigate('/login');
    } catch (error) {
      console.error('Signup error:', error);

      const errorMessage = error.response?.data?.message || 'Signup failed. Please try again.';
      setMainError(errorMessage);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit} className="signup-form" noValidate>
          {mainError && <div className="error-message-box">{mainError}</div>}

          <div className="input-group">
            <Input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              autoComplete="off"
              className={errors.firstName ? 'input-error' : ''}
            />
            {errors.firstName && <span className="error-text">{errors.firstName}</span>}
          </div>

          <div className="input-group">
            <Input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              autoComplete="off"
              className={errors.lastName ? 'input-error' : ''}
            />
            {errors.lastName && <span className="error-text">{errors.lastName}</span>}
          </div>

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

          <Button type="submit">Sign Up</Button>
        </form>

        <p>
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;