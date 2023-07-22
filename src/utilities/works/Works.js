import React, { useEffect, useState } from "react";
import "./works.css";
import savetime from "../../images/savetime.png";
import goal1 from "../../images/goal.png";
import partnership from "../../images/partnership.png";
import vector from "../../images/Vector.png";
import axios from "axios";
import debate from '../../images/debate-1.png'
import fan from '../../images/fan-club-1.png'
import list from '../../images/list-1.png'
import { Link } from "react-router-dom";
import LoginPopup from "../Pop/LoginPopup";


const Works = () => {
  const [left, setLeft] = useState(true);
  const [right, setRight] = useState(false);
  const [isAuthenticated, setIsAutheticated] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    axios({
      method: "get",
      url: "https://api.speakerore.com/api/auth/check",
      withCredentials: true,
    })
      .then((res) => {
        if (res.status === 202) {
          setIsAutheticated(true);
        }
      })
      .catch((err) => {
        console.log(err.response.status);
        if (err.response.status === 401) {
          setIsAutheticated(false);
        }
      });
  }, []);

  const handleLeft = () => {
    setLeft(true);
    setRight(false)
  }

  const handleRight = () => {
    setRight(true)
    setLeft(false);
  }
  const handleClosePopup = () => {
    setShowPopup(false);
  };
  const handleSignInClick = () => {
    setShowPopup(true);
  };


  return (
    <div className="workcontainer">
      <div className="works-heading">
        <h2>Unearth Your Speaking Success:
</h2>
        <span>Mining the Opportunities Ahead</span>
      </div>
      <div className="in-swap">
        <div className="swapbutton">
          <button onClick={handleLeft} className={left === true ? "green" : "initial"}>I am a Speaker</button>
          <button onClick={handleRight} className={right === true ? "green" : "initial"}>I am an Event Manager</button>
        </div>
      </div>

      {left === true ?
        <div className="works-container " >
          <div className="works-box1">
            <img alt="img" src={savetime} style={{ backgroundImage: { vector } }} />
            <p> Streamline your search to save<br /> time, effort & money</p>
          </div>
          <div className="works-box1">
            <img alt="img" src={partnership} /> 
            <p> Finalize directly with <br /> event organizers, eliminating middlemen<br /> and delays</p>
          </div>
          <div className="works-box1">
            <img alt="img" src={goal1} />
            <p>Speak to make an Impact: Achieve <br /> your goals, attract clients and investments,<br /> and become a powerful influencer</p>
          </div>
        </div>
        :
        <div className="works-container">
          <div className="works-box1">
            <img alt="img" src={list} style={{ backgroundImage: { vector } }} />
            <p> 
            Effortlessly share event<br /> requirements for free
            </p>
          </div>

          <div className="works-box1">
            <img alt="img" src={debate} />
            <p>Finalize with amongst speakers <br /> <bold> who match your vision</bold></p>
          </div>

          <div className="works-box1">
            <img alt="img" src={fan} />
            <p>Create a remarkable <br /> event experience</p>
          </div>
        </div>}

      <div className="joinowbtn">
        {isAuthenticated?<Link to='/subscription'><button>Join now</button></Link>:
        <><button onClick={handleSignInClick}>Join now</button>{showPopup && <LoginPopup onClose={handleClosePopup} />}</>}
      </div>
    </div>
  );
};

export default Works;
