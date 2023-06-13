import React, { useEffect, useState } from "react";
import LoginPopup from "../utilities/Pop/LoginPopup";
import axios from "axios";
import { useRef } from 'react'
import './Navbar.css'
import logo from '../../src/images/mobilelogo.png'
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from 'react-icons/gi';
import { Button } from "@mui/material";


// import logo from '../../assets/img/logo.jpg'
// import hambergure_icon from '../../assets/img/hamburger_icon.jpg'

const MobileNavbar = ({userData, isAuthenticated}) => {
    const [sidebarToggle, setSidebarToggle] = useState(true)
    const NavbarboxRef = useRef(null);

    const handleToggle = () => {
        const box = NavbarboxRef.current;
        // Apply initial styles
        box.style.transition = 'transform 0.3s ease-in-out';
        box.style.transform = sidebarToggle && 'translateX(70%)' ;
        box.style.right = !sidebarToggle && '-21%' ;
        box.style.display = sidebarToggle ?  'block':'none' ;

        // Delay style changes to ensure initial styles are applied before transition
        setTimeout(() => {
            box.style.transition = 'transform 0.3s ease-out';
            box.style.transform = sidebarToggle ? 'translateX(-0%)' : 'translateX(70%)';
            box.style.right = sidebarToggle ? '0%' : '-21%';
        }, 200);
        setSidebarToggle(!sidebarToggle)
    };

    

    return (<>
        <div className='Navbar_coontainer'>
            <div className="Navbar_logo">
                <img src={logo} alt="" />
            </div>
            <div onClick={() => handleToggle()} className="Navbar_hambergure_icon">
                <h6>HI {userData}!</h6>
                <GiHamburgerMenu/>
            </div>
        </div>
        {
            // !sidebarToggle &&
            <div ref={NavbarboxRef} id='Navbar_sidebar_id' className='Navbar_sidebar'>
                <div>
                    <div>

                        <img src={logo} alt="" />
                    </div>
                    <div className='Navbar_inputfield'>
                        <div>
                        <Link to='/event'>
                            <div className="nav-select" onClick={() => handleToggle()}>Events</div>

                        </Link>
                        <Link to='/createnewevent'>
                            <div className="nav-select" onClick={() => handleToggle()}>Create new event</div>
                          
                        </Link>
                        <Link to='/subscription'>
                            <div className="nav-select" onClick={() => handleToggle()}>Upgrade</div>
                          
                        </Link>
                        <Link to='/profile'>
                            <div className="nav-select" onClick={() => handleToggle()}>View Profile</div>
                          
                        </Link>

                        </div>
                    </div>
                </div>
            </div>
        }
    </>
    )
}


const Navbar = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isAuthenticated, setIsAutheticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState("");

  useEffect(() => {
    setLoading(true);
    axios({
      method: "get",
      url: "https://sobacke.in/api/auth/check",
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
        url: "https://sobacke.in/api/getprofile",
        withCredentials: true,
      })
        .then((res) => {
          if(res.data.status){
            setUserData(res.data.response.first_name);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loading]);
  // console.log(userData)

  const handleSignInClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  console.log(showPopup);

  return (
    <div>
    <MobileNavbar isAuthenticated = {isAuthenticated}/>
      <div className="bg-navbar">
      <Link to='/'> <div className="bg-logo"></div></Link>
        
        <div className="bg-nav">
          {isAuthenticated && (
            <div className="bg-nav">
            <Link to='/event'>
            <a className="bg-events" >
                Events
              </a>
            </Link>
            <Link to='/createnewevent'>
            <a className="bg-events">
                Create New Event
              </a>
            </Link>
              <Link to='/subscription'>

              <button className="bg-btn">Upgrade</button>
              </Link>
              <span >| </span>
              <Link to='/profile'>
              <span className="nav-name"> Hi {userData}!</span>
              </Link>
            </div>
          )}
          {!isAuthenticated && (
            <>
              <Button variant="outlined" className="bg-sign-up" onClick={handleSignInClick}>
                Sign Up
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
