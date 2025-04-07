import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import evalLogo from '../assets/eLOGO_black.png'; // Ensure this path is correct

const PartnershipSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = "EVAL | Partnership Signup";
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.send('service_lw88nos', 'template_oesxzwc', formData, 'XzrvON3zMpUj1nqa1')
      .then((response) => {
        console.log('Email sent successfully!', response.status, response.text);
        setSubmitted(true);
      })
      .catch((err) => {
        console.error('Failed to send email:', err);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-lg w-full">
        {submitted ? (
          <div className="text-center">
            <img src={evalLogo} alt="Eval Logo" className="w-24 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800">Thank You!</h2>
            <p className="text-gray-600 mt-2">
              We've received your request and will reach out shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-center">
              <img src={evalLogo} alt="Eval Logo" className="w-24" />
            </div>
            <h2 className="text-center text-2xl font-bold text-gray-800">
              Partner With Eval
            </h2>
            <p className="text-center text-gray-600">Let's build something great together.</p>

            <div>
              <label className="block text-gray-700 font-semibold">Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold">Company Name</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition"
            >
              Send Inquiry
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default PartnershipSignup;
