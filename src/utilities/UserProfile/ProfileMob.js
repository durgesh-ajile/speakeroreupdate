import React, { useEffect, useState } from "react";
import "./ProfileMob.css";
import axios from "axios";
import MemberMob from "../Member/MemberMob";
import AdminMob from "../Admin/AdminMob";
import { Button } from "@mui/material";
import CurrentUserMob from "../../components/CurrentUser.js/CurrentUserMob";


const Profile = () => {
  const [subs, setSubs] = useState("event");
  const [userData, setUserData] = useState("");
  const [affiliatData, setAffiliatData] = useState("");
  const [loading, setLoading] = useState(false);

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


  const handleAffiliateSubmit = () => {
    axios({
      method: "post",
      url: "https://api.speakerore.com/api/createaffilatecoupon",
      withCredentials: true,
    })
      .then((res) => {
        if (res.data.status) {
          setLoading(!loading);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
  }, []);

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
  }, [loading]);

 
  console.log(affiliatData);

  const handlesubs = () => {
    setSubs("subs");
  };
  const handleevent = () => {
    setSubs("event");
  };
  const handleAffiliate = () => {
    setSubs("affs");
  };
  
  function convertDate2(e) {
    const date = new Date(e).toLocaleDateString();
    return date;
  }


  // const [selectedOption, setSelectedOption] = useState("");

  // const handleOptionChange = (event) => {
  //   setSelectedOption(event.target.value);
  // };

  return role === "admin" ? (
    <AdminMob />
  ) : role === "Team-member" ? (
    <MemberMob />
  ) : (
    <>
      <div id="profile-container">
        {userData ? (
          <div id="left-container">
            <div id="profile-pic">
              <div id="img">{userData.first_name[0]}</div>
              <div id="name-details">
                <strong>
                  {userData.first_name} {userData.last_name}
                </strong>
                <span>{userData.email}</span>
              </div>
            </div>
            <div id="subs-button">
              <div id="subsbutton">
                <button
                  onClick={handleevent}
                  className={subs == "event" ? "backgreen" : ""}
                >
                  Your Events
                </button>
                <button
                  onClick={handlesubs}
                  className={subs == "subs" ? "backgreen" : ""}
                >
                  Subscription
                </button>
                <button
                  onClick={handleAffiliate}
                  className={subs == "affs" ? "backgreen" : ""}
                >
                  Affiliate
                </button>
              </div>
            </div>
           
          </div>
        ) : (
          <></>
        )}
        <div id="right-container">
          {subs == "event" ? (
            <CurrentUserMob/>
          ) : subs === "subs" ? (
            <div id="subs-details">
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
                </>) : (<h3>No subscription plan please subscribe or renew the plan</h3>)
                  }
              </div>
            </div>
          ) : (
            <>
              {affiliatData ? (
                <>
                  <div className="aff-form">
                    <h2>
                      Coupon Code:{" "}
                      <span style={{ color: "#24754F" }}>
                        "{affiliatData.coupon_code}"
                      </span>
                    </h2>
                    <h3>
                      Discount:{" "}
                      <span style={{ color: "#24754F" }}>
                        {affiliatData.discount}%
                      </span>
                    </h3>
                  </div>
                </>
              ) : (
                <div className="affiliate">
                  <h3>Get Affiliate Coupon</h3>
                  <div className="aff-btn">
                    <Button
                      variant="contained"
                      color="success"
                      onClick={handleAffiliateSubmit}
                    >
                      Get Coupon
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        
      </div>
    </>
  );
};

export default Profile;
