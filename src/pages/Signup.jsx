import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../components/Button';
import Input from '../components/Input';
import './Signup.css';

const API_LINK = import.meta.env.AUTH_LINK;

const Signup = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [errs, setErrs] = useState({});

  useEffect(() => {
    if (localStorage.getItem('myToken')) {
      navigate('/');
    }
  }, [navigate]);

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
    if (errs[e.target.name]) {
      setErrs({ ...errs, [e.target.name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrs = {};

    if (inputs.firstName == '') {
      newErrs.firstName = 'First Name is required';
    } else if (!/^[A-Za-z ]+$/.test(inputs.firstName)) {
      newErrs.firstName = 'Only letters and spaces allowed';
    }

    if (inputs.lastName == '') {
      newErrs.lastName = 'Last Name is required';
    } else if (!/^[A-Za-z ]+$/.test(inputs.lastName)) {
      newErrs.lastName = 'Only letters and spaces allowed';
    }

    if (inputs.email == '') {
      newErrs.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputs.email)) {
      newErrs.email = 'Please enter a valid email address';
    }

    if (inputs.password == '') {
      newErrs.password = 'Password is required';
    } else if (inputs.password.length < 6) {
      newErrs.password = 'Password must be at least 6 characters';
    }

    // check if there are any errors
    let count = 0;
    for (let key in newErrs) {
      count++;
    }

    if (count > 0) {
      setErrs(newErrs);
      return;
    }

    try {
      // save my user for login page
      localStorage.setItem('myNewUser', JSON.stringify(inputs));

      const res = await axios.post(`${API_LINK}/users/add`, inputs);
      const data = res.data;
      console.log('Signup successful:', data);

      // go to login
      navigate('/login');
    } catch (err) {
      console.log('Error signing up:', err);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit} className="signup-form" noValidate>
          <div className="input-group">
            <Input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={inputs.firstName}
              onChange={handleChange}
              className={errs.firstName ? 'input-error' : ''}
            />
            {errs.firstName && <span className="error-text">{errs.firstName}</span>}
          </div>
          <div className="input-group">
            <Input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={inputs.lastName}
              onChange={handleChange}
              className={errs.lastName ? 'input-error' : ''}
            />
            {errs.lastName && <span className="error-text">{errs.lastName}</span>}
          </div>
          <div className="input-group">
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={inputs.email}
              onChange={handleChange}
              className={errs.email ? 'input-error' : ''}
            />
            {errs.email && <span className="error-text">{errs.email}</span>}
          </div>
          <div className="input-group">
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={inputs.password}
              onChange={handleChange}
              autoComplete="new-password"
              className={errs.password ? 'input-error' : ''}
            />
            {errs.password && <span className="error-text">{errs.password}</span>}
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