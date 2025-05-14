import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Link, useNavigate } from 'react-router-dom';
import evalLogo from '../assets/eLOGO_black.png'; // Ensure this path is correct
import rainbowStar from '../assets/rainbow_star.png'; // Ensure this path is correct

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "EVAL | Login";
    
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/dashboard'); // Redirect to dashboard if already logged in
      }
    };
    checkUser();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Login Error:", error.message);
        setMessage(`Login failed: ${error.message}`);
      } else {
        console.log("Login successful!", data);
        setMessage("Login successful! Redirecting...");
        // Redirect to profile page after successful login
        navigate('/profile');
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      setMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setMessage("Please enter your email address to reset your password");
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) {
        setMessage(`Error sending reset email: ${error.message}`);
      } else {
        setMessage('Password reset email sent! Please check your inbox.');
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      setMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
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
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      maxWidth: '400px',
      margin: '0 auto',
    },
    logoContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '10px',
    },
    logo: {
      width: '200px',
    },
    star: {
      width: '40px',
      marginLeft: '10px',
    },
    form: {
      width: '100%',
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
      backgroundColor: 'white',
      border: '2px solid purple',
      borderRadius: '4px',
      padding: '8px',
      width: '100%',
      marginBottom: '10px',
    },
    button: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    buttonHover: {
      backgroundColor: 'purple',
    },
    link: {
      color: 'black',
      textDecoration: 'none',
      marginTop: '10px',
    },
    signupLink: {
      color: 'blue',
      textDecoration: 'none',
    },
    text: {
      color: 'black',
      whiteSpace: 'nowrap',
    },
    errorMessage: {
      color: 'red',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.logoContainer}>
        <img src={evalLogo} alt="eVAL Logo" style={styles.logo} />
        <img src={rainbowStar} alt="Rainbow Star" style={styles.star} />
      </div>
      <h3 style={styles.text}>Eval Athlete Login</h3>
      {message && (
        <p style={message.includes('Error') ? styles.errorMessage : styles.text}>
          {message}
        </p>
      )}
      <form onSubmit={handleLogin} style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
            disabled={isLoading}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
            disabled={isLoading}
          />
        </div>
        <button 
          type="submit" 
          style={{
            ...styles.button,
            opacity: isLoading ? 0.7 : 1,
            cursor: isLoading ? 'not-allowed' : 'pointer'
          }}
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Log In'}
        </button>
      </form>
      <button 
        onClick={handleForgotPassword} 
        style={{
          ...styles.link,
          opacity: isLoading ? 0.7 : 1,
          cursor: isLoading ? 'not-allowed' : 'pointer'
        }}
        disabled={isLoading}
      >
        Forgot Password?
      </button>
      <p style={styles.text}>
        <span>Not a member? </span>
        <Link to="/user-selection" style={styles.signupLink}>Signup now</Link>
      </p>
    </div>
  );
};

export default Login;