import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import ArchivedMob from "../../components/Tables/Archived/ArchivedMob";
import CurrentUserMob from "../../components/CurrentUser.js/CurrentUserMob";
import { Link } from "react-router-dom";
import Affiliate from "../../components/Affiliate";

const Member = () => {
  const [subs, setSubs] = useState("event");
  const [userData, setUserData] = useState("");
  const [userEvent, setUserEvent] = useState("");
  const [affiliatemail, setAffiliatemail] = useState("");
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

  console.log(userData);


  
  

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
  // function convertDate(e) {
  //   const date = new Date(e).toLocaleString();
  //   return date;
  // }
  function convertDate2(e) {
    const date = new Date(e).toLocaleDateString();
    return date;
  }
  // console.log(affiliatData);?
  console.log(userEvent);

  return (
    <>
      <div id="profile-container">
          {userData ? (
        <div id="Left-container">
            <div className="profile-pic" id="Profile-pic">
              <div className="img" id="Img">
                {userData.first_name[0]}
              </div>
              <div className="name-deatils" id="Name-deatils">
                <h3>
                  {userData.first_name} {userData.last_name}
                </h3>
                <span>{userData.email}</span>
              </div>
            </div>
         

          <div>
            <div className="subsbutton" id="Subsbutton">
              <button
                onClick={handleevent}
                className={subs === "event" ? "backgreen1" : ""}
              >
                {" "}
                Your Events
              </button>
              <button
                onClick={handlesubs}
                className={subs === "subs" ? "backgreen1" : ""}
              >
                Subscription details
              </button>

              <button
                onClick={handleArcheived}
                className={subs === "archeived" ? "backgreen1" : ""}
              >
                Archived
              </button>
              <button
                onClick={handleAffiliate}
                className={subs === "affs" ? "backgreen1" : ""}
              >
                Affiliate
              </button>
            </div>
          </div>
         
        </div>
        ) : (
            <></>
          )}
        <div style={{marginTop:'20px' }} id="right-container">
    
          {subs == "event" ? (
           <CurrentUserMob/>
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
                </>
                 )
                  }
                  
                </div>
            </div>
          ) : subs === "affs" ? (
            <Affiliate/>
          ) : subs === "archeived" ? (
            <>
              <ArchivedMob />
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default Member;
