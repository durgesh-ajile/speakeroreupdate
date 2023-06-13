import React from "react";
import "./gold.css";
import clock from "../../images/clock 1.png";
import diverse from "../../images/online-conference 1.png";
import cut from "../../images/greeting 1.png";
import handshake from "../../images/handshake 1.png";
import authority from "../../images/chairman 1.png";
import global from "../../images/international 1.png";
import { Link } from "react-router-dom";

const Goldmine = () => {
  return (
    <div className="gold-container">
      <div className="gold-left">
        <div className="gold-top">
          <div className="gold-box">
            <img src={clock} />
            <span>Save Time</span>
          </div>
          <div className="gold-box">
            <img src={diverse} />
            <span>Diverse Event</span>
          </div>
          <div className="gold-box">
            <img src={cut} />
            <span>Cut Out Middlemen</span>
          </div>
        </div>
        <div className="gold-top">
          <div className="gold-box">
            <img src={handshake} />
            <span>Freeze<br/> The Deal</span>
          </div>
          <div className="gold-box">
            <img src={authority} />
            <span>Establish Your Authority</span>
          </div>
          <div className="gold-box">
            <img src={global} />
            <span>Go global</span>
          </div>
        </div>
      </div>
      <div className="gold-right">
      <div><h1 style={{ marginBottom:'0', fontWeight:'700' }}>SpeakerOre -</h1></div>
      <div><h1 style={{ color: "#24754F" }}>A GoldMine for Speakers</h1></div>
      <div>
        <ul>
          <li>Save Time to Focus Entirely on Content and Business</li>
          <li>
            Get over 4000 to 40,000 online and in-person events, annually.
          </li>
          <li>
            Cut out middlemen, deal directly with decision makers/ Event
            organisers/ HRs
          </li>
          <li>First Mover Advantage to freeze the deal.</li>
          <li>Establish your Authority as an Expert</li>
          <li>Go global easily!</li>
        </ul>
      </div>
      <div className="joinowbtn" style={{textAlign:'left'}} >
      <Link to='/subscription'><button>Join now</button></Link>
        
      </div>
      </div>
    </div>
  );
};

export default Goldmine;
