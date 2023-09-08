import React, { useEffect, useState } from "react";
import LoginPopup from "../utilities/Pop/LoginPopup";
import axios from "axios";
import { useRef } from "react";
import "./Navbar.css";
import logo from "../../src/images/mobilelogo.png";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { Button } from "@mui/material";
import { IoMdLogOut } from "react-icons/io";
import FacebookNoEmail from "../utilities/Pop/FacebookNoEmail";

// import logo from '../../assets/img/logo.jpg'
// import hambergure_icon from '../../assets/img/hamburger_icon.jpg'

const MobileNavbar = ({
  userData,
  isAuthenticated,
  showPopup,
  setShowPopup,
  select,
  setSelect,
  setLoading,
  emailExist
}) => {
  const [sidebarToggle, setSidebarToggle] = useState(true);
  const NavbarboxRef = useRef(null);

  const handleLogout = () => {
    axios({
      method: "get",
      url: "https://api.speakerore.com/api/logout",
      withCredentials: true,
    })
      .then((res) => {
        window.location.reload();
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleToggle = () => {
    const box = NavbarboxRef.current;
    // Apply initial styles
    box.style.transition = "transform 0.3s ease-in-out";
    box.style.transform = sidebarToggle && "translateX(70%)";
    box.style.right = !sidebarToggle && "-21%";
    box.style.display = sidebarToggle ? "block" : "none";

    // Delay style changes to ensure initial styles are applied before transition
    setTimeout(() => {
      box.style.transition = "transform 0.3s ease-out";
      box.style.transform = sidebarToggle
        ? "translateX(-0%)"
        : "translateX(70%)";
      box.style.right = sidebarToggle ? "0%" : "-21%";
    }, 200);
    setSidebarToggle(!sidebarToggle);
  };
  const handleSignInClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <div className="Navbar_coontainer">
        <Link to="/">
          <div className="Navbar_logo">
            <img src={logo} alt="" />
          </div>
        </Link>
        {isAuthenticated ? (
          <div
            onClick={() => handleToggle()}
            style={{ color: "#24754F" }}
            className="Navbar_hambergure_icon"
          >
            <h4 style={{ marginRight: "10px" }}>HI {userData}!</h4>
            <GiHamburgerMenu />
            {showPopup && <LoginPopup onClose={handleClosePopup} />}
          </div>
        ) : (
          <>
          <div style={{display:'flex'}}>
            <Button
              variant="outlined"
              className="bg-sign-up"
              onClick={handleSignInClick}
            >
              SignUp/ SignIn
            </Button>
            <div
            onClick={() => handleToggle()}
            style={{ color: "#24754F", marginLeft:'20px' }}
            className="Navbar_hambergure_icon"
          >
            {/* <h4 style={{ marginRight: "10px" }}>HI {userData}!</h4> */}
            <GiHamburgerMenu />
            </div>
          </div>
          </>
        )}
      </div>
      {!sidebarToggle && (
        <div
          onClick={() => handleToggle()}
          className="Eventlist_speakerore_sidebar_empty_div"
        ></div>
      )}
      {
        // !sidebarToggle &&
        <div
          ref={NavbarboxRef}
          id="Navbar_sidebar_id"
          className="Navbar_sidebar"
        >
          <div>
            <div>
              <img src={logo} alt="" />
            </div>
            <div className="Navbar_inputfield">
              {isAuthenticated ?  
              <div>
              {!emailExist && <FacebookNoEmail setLoading={setLoading} />}
                <Link to="/event" onClick={() => {
                  setSelect('event')
                }}>
                  <div className="nav-select" id={select === 'event' ? 'side-select' :''} onClick={() => handleToggle()}>
                    Events
                  </div>
                </Link>
                <Link to="/createnewevent" onClick={() => {
                  setSelect('create')
                }}>
                  <div className="nav-select" id={select === 'create' ? 'side-select' :''} onClick={() => handleToggle()}>
                    Create new event
                  </div>
                </Link>
                <Link to="/subscription" onClick={() => {
                  setSelect('subs')
                }}>
                  <div className="nav-select" id={select === 'subs' ? 'side-select' :''} onClick={() => handleToggle()}>
                    Upgrade
                  </div>
                </Link>
                <Link to="/profile" onClick={() => {
                  setSelect('pro')
                }}>
                  <div className="nav-select" id={select === 'pro' ? 'side-select' :''} onClick={() => handleToggle()}>
                    View Profile
                  </div>
                </Link>
              </div> : <>
              <div>
                <Link to="/event" onClick={handleSignInClick}>
                  <div className="nav-select" id={select === 'event' ? 'side-select' :''} onClick={() => handleToggle()}>
                    Events
                  </div>
                </Link>
                <Link to="/createnewevent" onClick={handleSignInClick}>
                  <div className="nav-select" id={select === 'create' ? 'side-select' :''} onClick={() => handleToggle()}>
                    Create new event
                  </div>
                </Link>
                <Link to="/subscription" onClick={handleSignInClick}>
                  <div className="nav-select" id={select === 'subs' ? 'side-select' :''} onClick={() => handleToggle()}>
                    Upgrade
                  </div>
                </Link>
                <Link to="/profile" onClick={handleSignInClick}>
                  <div className="nav-select" id={select === 'pro' ? 'side-select' :''} onClick={() => handleToggle()}>
                    View Profile
                  </div>
                </Link>
              </div>
              </>}
             
            </div>
            <hr />
            {isAuthenticated ?
              <div className="logout" style={{marginTop:'20px'}} >
              <Button variant="outlined" color="error" onClick={handleLogout}>
                {" "}
                <IoMdLogOut /> <span style={{margin:'2px 0 0 3px'}}>Logout</span>
              </Button>
            </div>: null}
            
          </div>
        </div>
      }
    </>
  );
};

const Navbar = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isAuthenticated, setIsAutheticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState("");
  const [select, setSelect] = useState('');
const [emailExist, setEmailExist] = useState(true);

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

  useEffect(() => {
    if (isAuthenticated) {
      axios({
        method: "get",
        url: "https://api.speakerore.com/api/getprofile",
        withCredentials: true,
      })
        .then((res) => {
          if (res.data.status) {
            console.log(res.data)
            setUserData(res.data.response.first_name);
          }
          if (res.data.response.email){
            setEmailExist(true)
          } else {
            setEmailExist(false)
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loading]);
  console.log(emailExist)

  const handleSignInClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };


  return (
    <div>
      <MobileNavbar
        isAuthenticated={isAuthenticated}
        userData={userData}
        showPopup={showPopup}
        setShowPopup={setShowPopup}
        select={select}
        setSelect={setSelect}
        setLoading={setLoading}
        emailExist={emailExist}
      />
      <div className="bg-navbar">
        <Link to="/">
          {" "}
          <div className="bg-logo"></div>
        </Link>

        <div className="bg-nav">
          {isAuthenticated && (
            <div className="bg-nav">
              <Link to="/event" onClick={() => {
                  setSelect('event')
                }}>
                <a className="bg-events" id={select === 'event' ? 'nav-select' :''}>Events</a>
              </Link>
              <Link to="/createnewevent" onClick={() => {
                  setSelect('create')
                }}>
                <a className="bg-events" id={select === 'create' ? 'nav-select' :''}>Create New Event</a>
              </Link>
              <Link to="/subscription" onClick={() => {
                  setSelect('subs')
                }}>
                <button className="bg-btn">Upgrade</button>
              </Link>
              <span>| </span>
              <Link to="/profile">
                <span className="nav-name"  onClick={() => {
                  setSelect('pro')
                }}> Hi {userData}!</span>
              </Link>
              {!emailExist && <FacebookNoEmail setLoading={setLoading} />}
            </div>
          )}
          {!isAuthenticated && (
            <>
            <div className="bg-nav">
              <Link onClick={handleSignInClick}>
                <a className="bg-events" id={select === 'event' ? 'nav-select' :''}>Events</a>
              </Link>
              <Link onClick={handleSignInClick}>
                <a className="bg-events" id={select === 'create' ? 'nav-select' :''}>Create New Event</a>
              </Link>
              <Link onClick={handleSignInClick}>
                <button className="bg-btn">Upgrade</button>
              </Link>
            </div>
              <Button
                variant="outlined"
                className="bg-sign-up"
                onClick={handleSignInClick}
              >
                SignUp/ SignIn
              </Button>
              {showPopup && <LoginPopup onClose={handleClosePopup} />}

            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
