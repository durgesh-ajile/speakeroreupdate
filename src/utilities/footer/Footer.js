import React from "react";
import "./footer.css";
import { BsFacebook } from "react-icons/bs";
import { GrInstagram } from "react-icons/gr";
import { AiFillLinkedin } from "react-icons/ai";
import { AiFillTwitterCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="social">
       <a href='https://www.facebook.com/speakerore'><BsFacebook /></a>
       <a href='https://www.instagram.com/speakerore/'><GrInstagram /></a>
       <a href='https://www.linkedin.com/in/speakerore'><AiFillLinkedin /></a> 
       <a href='https://twitter.com/speakerore'><AiFillTwitterCircle /></a> 
      </div>
      <div className="events">
      <Link to='/event'><span>Events</span></Link>
      <Link to='/createnewevent'><span>Create New Events</span></Link>
      <Link to='/subscription'> <span>Upgrade</span></Link>
      <Link to='/termsandconditions'><span>Terms and Conditions</span></Link> 
      <Link to='/privacypolicy'><span>Privacy Policy</span></Link> 
      <Link to='/faq'> <span>FAQ's</span></Link>
      </div>
      <div className="copyright">
        <p>Copyright SpeakerOre@2023 | All rights reserved</p>
      </div>
    </div>
  );
};

export default Footer;
