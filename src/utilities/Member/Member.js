import React, { useEffect, useState } from "react";
import { IoMdLogOut } from "react-icons/io";
import axios from "axios";
import { Button } from "@mui/material";
import Archived from "../../components/Tables/Archived/Archived1";
import CurrentUserEvent from "../../components/CurrentUser.js/CurrentUserEvent";
import { Link } from "react-router-dom";

const Member = () => {
  const [subs, setSubs] = useState("event");
  const [userData, setUserData] = useState("");
  const [affiliatData, setAffiliatData] = useState("");
  const [affiliatPost, setAffiliatPost] = useState(false);

  const [role, setRole] = useState("");
  useEffect(() => {
    axios({
      method: "get",
      url: "https://api.speakerore.com/api/getprofile",
      withCredentials: true,
    })
      .then((res) => {
        if (res.data.status) {
          setUserData(res.data.response);
          setRole(res.data.response.role);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(userData)

  const handleAffiliateSubmit = () => {
    axios({
      method: "post",
      url: "https://api.speakerore.com/api/createaffilatecoupon",
      withCredentials: true,
    })
      .then((res) => {
        if (res.data.status) {
         setAffiliatPost(true)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    axios({
      method: "get",
      url: "https://api.speakerore.com/api/getaffilatecoupon",
      withCredentials: true,
    })
      .then((res) => {
        setAffiliatData(res.data.affilateCoupon);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    }, [])
  console.log(affiliatData)
  

  const handleLogout = () => {
    axios({
      method: "get",
      url: "https://api.speakerore.com/api/logout",
      withCredentials: true,
    })
      .then((res) => {
        window.location.reload()
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // console.log(userEvent);

  
  const handlesubs = () => {
    setSubs("subs");
  };
  const handleevent = () => {
    setSubs("event");
  };
  const handleAffiliate = () => {
    setSubs("affs");
  };
  const handleArcheived = () => {
    setSubs("archeived");
  };
  function convertDate2(e) {
    const date = new Date(e).toLocaleDateString();
    return date;
  }
  console.log(affiliatData);
  console.log(userData);

  return (
    <>
      <div className="profile-container">
        {userData ? (
          <div className="left-container">
            <div className="profile-pic">
              <div className="img">{userData.first_name[0]}</div>
              <div className="name-deatils">
                <h3>
                  {userData.first_name} {userData.last_name}
                </h3>
                <span>{userData.email}</span>
              </div>
            </div>

            <div className="subs-button">
              <div className="subsbutton">
                <button
                  onClick={handleevent}
                  className={subs == "event" ? "backgreen" : ""}
                >
                  {" "}
                  Your Events
                </button>
                <button
                  onClick={handlesubs}
                  className={subs == "subs" ? "backgreen" : ""}
                >
                  Subscription details
                </button>
                
                <button
                  onClick={handleArcheived}
                  className={subs == "archeived" ? "backgreen" : ""}
                >
                  Archived
                </button>
                <button
                  onClick={handleAffiliate}
                  className={subs == "affs" ? "backgreen" : ""}
                >
                  Affiliate
                </button>
              </div>
            </div>
            <hr />
            <div className="logout">
             <span onClick={handleLogout}><IoMdLogOut /> Logout</span>
            </div>
          </div>
        ) : (
          <></>
        )}
    
          <div className="right-container">
            {subs == "event" ? (
              <CurrentUserEvent/>
            ) : subs === "subs" ? (
              <div className="subs-details">
                <h2>Subscription Details</h2>
                <div>
                  
                  {userData.subcription ? 
                   ( 
                    <>
                    <div className="plan-head">
                    {" "}
                    <span>Subscription Plan</span>
                  </div>
                    <div className="plan">
                    <h3>{userData.subcription.Subcription_Type}</h3>
                  </div>
                  <div className="billing date">
                  <h5>Next Billing Date : {convertDate2(userData.subcription.EndDate)}</h5>
                </div>
                </>) : (<>
                  <h3>No subscription plan please subscribe or renew the plan</h3>
                  <Link to="/subscription" >
                  <Button variant="contained" color="success" >
                    Upgrade
                  </Button>
                </Link>
                  </>)
                  }
                  
                </div>
              </div>
            ) : subs === 'affs' ? (
              <>
              {affiliatData ? <>
                <div className="aff-form">
                  <h2>Coupon Code: <span style={{color:'#24754F'}}>"{affiliatData.coupon_code}"</span></h2>
                  <h3>Discount: <span style={{color:'#24754F'}}>{affiliatData.discount}%</span></h3>
                </div>
              </> : 
              <div className="affiliate">
                  <h3>Get Affiliate Coupon</h3>
                  <div className="aff-btn">
                    <Button variant="contained" color="success" onClick={handleAffiliateSubmit}>
                      Get Coupon
                    </Button>
                  </div>
                </div>
              }
              </>
            ) : subs === 'archeived' ? (<>
                <Archived/>
            </>) : <>

            </>}
          </div>
        
      </div>
    </>
  )
};

export default Member;
