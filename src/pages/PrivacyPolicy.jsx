import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <div className="bg-[#1a1a1a] rounded-xl p-6 shadow-lg border border-purple-900/30">
          <h2 className="text-2xl font-bold mb-4">Your Privacy Matters</h2>
          <p className="mb-4">
            At EVAL Gaming, we take your privacy seriously. This policy describes how we collect, use, and protect your personal information.
          </p>
          <h3 className="text-xl font-bold mb-2">Information We Collect</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Account information (email, name)</li>
            <li>Profile information (school, gaming preferences)</li>
            <li>Performance data and statistics</li>
          </ul>
          <h3 className="text-xl font-bold mb-2">How We Use Your Information</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>To provide and improve our services</li>
            <li>To connect players with college opportunities</li>
            <li>To maintain and improve our platform</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy; 