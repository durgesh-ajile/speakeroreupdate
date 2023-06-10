import React, { useEffect } from "react";
import "./popus.css";

const LoginPopup = ({ onClose }) => {
  const handleGoogleLogin = () => {
    try {
      window.open("http://localhost:5000/api/auth/google", "_self");
    } catch (error) {
      console.log(error);
    }
  };

  const handleFacebookLogin = () => {
    try {
      window.open("http://localhost:5000/api/auth/facebook", "_self");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="popup">
      <div className="popup-content">
        <button class="google-login-button" onClick={handleGoogleLogin}>
          <span class="google-logo"></span>
          Sign in with Google
        </button>
        <button className="facebook-button" onClick={handleFacebookLogin}>Login with Facebook</button>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default LoginPopup;
