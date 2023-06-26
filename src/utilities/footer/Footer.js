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
        <a rel="noreferrer" href='https://www.facebook.com/speakerore' target="_blank"><BsFacebook /></a>
        <a rel="noreferrer" href='https://www.instagram.com/speakerore/' target="_blank"><GrInstagram /></a>
        <a rel="noreferrer" href='https://www.linkedin.com/in/speakerore' target="_blank"><AiFillLinkedin /></a>
        <a rel="noreferrer" href='https://twitter.com/speakerore' target="_blank"><AiFillTwitterCircle /></a>
      </div>
      <div className="events">
        <Link to='/event'><p>Events</p></Link>
        <Link to='/createnewevent'><p>Create New Events</p></Link>
        <Link to='/subscription'> <p>Upgrade</p></Link>
        <Link to='/termsandconditions' target="_blank"><p>Terms and Conditions</p></Link>
        <Link to='/privacypolicy' target="_blank"><p>Privacy Policy</p></Link>
        <Link to='/faq' target="_blank"> <p>FAQ's</p></Link>
      </div>
      <div className="copyright">
        <p>Copyright SpeakerOre@2023 | All rights reserved</p>
      </div>
    </div>
  );
};

export default Footer;
