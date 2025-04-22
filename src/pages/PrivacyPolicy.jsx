import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white py-16 px-4">
      <div className="max-w-4xl mx-auto bg-[#1a1a2e] p-8 rounded-xl shadow-lg">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-purple-400">Privacy Policy</h1>
          <p className="text-gray-400 mt-2">Last Updated: {new Date().toLocaleDateString()}</p>
        </div>
        
        <div className="flex flex-col gap-0 text-left">
          <section className="min-h-0">
            <h2 className="text-2xl font-semibold text-purple-300">1. Introduction</h2>
            <p className="text-gray-300 leading-relaxed">
              At EVAL, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information when you use our services.
            </p>
          </section>

          <section className="min-h-0 mt-6">
            <h2 className="text-2xl font-semibold text-purple-300">2. Information We Collect</h2>
            <p className="text-gray-300 leading-relaxed">
              We collect the following types of information:
            </p>
            <ul className="list-disc pl-6 text-gray-300 leading-relaxed">
              <li>Public game data and statistics</li>
              <li>Information you provide when contacting us</li>
              <li>Usage data and analytics</li>
              <li>Device and browser information</li>
            </ul>
          </section>

          <section className="min-h-0 mt-6">
            <h2 className="text-2xl font-semibold text-purple-300">3. How We Use Your Information</h2>
            <p className="text-gray-300 leading-relaxed">
              We use the collected information to:
            </p>
            <ul className="list-disc pl-6 text-gray-300 leading-relaxed">
              <li>Generate and maintain rankings and statistics</li>
              <li>Improve our services and user experience</li>
              <li>Respond to user inquiries and support requests</li>
              <li>Analyze website performance and usage patterns</li>
            </ul>
          </section>

          <section className="min-h-0 mt-6">
            <h2 className="text-2xl font-semibold text-purple-300">4. Data Sharing</h2>
            <p className="text-gray-300 leading-relaxed">
              We do not sell your personal information. We may share data with:
            </p>
            <ul className="list-disc pl-6 text-gray-300 leading-relaxed">
              <li>Service providers who assist in our operations</li>
              <li>Legal authorities when required by law</li>
              <li>Third parties with your explicit consent</li>
            </ul>
          </section>

          <section className="min-h-0 mt-6">
            <h2 className="text-2xl font-semibold text-purple-300">5. Data Security</h2>
            <p className="text-gray-300 leading-relaxed">
              We implement appropriate security measures to protect your information. However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section className="min-h-0 mt-6">
            <h2 className="text-2xl font-semibold text-purple-300">6. Cookies and Tracking</h2>
            <p className="text-gray-300 leading-relaxed">
              We use cookies and similar technologies to enhance your experience and collect usage data. You can control cookie settings through your browser.
            </p>
          </section>

          <section className="min-h-0 mt-6">
            <h2 className="text-2xl font-semibold text-purple-300">7. Your Rights</h2>
            <p className="text-gray-300 leading-relaxed">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-gray-300 leading-relaxed">
              <li>Access your personal information</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of certain data collection</li>
            </ul>
          </section>

          <section className="min-h-0 mt-6">
            <h2 className="text-2xl font-semibold text-purple-300">8. Children's Privacy</h2>
            <p className="text-gray-300 leading-relaxed">
              Our services are not directed to children under 13. We do not knowingly collect personal information from children.
            </p>
          </section>

          <section className="min-h-0 mt-6">
            <h2 className="text-2xl font-semibold text-purple-300">9. Changes to Privacy Policy</h2>
            <p className="text-gray-300 leading-relaxed">
              We may update this Privacy Policy periodically. We will notify users of significant changes through our website.
            </p>
          </section>

          <section className="min-h-0 mt-6">
            <h2 className="text-2xl font-semibold text-purple-300">10. Contact Us</h2>
            <p className="text-gray-300 leading-relaxed">
              For privacy-related questions or concerns, please contact us at eval.information@gmail.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
} 