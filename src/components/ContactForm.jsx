import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
      toast.success('Thank you for your message!', { duration: 4000 });
      resetForm();
    },
  });

  return (
    <div className="w-full">
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            autoComplete="off"
            placeholder="Your Name"
            className={formik.touched.name && formik.errors.name ? "border-[#e94560] focus-visible:ring-[#e94560]" : ""}
            aria-invalid={!!(formik.touched.name && formik.errors.name)}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-[#e94560] text-sm mt-1">{formik.errors.name}</div>
          ) : null}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            autoComplete="off"
            placeholder="your.email@example.com"
            className={formik.touched.email && formik.errors.email ? "border-[#e94560] focus-visible:ring-[#e94560]" : ""}
            aria-invalid={!!(formik.touched.email && formik.errors.email)}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-[#e94560] text-sm mt-1">{formik.errors.email}</div>
          ) : null}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="message">Message</Label>
          <textarea
            id="message"
            name="message"
            value={formik.values.message}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Your message here..."
            rows="5"
            className={`flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${formik.touched.message && formik.errors.message ? "border-[#e94560] focus-visible:ring-[#e94560]" : ""}`}
            aria-invalid={!!(formik.touched.message && formik.errors.message)}
          />
          {formik.touched.message && formik.errors.message ? (
            <div className="text-[#e94560] text-sm mt-1">{formik.errors.message}</div>
          ) : null}
        </div>

        <Button
          type="submit"
          disabled={formik.isSubmitting}
          size="lg"
          className="w-full mt-2 font-semibold text-white border-0 hover:opacity-90 transition-opacity"
          style={{ background: 'linear-gradient(135deg, #e94560, #f85c76)', boxShadow: '0 4px 20px rgba(233,69,96,0.4)' }}
        >
          {formik.isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;