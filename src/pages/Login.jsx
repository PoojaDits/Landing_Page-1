import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { isLoggedIn, storeLogin, getUserRole, DASHBOARD_PATHS, ROLES } from '@/lib/role';

const API_URL = 'https://dummyjson.com';

const roles = [
  { value: ROLES.CUSTOMER, label: 'Customer' },
  { value: ROLES.ADMIN, label: 'Admin' },
  { value: ROLES.SUPER_ADMIN, label: 'Super Admin' },
];

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '', role: ROLES.CUSTOMER });
  const [errors, setErrors] = useState({});
  const [mainError, setMainError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn()) navigate(DASHBOARD_PATHS[getUserRole()] || '/', { replace: true });
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
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
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const validateForm = () => {
    const errs = {};
    const emailErr = validateField('email', formData.email);
    const passErr = validateField('password', formData.password);
    if (emailErr) errs.email = emailErr;
    if (passErr) errs.password = passErr;
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMainError('');
    if (!validateForm()) return;
    setLoading(true);
    try {
      const savedDemo = localStorage.getItem('demoUser');
      if (savedDemo) {
        const demo = JSON.parse(savedDemo);
        if (demo.email === formData.email && demo.password === formData.password) {
          storeLogin({
            firstName: demo.firstName, lastName: demo.lastName,
            email: demo.email, role: demo.role || formData.role,
          }, 'demo-token-' + Date.now());
          navigate(DASHBOARD_PATHS[demo.role || formData.role] || '/');
          return;
        }
      }
      const { data } = await axios.post(`${API_URL}/auth/login`, {
        username: formData.email, password: formData.password, expiresInMins: 60,
      });
      const { accessToken, ...userFields } = data;
      storeLogin({ ...userFields, role: formData.role }, accessToken);
      navigate(DASHBOARD_PATHS[formData.role] || '/');
    } catch (err) {
      setMainError(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }} className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
          <p className="text-gray-400 mt-2">Sign in to your account</p>
        </div>
        {mainError && <div className="mb-6 p-4 rounded-xl text-sm" style={{ background: 'rgba(233,69,96,0.1)', border: '1px solid rgba(233,69,96,0.2)', color: '#e94560' }}>{mainError}</div>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label className="text-sm font-semibold text-gray-300 mb-3 block">Sign in as</Label>
            <div className="grid grid-cols-3 gap-2">
              {roles.map(r => (
                <button key={r.value} type="button" onClick={() => setFormData(prev => ({ ...prev, role: r.value }))}
                  className={cn('p-3 rounded-xl border-2 text-center transition-all',
                    formData.role === r.value ? 'text-white' : 'border-gray-700 text-gray-500 hover:border-gray-600 bg-transparent')}
                  style={formData.role === r.value ? { background: 'rgba(233,69,96,0.15)', borderColor: '#e94560' } : {}}>
                  <div className="text-xs font-bold">{r.label}</div>
                </button>
              ))}
            </div>
          </div>
          <div>
            <Label htmlFor="email" className="text-gray-300">Email</Label>
            <Input id="email" name="email" type="email" placeholder="you@example.com" value={formData.email}
              onChange={handleChange} onBlur={handleBlur}
              className={cn('h-12 bg-white/5 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-[#e94560]', errors.email && 'border-[#e94560]')} />
            {errors.email && <p className="text-[#e94560] text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <Label htmlFor="password" className="text-gray-300">Password</Label>
            <Input id="password" name="password" type="password" placeholder="••••••••" value={formData.password}
              onChange={handleChange} onBlur={handleBlur}
              className={cn('h-12 bg-white/5 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-[#e94560]', errors.password && 'border-[#e94560]')} />
            {errors.password && <p className="text-[#e94560] text-sm mt-1">{errors.password}</p>}
          </div>
          <Button type="submit" className="w-full h-12 text-base font-semibold text-white border-0" disabled={loading}
            style={{ background: 'linear-gradient(135deg, #e94560, #f85c76)', boxShadow: '0 4px 20px rgba(233,69,96,0.4)' }}>
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
        <div className="mt-6 text-center text-sm text-gray-400">
          <Link to="#" className="font-medium" style={{ color: '#e94560' }}>Forgot Password?</Link>
          <span className="mx-2">·</span>
          Don&apos;t have an account? <Link to="/signup" className="font-medium" style={{ color: '#e94560' }}>Sign up</Link>
        </div>
      </div>
    </div>
  );
}