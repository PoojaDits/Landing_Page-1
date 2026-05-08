import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!e.target.checkValidity()) {
      return;
    }
    console.log('Logging in with:', { username, password });
    
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength="3"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="6"
          />
          <Button type="submit">Sign In</Button>
        </form>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <a href="#" style={{ color: '#e94560', textDecoration: 'none', fontSize: '0.9rem' }}>Forgot Password?</a>
        </div>
        <p style={{ textAlign: 'center', marginTop: '20px' }}>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;