import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer.jsx';

// ✅ Page Imports
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import PartnershipsPage from './pages/PartnershipsPage';
import PartnershipSignup from './pages/PartnershipSignup';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TournamentBracket from './pages/TournamentBracket';
import TournamentRankings from './components/TournamentRankings';
import TournamentPlayerProfile from './pages/TournamentPlayerProfile';

// ✅ Recruiting & Profiles
import CoachRecruitingPage from './pages/CoachRecruitingPage';
import PlayerRecruitingPage from './pages/PlayerRecruitingPage';
import EditProfile from './pages/EditProfile';

// ✅ Rankings Pages
import HighSchoolRankings from './pages/HighSchoolRankings';
import Valorant from './pages/valorant';

// ✅ Auth & User Management
import Login from './pages/Login';
import Signup from './pages/Signup';
import ResetPassword from './components/ResetPassword';
import UserTypeSelection from './pages/UserTypeSelection';
import CoachSignup from './pages/CoachSignup';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          {/* ✅ Core Pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/partnerships" element={<PartnershipsPage />} />
          <Route path="/partnership-signup" element={<PartnershipSignup />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />

          {/* ✅ Recruiting & Profiles */}
          <Route path="/coach-recruiting" element={<CoachRecruitingPage />} />
          <Route path="/player-recruiting" element={<PlayerRecruitingPage />} />
          <Route path="/edit-profile" element={<EditProfile />} />

          {/* ✅ Rankings Pages */}
          <Route path="/high-school-rankings" element={<HighSchoolRankings />} />
          <Route path="/rankings/valorant" element={<Valorant />} />

          {/* ✅ Tournament Pages */}
          <Route path="/tournament-bracket" element={<TournamentBracket />} />
          <Route path="/tournament-rankings" element={<TournamentRankings />} />
          <Route path="/tournament-player-profile" element={<TournamentPlayerProfile />} />
          
          {/* ✅ Authentication & User Management */}
          <Route path="/login" element={<Login />} />
          <Route path="/user-selection" element={<UserTypeSelection />} />
          <Route path="/signup/player" element={<Signup />} />
          <Route path="/signup/coach" element={<CoachSignup />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
