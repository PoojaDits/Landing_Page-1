// useAppHooks.js
// All custom hooks for the whole project in one file

import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';


const API_URL = 'https://dummyjson.com';


export function useCart() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

++
  function addToCart(product) {
    const alreadyInCart = cartItems.find(item => item.id === product.id);

    if (alreadyInCart) {
      
      setCartItems(cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  }
  function removeFromCart(id) {
    setCartItems(cartItems.filter(item => item.id !== id));
  }

  
  function updateQuantity(id, quantity) {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity } : item
    ));
  }

  function toggleCart() {
    setIsCartOpen(!isCartOpen);
  }

  function closeCart() {
    setIsCartOpen(false);
  }
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return {
    cartItems,
    isCartOpen,
    totalItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    toggleCart,
    closeCart,
  };
}

export function useAuth() {
  const location = useLocation();

  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('myToken');
    const savedUser = localStorage.getItem('myUser');

    setIsLoggedIn(!!token); 
    setUser(savedUser ? JSON.parse(savedUser) : null);
  }, [location]);

  return { isLoggedIn, user };
}



export function useContactForm() {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, 'Name must be at least 2 characters')
        .required('Name is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      message: Yup.string()
        .min(10, 'Message must be at least 10 characters')
        .required('Message is required'),
    }),
    onSubmit: function(values, { resetForm }) {
      console.log('Contact form submitted:', values);
      toast.success('Thank you for your message!', { duration: 4000 });
      resetForm(); 
        },
  });

  return formik;
}


export function useLoginForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [mainError, setMainError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('myToken')) {
      navigate('/');
    }
  }, [navigate]);

    function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

  
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  }

  
  function validateField(name, value) {
    if (name === 'email') {
      if (!value) return 'Email is required';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email';
    }
    if (name === 'password') {
      if (!value) return 'Password is required';
      if (value.length < 6) return 'Password must be at least 6 characters';
    }
    return ''; 
  }

  function handleBlur(e) {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  }

  
  function validateForm() {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Enter a valid email';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  }


  async function handleSubmit(e) {
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
      const message = err.response?.data?.message || 'Invalid credentials or user not found';
      setMainError(message);
    } finally {
      setLoading(false);
    }
  }

  return { formData, errors, mainError, loading, handleChange, handleBlur, handleSubmit };
}



export function useSignupForm() {
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
    if (localStorage.getItem('myToken')) {
      navigate('/');
    }
  }, [navigate]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  }


  function validateField(name, value) {
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
  }

  function handleBlur(e) {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  }

  function validateForm() {
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
  }

  async function handleSubmit(e) {
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
      const message = err.response?.data?.message || 'Signup failed. Please try again.';
      setMainError(message);
    } finally {
      setLoading(false);
    }
  }

  return { formData, errors, mainError, loading, handleChange, handleBlur, handleSubmit };
}
