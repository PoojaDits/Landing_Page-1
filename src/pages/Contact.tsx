import React from 'react'
import ContactForm from '@/components/ContactForm'

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
      <div className="max-w-2xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Get in Touch
        </h1>
        <p className="text-gray-400 text-center mb-12">
          Have a question? We'd love to hear from you.
        </p>
        <ContactForm />
      </div>
    </div>
  )
}

export default Contact
