import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import evalLogo from '../assets/eLOGO_black.png'; // Ensure this path is correct
import rainbowStar from '../assets/rainbow_star.png'; // Ensure this path is correct

const CoachSignup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    school: '',
    gamesSupported: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "EVAL | Coach Signup";
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setMessage('Error: Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      // 1. Sign up the coach with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError) throw authError;

      // 2. Create the coach profile in the coaches table
      const { error: profileError } = await supabase
        .from('coaches')
        .insert([
          {
            id: authData.user.id,
            first_name: formData.firstName,
            last_name: formData.lastName,
            school: formData.school,
            games_supported: formData.gamesSupported.split(',').map(game => game.trim()),
            email: formData.email,
          },
        ]);

      if (profileError) throw profileError;

      setMessage('Signup successful! Please check your email for verification.');
      
      // Clear form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        school: '',
        gamesSupported: '',
      });

      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);

    } catch (error) {
      console.error('Error during signup:', error);
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f9f9f9',
      padding: '10px',
      borderRadius: '2px',
      boxShadow: '0 4px 8px rgba(248, 247, 247, 0.81)',
      maxWidth: '400px',
      margin: '100px auto',
    },
    logoContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '10px',
    },
    logo: {
      width: '150px',
    },
    star: {
      width: '40px',
      marginLeft: '10px',
    },
    form: {
      width: '75%',
      color: 'black',
    },
    inputGroup: {
      marginBottom: '15px',
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      fontWeight: 'bold',
      color: 'black',
    },
    input: {
      width: '100%',
      padding: '8px',
      border: '2px solid purple',
      backgroundColor: 'white',
      borderRadius: '4px',
    },
    
    button: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    buttonHover: {
      backgroundColor: 'purple',
    },
    confirmation: {
      textAlign: 'center',
      color: 'black',
    },
    headline: {
      fontSize: '1.5em',
      fontWeight: 'bold',
      marginBottom: '10px',
    },
    subtext: {
      fontSize: '1em',
      marginBottom: '20px',
    },
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.logoContainer}>
          <img src={evalLogo} alt="eVAL Logo" style={styles.logo} />
          <img src={rainbowStar} alt="Rainbow Star" style={styles.star} />
        </div>
        <h1 style={styles.headline}>Find Your Players. Build Your Team.</h1>
        
        {message && (
          <p style={{ 
            textAlign: 'center', 
            color: message.includes('Error') ? 'red' : 'green',
            marginBottom: '15px'
          }}>
            {message}
          </p>
        )}

        <div style={styles.inputGroup}>
          <label style={styles.label}>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>School Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>School</label>
          <input
            type="text"
            name="school"
            value={formData.school}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Games Supported (comma-separated)</label>
          <input
            type="text"
            name="gamesSupported"
            value={formData.gamesSupported}
            onChange={handleChange}
            placeholder="e.g., Valorant, Rocket League, Overwatch"
            required
            style={styles.input}
          />
        </div>
        <button
          type="submit"
          style={{
            ...styles.button,
            opacity: loading ? 0.7 : 1,
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
          disabled={loading}
        >
          {loading ? 'Signing up...' : 'Start Recruiting Now'}
        </button>
      </form>
    </div>
  );
};

export default CoachSignup; 