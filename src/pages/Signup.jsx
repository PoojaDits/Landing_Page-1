import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../components/Button';
import Input from '../components/Input';

const API_URL = 'https://dummyjson.com';

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
    if (name === 'firstName') {
      if (!value.trim()) return 'First Name is required';
      if (!/^[A-Za-z ]+$/.test(value)) return 'Only letters and spaces allowed';
    }
    if (name === 'lastName') {
      if (!value.trim()) return 'Last Name is required';
      if (!/^[A-Za-z ]+$/.test(value)) return 'Only letters and spaces allowed';
    }
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
    if (!formData.firstName.trim()) newErrors.firstName = 'First Name is required';
    else if (!/^[A-Za-z ]+$/.test(formData.firstName)) newErrors.firstName = 'Only letters and spaces allowed';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last Name is required';
    else if (!/^[A-Za-z ]+$/.test(formData.lastName)) newErrors.lastName = 'Only letters and spaces allowed';
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
      localStorage.setItem('demoUser', JSON.stringify({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
      }));

      await axios.post(`${API_URL}/users/add`, formData);
      navigate('/login');
    } catch (err) {
      const msg = err.response?.data?.message || 'Signup failed. Please try again.';
      setMainError(msg);
    } finally {
      setLoading(false);
    }
  };

  const inputBase = 'w-full px-4 py-3 border-2 rounded-lg text-base bg-gray-100 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-200 transition';
  const inputErr = 'border-red-500 bg-red-50';

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-[#0f2340] via-[#16213e] to-[#0b2544]">
      <section className="relative w-full max-w-md bg-white rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.12)] p-10 sm:p-12">
        <header className="mb-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800">Create Account</h1>
          <p className="mt-2 text-sm text-gray-600">Sign up to get started</p>
        </header>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
          {mainError && (
            <div role="alert" className="text-[#b91c1c] bg-[#fee2e2] px-3 py-2 rounded-md text-sm text-center">
              {mainError}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="firstName" className="text-sm font-medium text-gray-700">First Name</label>
              <Input
                id="firstName"
                type="text"
                name="firstName"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="given-name"
                className={`${inputBase} ${errors.firstName ? inputErr : ''}`}
                aria-invalid={errors.firstName ? 'true' : 'false'}
              />
              {errors.firstName && <span className="text-red-500 text-sm ml-1">{errors.firstName}</span>}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="lastName" className="text-sm font-medium text-gray-700">Last Name</label>
              <Input
                id="lastName"
                type="text"
                name="lastName"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="family-name"
                className={`${inputBase} ${errors.lastName ? inputErr : ''}`}
                aria-invalid={errors.lastName ? 'true' : 'false'}
              />
              {errors.lastName && <span className="text-red-500 text-sm ml-1">{errors.lastName}</span>}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="email"
              className={`${inputBase} ${errors.email ? inputErr : ''}`}
              aria-invalid={errors.email ? 'true' : 'false'}
            />
            {errors.email && <span className="text-red-500 text-sm ml-1">{errors.email}</span>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="new-password"
              className={`${inputBase} ${errors.password ? inputErr : ''}`}
              aria-invalid={errors.password ? 'true' : 'false'}
            />
            {errors.password && <span className="text-red-500 text-sm ml-1">{errors.password}</span>}
          </div>

          <Button
            type="submit"
            className="w-full py-3 bg-gradient-to-br from-[#e94560] to-[#f093fb] text-white rounded-lg font-semibold shadow-md hover:-translate-y-1 transform transition disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account? <Link to="/login" className="text-[#e94560] font-semibold hover:underline">Sign in</Link>
        </p>
      </section>
    </main>
  );
};

export default Signup;