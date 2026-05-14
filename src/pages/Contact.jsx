import ContactForm from '../components/ContactForm';

const Contact = () => {
  return (
    <main className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div className="text-center mb-8">
            <p className="text-sm font-medium text-[#e94560]">Get In Touch</p>
            <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-gray-900">Contact Us</h1>
            <p className="mt-3 text-sm text-gray-600">We're here to help! Send us a message and we'll get back to you shortly.</p>
          </div>

          <ContactForm />
        </div>
      </div>
    </main>
  );
};

export default Contact;
