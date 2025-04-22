import React from 'react';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white py-16 px-4">
      <div className="max-w-4xl mx-auto bg-[#1a1a2e] p-8 rounded-xl shadow-lg">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-purple-400">Terms of Service</h1>
          <p className="text-gray-400 mt-2">Last Updated: {new Date().toLocaleDateString()}</p>
        </div>
        
        <div className="flex flex-col gap-0 text-left">
          <section className="min-h-0">
            <h2 className="text-2xl font-semibold text-purple-300">1. Acceptance of Terms</h2>
            <p className="text-gray-300 leading-relaxed">
              By accessing or using EVAL's services, including our website, rankings, and any related services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section className="min-h-0 mt-6">
            <h2 className="text-2xl font-semibold text-purple-300">2. Description of Services</h2>
            <p className="text-gray-300 leading-relaxed">
              EVAL provides esports rankings, statistics, and related services for Valorant and other games. Our services include but are not limited to player rankings, team rankings, and performance analytics.
            </p>
          </section>

          <section className="min-h-0 mt-6">
            <h2 className="text-2xl font-semibold text-purple-300">3. User Conduct</h2>
            <p className="text-gray-300 leading-relaxed">
              Users agree not to:
            </p>
            <ul className="list-disc pl-6 text-gray-300 leading-relaxed">
              <li>Use our services for any illegal purpose</li>
              <li>Attempt to manipulate or falsify ranking data</li>
              <li>Harass, threaten, or harm other users</li>
              <li>Use automated means to access our services without permission</li>
              <li>Share or distribute our data without authorization</li>
            </ul>
          </section>

          <section className="min-h-0 mt-6">
            <h2 className="text-2xl font-semibold text-purple-300">4. Intellectual Property</h2>
            <p className="text-gray-300 leading-relaxed">
              All content, including but not limited to rankings, statistics, and website design, is the property of EVAL and protected by intellectual property laws. Users may not reproduce, distribute, or create derivative works without our express permission.
            </p>
          </section>

          <section className="min-h-0 mt-6">
            <h2 className="text-2xl font-semibold text-purple-300">5. Data Collection and Privacy</h2>
            <p className="text-gray-300 leading-relaxed">
              We collect and process data in accordance with our Privacy Policy. By using our services, you consent to our data collection and processing practices.
            </p>
          </section>

          <section className="min-h-0 mt-6">
            <h2 className="text-2xl font-semibold text-purple-300">6. Valorant Data Access Consent</h2>
            <p className="text-gray-300 leading-relaxed">
              By creating an account with EVAL, you expressly consent to our collection and use of your Valorant player data, including but not limited to:
            </p>
            <ul className="list-disc pl-6 text-gray-300 leading-relaxed">
              <li>Match history and performance statistics</li>
              <li>Rank and competitive rating</li>
              <li>Agent selection and performance</li>
              <li>Game mode participation</li>
              <li>Other publicly available game data</li>
            </ul>
            <p className="text-gray-300 leading-relaxed mt-2">
              This data will be used to provide our ranking and analytics services, improve our platform, and enhance the esports community experience. You may revoke this consent at any time by deleting your account.
            </p>
          </section>

          <section className="min-h-0 mt-6">
            <h2 className="text-2xl font-semibold text-purple-300">7. Disclaimer of Warranties</h2>
            <p className="text-gray-300 leading-relaxed">
              Our services are provided "as is" without any warranties, express or implied. We do not guarantee the accuracy, completeness, or reliability of our rankings and statistics.
            </p>
          </section>

          <section className="min-h-0 mt-6">
            <h2 className="text-2xl font-semibold text-purple-300">8. Limitation of Liability</h2>
            <p className="text-gray-300 leading-relaxed">
              EVAL shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.
            </p>
          </section>

          <section className="min-h-0 mt-6">
            <h2 className="text-2xl font-semibold text-purple-300">9. Changes to Terms</h2>
            <p className="text-gray-300 leading-relaxed">
              We reserve the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the modified terms.
            </p>
          </section>

          <section className="min-h-0 mt-6">
            <h2 className="text-2xl font-semibold text-purple-300">10. Contact Information</h2>
            <p className="text-gray-300 leading-relaxed">
              For questions about these Terms of Service, please contact us at eval.information@gmail.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
} 