import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';
import rainbowStar from '../assets/rainbow_star.png'; // Adjust the path as needed
import eLogoWhite from '../assets/eLOGO_white.png'; // Adjust the path as needed

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    full_name: '',
    school: '',
    coach_email: '',
    guardian_email: '',
    gpa: '',
    transcript: null,
    games_played: [],
    highest_ranks: {}, 
    trackergg_profile: '',
  });

  const [message, setMessage] = useState('');

  const rankOptions = {
    Valorant: ['Iron', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Ascendant', 'Immortal', 'Radiant'],
    'Rocket League': ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Champion', 'Grand Champion', 'Supersonic Legend'],
    'Super Smash': ['Beginner', 'Intermediate', 'Advanced', 'Pro'],
    Overwatch: ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Master', 'Grandmaster', 'Top 500'],
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        games_played: checked
          ? [...prevData.games_played, value]
          : prevData.games_played.filter((game) => game !== value),
        highest_ranks: {
          ...prevData.highest_ranks,
          [value]: prevData.highest_ranks[value] || '',
        },
      }));
    } else if (type === 'file') {
      setFormData({ ...formData, transcript: e.target.files[0] });
    } else if (name.startsWith('rank_')) {
      const game = name.split('_')[1];
      setFormData((prevData) => ({
        ...prevData,
        highest_ranks: {
          ...prevData.highest_ranks,
          [game]: value,
        },
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', marginTop: '80px', padding: '15px', background: '#1e1e1e', borderRadius: '8px', boxShadow: '0 0 8px rgba(255, 255, 255, 0.1)', color: 'white' }}>
    {/* Logo and Title */}
    <div style={{ textAlign: 'center', marginBottom: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <img src={eLogoWhite} alt="E Logo" style={{ width: '80px', marginRight: '5px' }} /> 
      <img src={rainbowStar} alt="Rainbow Star" style={{ width: '40px' }} />
    </div>

    {message && <p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '12px', color: message.includes('Error') ? 'red' : 'green' }}>{message}</p>}

    <form style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Email & Full Name */}
      <div style={{ display: 'flex', gap: '5px' }}>
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required 
               style={{ flex: 1, padding: '8px', fontSize: '12px', borderRadius: '4px', background: '#2c2c2c', color: 'white' }} />
        <input name="full_name" value={formData.full_name} onChange={handleChange} placeholder="Full Name" required 
               style={{ flex: 1, padding: '8px', fontSize: '12px', borderRadius: '4px', background: '#2c2c2c', color: 'white' }} />
      </div>

      {/* Password & Confirm Password */}
      <div style={{ display: 'flex', gap: '5px', marginTop: '5px' }}>
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required 
               style={{ flex: 1, padding: '8px', fontSize: '12px', borderRadius: '4px', background: '#2c2c2c', color: 'white' }} />
        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" required 
               style={{ flex: 1, padding: '8px', fontSize: '12px', borderRadius: '4px', background: '#2c2c2c', color: 'white' }} />
      </div>

      {/* Guardian Email & Coach Email */}
      <div style={{ display: 'flex', gap: '5px', marginTop: '5px' }}>
        <input name="guardian_email" value={formData.guardian_email} onChange={handleChange} placeholder="Guardian Email"
               style={{ flex: 1, padding: '8px', fontSize: '12px', borderRadius: '4px', background: '#2c2c2c', color: 'white' }} />
        <input name="coach_email" value={formData.coach_email} onChange={handleChange} placeholder="Coach Email"
               style={{ flex: 1, padding: '8px', fontSize: '12px', borderRadius: '4px', background: '#2c2c2c', color: 'white' }} />
      </div>

      {/* School & GPA */}
      <div style={{ display: 'flex', gap: '5px', marginTop: '5px' }}>
        <input name="school" value={formData.school} onChange={handleChange} placeholder="School" required 
               style={{ flex: 1, padding: '8px', fontSize: '12px', borderRadius: '4px', background: '#2c2c2c', color: 'white' }} />
        <input name="gpa" type="number" value={formData.gpa} onChange={handleChange} placeholder="GPA" 
               style={{ flex: 1, padding: '8px', fontSize: '12px', borderRadius: '4px', background: '#2c2c2c', color: 'white' }} />
      </div>

      {/* Transcript Upload */}
      <label style={{ marginTop: '5px', fontSize: '12px' }}>Transcript Upload <span style={{ color: 'gray' }}>(Optional)</span></label>
      <input type="file" accept=".pdf,.png,.jpg" onChange={handleChange} style={{ fontSize: '12px', marginBottom: '5px' }} />

      {/* Tracker.gg Profile */}
      <label style={{ fontSize: '12px' }}>Tracker.gg Profile <span style={{ color: 'gray' }}>(Optional)</span></label>
      <input name="trackergg_profile" value={formData.trackergg_profile} onChange={handleChange} placeholder="Tracker.gg Profile"
             style={{ padding: '8px', fontSize: '12px', borderRadius: '4px', background: '#2c2c2c', color: 'white' }} />

      {/* Games Played */}
      <label style={{ marginTop: '5px', fontSize: '12px' }}>Games Played:</label>
      <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '5px' }}>
        {Object.keys(rankOptions).map((game) => (
          <div key={game} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
            <label style={{ fontSize: '12px', marginRight: '5px' }}>
              <input type="checkbox" name="games_played" value={game} checked={formData.games_played.includes(game)} onChange={handleChange} />
              {game}
            </label>
            {formData.games_played.includes(game) && (
              <select name={`rank_${game}`} value={formData.highest_ranks[game] || ''} onChange={handleChange}
                      style={{ padding: '4px', fontSize: '12px', borderRadius: '4px', background: '#2c2c2c', color: 'white', marginLeft: '5px' }}>
                <option value="">Select Rank</option>
                {rankOptions[game].map((rank) => (
                  <option key={rank} value={rank}>{rank}</option>
                ))}
              </select>
            )}
          </div>
        ))}
      </div>

      {/* Signup Button */}
      <button type="submit" style={{ padding: '8px', fontSize: '14px', background: '#4CAF50', color: 'white', borderRadius: '4px', cursor: 'pointer', transition: 'background 0.3s' }}
        onMouseEnter={(e) => e.target.style.background = '#800080'}
        onMouseLeave={(e) => e.target.style.background = '#4CAF50'}
      >
        Signup
      </button>
    </form>

    {/* Resend Verification Button */}
    <button style={{ padding: '8px', fontSize: '14px', marginTop: '5px', background: '#ff9800', color: 'white', borderRadius: '4px', cursor: 'pointer' }}>Resend Verification Email</button>

    {/* Login Link */}
    <p style={{ textAlign: 'center', fontSize: '12px',color: 'white', marginTop: '5px' }}>
      Already have an account? <Link to="/login" style={{ color: '#4CAF50' }}>Login</Link>
    </p>
  </div>

  );
};

export default Signup;
