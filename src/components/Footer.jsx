import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-gray-300">Home</Link>
              </li>
              <li>
                <Link to="/high-school-rankings" className="hover:text-gray-300">High School Rankings</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gray-300">About</Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms-of-service" className="hover:text-gray-300">Terms of Service</Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-gray-300">Privacy Policy</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p>&copy; {new Date().getFullYear()} EVAL Gaming. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 