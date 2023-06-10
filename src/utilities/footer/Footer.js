import React from "react";
import "./footer.css";
import { BsFacebook } from "react-icons/bs";
import { GrInstagram } from "react-icons/gr";
import { AiFillLinkedin } from "react-icons/ai";
import { AiFillTwitterCircle } from "react-icons/ai";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="social">
        <BsFacebook />
        <GrInstagram />
        <AiFillLinkedin />
        <AiFillTwitterCircle />
      </div>
      <div className="events">
        <span>Events</span>
        <span>Create New Events</span>
        <span>Upgrade</span>
        <span>Terms and Conditions</span>
      </div>
      <div className="copyright">
        <p>Copyright SpeakerOre@2023 | All rights reserved</p>
      </div>
    </div>
  );
};

export default Footer;
