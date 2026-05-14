import ContactForm from '../components/ContactForm';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import '../pages/Contact.css';

const Contact = () => {
  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-header">
          <h1>Get In Touch</h1>
          <p>We're here to help! Send us a message and we'll get back to you shortly.</p>
        </div>

        <ContactForm />

        <div className="contact-info-row">
          {/* <div className="info-item">
            <FaPhone className="info-icon" />
            <span>+1 (555) 123-4567</span>
          </div>
          <div className="info-item">
            <FaEnvelope className="info-icon" />
            <span>support@shopwave.com</span>
          </div>
          <div className="info-item">
            <FaMapMarkerAlt className="info-icon" />
            <span>New York, NY</span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Contact;
