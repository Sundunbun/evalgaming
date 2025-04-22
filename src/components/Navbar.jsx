import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import eLogoWhite from '../assets/eLOGO_white.png'; // ✅ Import Logo
import './Navbar.css';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [recruitingDropdownOpen, setRecruitingDropdownOpen] = useState(false);
  const [legalDropdownOpen, setLegalDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) setUser(session.user);
      console.log("User:", session?.user);
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      console.log("Auth Change:", session?.user);
    });

    return () => authListener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      {/* Left Section */}
      <div className="navbar-left">
        {/* ✅ Logo with Home Link */}
        <Link to="/" className="nav-logo">
          <img src={eLogoWhite} alt="EVAL Gaming Logo" className="logo-img" />
        </Link>

       

        {/* Recruiting Dropdown */}
        <div 
          className="dropdown-container" 
          onMouseEnter={() => setRecruitingDropdownOpen(true)} 
          onMouseLeave={() => setRecruitingDropdownOpen(false)}
        >
          <button className="dropdown-btn">Recruiting ▼</button>
          {recruitingDropdownOpen && (
            <div className="dropdown-menu">
              <Link to="/player-recruiting" className="dropdown-item">For Players</Link>
              <Link to="/coach-recruiting" className="dropdown-item">For Coaches</Link>
            </div>
          )}
        </div>

        <Link to="/high-school-rankings" className="nav-link">HS Rankings</Link>
        <Link to="/about" className="nav-link">About</Link>
        <Link to="/partnerships" className="nav-link">Partnerships</Link>
        
        {/* Legal Links */}
        <div 
          className="dropdown-container" 
          onMouseEnter={() => setLegalDropdownOpen(true)} 
          onMouseLeave={() => setLegalDropdownOpen(false)}
        >
          <button className="dropdown-btn">Legal ▼</button>
          {legalDropdownOpen && (
            <div className="dropdown-menu">
              <Link to="/terms-of-service" className="dropdown-item">Terms of Service</Link>
              <Link to="/privacy-policy" className="dropdown-item">Privacy Policy</Link>
            </div>
          )}
        </div>
      </div>

      {/* Right Section */}
      <div className="navbar-right">
        {user ? (
          <div 
            className="dropdown-container" 
            onMouseEnter={() => setProfileDropdownOpen(true)} 
            onMouseLeave={() => setProfileDropdownOpen(false)}
          >
            <button className="dropdown-btn">My Profile ▼</button>
            {profileDropdownOpen && (
              <div className="dropdown-menu">
                <Link to="/edit-profile" className="dropdown-item">Edit Profile</Link>
                <button onClick={handleLogout} className="dropdown-item">Logout</button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="nav-link">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
