import React, { useEffect, useState } from "react";
import { MdLocationOn } from "react-icons/md";
import { MdWatchLater } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import exclusiveimg from '../../images/Group.png'

import { Button } from "@mui/material";
import Archived from "../../components/Tables/Archived";

const Member = () => {
  const [subs, setSubs] = useState("event");
  const [userData, setUserData] = useState("");
  const [userEvent, setUserEvent] = useState("");
  const [affiliatemail, setAffiliatemail] = useState("");
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
  useEffect(() => {
    axios({
      method: "get",
      url: "https://api.speakerore.com/api/geteventforcurrentuser",
      withCredentials: true,
    })
      .then((res) => {
        setUserEvent(res.data.savedEventsOfCurrentUser);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
  let navigate = useNavigate();
  function convertDate(e) {
    const date = new Date(e).toLocaleString();
    return date;
  }
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
              <IoMdLogOut /> <span>Logout</span>
            </div>
          </div>
        ) : (
          <></>
        )}
    
          <div className="right-container">
            {subs == "event" ? (
              <div className="allevent" style={{ flexWrap: "wrap" }}>
                {userEvent ? userEvent.map((e) => (
                  <div className="card">
                  <div className="card-1">
                    <div>
                      <small
                        style={{
                          margin: "20px  0 0 2rem",
                          fontSize: "1rem",
                          fontWeight: "500",
                          color: "#24754F",
                        }}
                      >
                        {e.Category}{" "}
                      </small>
                      <bold>{e.OrganizerName}</bold>
                      <span>{e.City}</span>
                      </div>
                      <div>
                      {e.isSpeakerOreExclusive ? <img src={exclusiveimg}/> : null}
                      </div>
                    </div>
                    <div className="card-2">
                      <span>
                        <MdLocationOn size={20} />
                        <h>{e.Mode}</h>
                      </span>

                      <date>
                        {" "}
                        <MdWatchLater size={20} />
                        <q>{convertDate(e.EventEndDateAndTime)}</q>
                      </date>
                      <p></p>
                    </div>
                    <div className="desc">
                      <p>{e.ShortDescriptionOfTheEvent}</p>
                    </div>
                    <div className="card-3">
                      <button
                        onClick={() => {
                          navigate(`/event/${e._id}`);
                        }}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                )) : <></>}
              </div>
            ) : subs === "subs" ? (
              <div className="subs-details">
                <h2>Subscription Details</h2>
                <div>
                  <div className="plan-head">
                    {" "}
                    <span>Subscription Plan</span>
                  </div>
                  <div className="plan">
                    <h3>{userData.subcription && userData.subcription.Subcription_Type}</h3>
                  </div>
                </div>

                <div className="billing date">
                  <h5>Next Billing Date : {userData.subcription && convertDate2(userData.subcription.EndDate)}</h5>
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
            ) : subs === 'archieved' ? (<>
                <Archived/>
            </>) : <>

            </>}
          </div>
        
      </div>
    </>
  )
};

export default Member;