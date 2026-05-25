import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const API_URL = 'https://dummyjson.com';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [mainError, setMainError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('myToken')) navigate('/');
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const validateField = (name, value) => {
    if (name === 'email') {
      if (!value) return 'Email is required';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email';
    }
    if (name === 'password') {
      if (!value) return 'Password is required';
      if (value.length < 6) return 'Password must be at least 6 characters';
    }
    return '';
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Enter a valid email';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMainError('');
    if (!validateForm()) return;
    setLoading(true);
    try {
      const savedDemoUser = localStorage.getItem('demoUser');
      if (savedDemoUser) {
        const demoUser = JSON.parse(savedDemoUser);
        if (demoUser.email === formData.email && demoUser.password === formData.password) {
          const fakeToken = 'demo-token-' + Date.now();
          localStorage.setItem('myToken', fakeToken);
          localStorage.setItem('myUser', JSON.stringify({
            firstName: demoUser.firstName,
            lastName: demoUser.lastName,
            email: demoUser.email,
          }));
          navigate('/');
          return;
        }
      }

      const response = await axios.post(`${API_URL}/auth/login`, {
        username: formData.email,
        password: formData.password,
        expiresInMins: 60,
      });

      const { accessToken, ...userData } = response.data;
      localStorage.setItem('myToken', accessToken);
      localStorage.setItem('myUser', JSON.stringify(userData));
      navigate('/');
    } catch (err) {
      const msg = err.response?.data?.message || 'Invalid credentials or user not found';
      setMainError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-[#0f2340] via-[#16213e] to-[#0b2544]">
      <section className="relative w-full max-w-md bg-white rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.12)] p-10 sm:p-12 text-gray-800">
        <header className="mb-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800">Sign In</h1>
        </header>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
          {mainError && (
            <div role="alert" className="text-[#b91c1c] bg-[#fee2e2] px-3 py-2 rounded-md text-sm text-center font-medium">
              {mainError}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="abc@example.com"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="email"
              className={`h-12 bg-gray-50 border-gray-200 text-gray-800 focus-visible:ring-blue-200 focus-visible:border-blue-500 focus-visible:bg-white text-base transition-colors ${errors.email ? 'border-red-500 bg-red-50' : ''}`}
              aria-invalid={!!errors.email}
            />
            {errors.email && <span id="email-error" className="text-red-500 text-sm ml-1 font-medium">{errors.email}</span>}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="current-password"
              className={`h-12 bg-gray-50 border-gray-200 text-gray-800 focus-visible:ring-blue-200 focus-visible:border-blue-500 focus-visible:bg-white text-base transition-colors ${errors.password ? 'border-red-500 bg-red-50' : ''}`}
              aria-invalid={!!errors.password}
            />
            {errors.password && <span id="password-error" className="text-red-500 text-sm ml-1 font-medium">{errors.password}</span>}
          </div>

          <Button
            type="submit"
            className="w-full h-12 mt-2 bg-gradient-to-br from-[#e94560] to-[#f093fb] text-white rounded-lg text-base font-semibold shadow-md hover:-translate-y-0.5 hover:shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed border-none"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <div className="mt-5 text-center">
          <a href="#" className="text-[#e94560] text-sm font-medium hover:underline">Forgot Password?</a>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account? <Link to="/signup" className="text-[#e94560] font-semibold hover:underline">Sign up</Link>
        </p>
      </section>
    </main>
  );
};

export default Login;