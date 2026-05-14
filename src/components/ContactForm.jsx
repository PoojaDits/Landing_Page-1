import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from './Button';
import Input from './Input';

import toast from 'react-hot-toast';


const ContactForm = () => {
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
    onSubmit: (values, { resetForm }) => {
      console.log('Form data:', values);
      toast.success('Thank you for your message!', {
        duration: 4000,
        
      });
      resetForm();
    },

  });

  return (
    <div className="w-full">
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-[0.85rem] font-semibold text-gray-600 ml-1">Name</label>
          {
            (() => {
              const base = 'w-full px-4 py-3 border border-gray-200 rounded-[10px] text-base bg-white text-gray-800 box-border focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-200';
              const error = formik.touched.name && formik.errors.name ? 'border-red-500 bg-red-50' : '';
              return (
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="off"
                  placeholder="Your Name"
                  className={`${base} ${error}`}
                />
              );
            })()
          }
          {formik.touched.name && formik.errors.name ? (
            <div className="text-red-500 text-[0.8rem] font-medium mt-1 ml-1">{formik.errors.name}</div>
          ) : null}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-[0.85rem] font-semibold text-gray-600 ml-1">Email</label>
          {
            (() => {
              const base = 'w-full px-4 py-3 border border-gray-200 rounded-[10px] text-base bg-white text-gray-800 box-border focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-200';
              const error = formik.touched.email && formik.errors.email ? 'border-red-500 bg-red-50' : '';
              return (
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="off"
                  placeholder="your.email@example.com"
                  className={`${base} ${error}`}
                />
              );
            })()
          }
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500 text-[0.8rem] font-medium mt-1 ml-1">{formik.errors.email}</div>
          ) : null}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="message" className="text-[0.85rem] font-semibold text-gray-600 ml-1">Message</label>
          {
            (() => {
              const base = 'w-full px-4 py-3 border border-gray-200 rounded-[10px] text-base bg-white text-gray-800 box-border focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-200 resize-y min-h-[120px]';
              const error = formik.touched.message && formik.errors.message ? 'border-red-500 bg-red-50' : '';
              return (
                <textarea
                  id="message"
                  name="message"
                  value={formik.values.message}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Your message here..."
                  rows="5"
                  className={`${base} ${error}`}
                />
              );
            })()
          }
          {formik.touched.message && formik.errors.message ? (
            <div className="text-red-500 text-[0.8rem] font-medium mt-1 ml-1">{formik.errors.message}</div>
          ) : null}
        </div>

        <Button
          type="submit"
          disabled={formik.isSubmitting}
          className={`w-full mt-3 py-3 text-white rounded-full text-base font-semibold shadow-lg bg-gradient-to-br from-[#e94560] to-[#d63a52] hover:from-[#f0546d] hover:to-[#e94560] active:scale-95 disabled:bg-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed`}
        >
          {formik.isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;