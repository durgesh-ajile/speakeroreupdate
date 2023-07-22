import React, { useEffect, useState } from "react";
import "./gold.css";
import clock from "../../images/clock 1.png";
import diverse from "../../images/online-conference 1.png";
import cut from "../../images/greeting 1.png";
import handshake from "../../images/handshake 1.png";
import authority from "../../images/chairman 1.png";
import global from "../../images/international 1.png";
import { Link } from "react-router-dom";
import Categories from "../agriculture/Categories";
import LoginPopup from "../Pop/LoginPopup";
import axios from "axios";

const Goldmine = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
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

  const [cerousel, setCarousel] = useState([
    ["Delegate the search for speaking gigs and focus on driving business innovation and success", clock],
    ["Discover diverse speaking opportunities in endless categories", diverse],
    [
      "Connect directly, bypass unnecessary intermediaries",
      cut,
    ],
    ["Be a first mover, land impactful speaking gigs and stay ahead of the competition", handshake],
    ["Speak to establish your authority, build credibility and recognition", authority],
    ["Speak to global audiences, expand your reach worldwide", global],
  ]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
  };
  const handleSignInClick = () => {
    setShowPopup(true);
  };

  return (
    <>
      <div className="Goldmine_container">
        <div className="Goldmine_container_fluid">
          {windowWidth <= 500 ? (
            <>
            <Categories data={cerousel} />
            <div className="joinowbtn">
        {isAuthenticated?<Link to='/subscription'><button>Join now</button></Link>:
        <><button onClick={handleSignInClick}>Join now</button>{showPopup && <LoginPopup onClose={handleClosePopup} />}</>}
      </div>
            </>
          ) : (
            <div className="Goldmine_container_fluid_left">
              <div className="Goldmine_container_fluid_left_img">
                <div className="Goldmine_container_fluid_left_img_N_p">
                  <img alt="img" src={clock} />
                  <p>Save Time</p>
                </div>
                <div className="Goldmine_container_fluid_left_img_N_p">
                  <img alt="img" src={diverse} />
                  <p>Diverse Event</p>
                </div>
                <div className="Goldmine_container_fluid_left_img_N_p">
                  <img alt="img" src={cut} />
                  <p>Cut Out Middlemen</p>
                </div>
              </div>
              <div className="Goldmine_container_fluid_left_img">
                <div className="Goldmine_container_fluid_left_img_N_p">
                  <img alt="img" src={handshake} />
                  <p>
                    Freeze
                    <br /> The Deal
                  </p>
                </div>
                <div className="Goldmine_container_fluid_left_img_N_p">
                  <img alt="img" src={authority} />
                  <p>Establish Your Authority</p>
                </div>
                <div className="Goldmine_container_fluid_left_img_N_p">
                  <img alt="img" src={global} />
                  <p>Go global</p>
                </div>
              </div>
            </div>
          )}
          {windowWidth >= 500 && (
            <div className="Goldmine_container_fluid_right">
              <div className="gold-right">
                <h1>SpeakerOre -</h1>
                <h1 style={{ color: "#24754F" }}>A GoldMine for Speakers</h1>
                <div>
                  <ul>
                    <li>Delegate the search for speaking gigs and focus on driving business innovation and success</li>
                    <li>
                    Discover diverse speaking opportunities in endless categories
                    </li>
                    <li>
                    Connect directly, bypass unnecessary intermediaries

                    </li>
                    <li>Be a first mover, land impactful speaking gigs and stay ahead of the competition</li>
                    <li>Speak to establish your authority, build credibility and recognition</li>
                    <li>Speak to global audiences, expand your reach worldwide</li>
                  </ul>
                </div>
                <div className="joinowbtn">
                  {isAuthenticated ? (
                    <Link to="/subscription">
                      <button>Join now</button>
                    </Link>
                  ) : (
                    <>
                      <button onClick={handleSignInClick}>Join now</button>
                      {showPopup && <LoginPopup onClose={handleClosePopup} />}
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Goldmine;
