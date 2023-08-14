import React from "react";
import "./footer.css";
import { BsFacebook } from "react-icons/bs";
import { GrInstagram } from "react-icons/gr";
import { AiFillLinkedin } from "react-icons/ai";
import { AiFillTwitterCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import LoginPopup from "../Pop/LoginPopup";

const Footer = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isAuthenticated, setIsAutheticated] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignInClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    setLoading(true);
    axios({
      method: "get",
      url: "https://api.speakerore.com/api/auth/check",
      withCredentials: true,
    })
      .then((res) => {
        if (res.status === 202) {
          setLoading(false);
          setIsAutheticated(true);
        }
      })
      .catch((err) => {
        console.log(err.response.status);
        if (err.response.status === 401) {
          setLoading(loading);
          setIsAutheticated(false);
        }
      });
  }, []);
  
  return (
    <div className="footer-container">
      <div className="social">
        <a rel="noreferrer" href='https://www.facebook.com/speakerore' target="_blank"><BsFacebook /></a>
        <a rel="noreferrer" href='https://www.instagram.com/speakerore/' target="_blank"><GrInstagram /></a>
        <a rel="noreferrer" href='https://www.linkedin.com/in/speakerore' target="_blank"><AiFillLinkedin /></a>
        <a rel="noreferrer" href='https://twitter.com/speakerore' target="_blank"><AiFillTwitterCircle /></a>
      </div>
      <div className="events">
      {isAuthenticated ? (
        <>
        <Link to='/event'><p>Events</p></Link>
        <Link to='/createnewevent'><p>Create New Events</p></Link>
        </>
      ) : <>
        <Link onClick={handleSignInClick}><p>Events</p></Link>
        <Link onClick={handleSignInClick}><p>Create New Events</p></Link>
        </>
        }
        <Link to='/subscription'> <p>Upgrade</p></Link>
        <Link to='/termsandconditions' target="_blank"><p>Terms and Conditions</p></Link>
        <Link to='/privacypolicy' target="_blank"><p>Privacy Policy</p></Link>
        <Link to='/faq' target="_blank"> <p>FAQ's</p></Link>
        <Link to='/contact' target="_blank"> <p>Contact Us</p></Link>
        {showPopup && <LoginPopup onClose={handleClosePopup} />}
      </div>
      <div className="copyright">
        <p>Copyright SpeakerOre@2023 | All rights reserved</p>
      </div>
    </div>
  );
};

export default Footer;
