import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import evalLogo from '../assets/eLOGO_black.png'; // Ensure this path is correct
import rainbowStar from '../assets/rainbow_star.png'; // Ensure this path is correct

const CoachSignup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    school: '',
    gamesSupported: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send email using EmailJS
    emailjs.send('service_lw88nos', 'template_oesxzwc', formData, 'XzrvON3zMpUj1nqa1')
      .then((response) => {
        console.log('Email sent successfully!', response.status, response.text);
        setSubmitted(true); // Update submission status
      })
      .catch((err) => {
        console.error('Failed to send email:', err);
      });
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
      border: '1px solid #ccc',
      backgroundColor: 'white',
      border: '2px solid purple',
      borderRadius: '4px',
      padding: '8px',
      width: '100%',
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
      {submitted ? (
        <div style={styles.confirmation}>
          <div style={styles.logoContainer}>
            <img src={evalLogo} alt="eVAL Logo" style={styles.logo} />
            <img src={rainbowStar} alt="Rainbow Star" style={styles.star} />
          </div>
          <h1>Sign Up Complete</h1>
          <p>
            Please look for an email to schedule a call to confirm your school affiliation and receive access to the recruiting database.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.logoContainer}>
            <img src={evalLogo} alt="eVAL Logo" style={styles.logo} />
            <img src={rainbowStar} alt="Rainbow Star" style={styles.star} />
          </div>
          <h1 style={styles.headline}>Find Your Players. Build Your Team.</h1>
         
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
            <label style={styles.label}>Games Supported</label>
            <input
              type="text"
              name="gamesSupported"
              value={formData.gamesSupported}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <button
            type="submit"
            style={styles.button}
            onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
          >
            Start Recruiting Now
          </button>
        </form>
      )}
    </div>
  );
};

export default CoachSignup; 