import React, { useEffect, useState } from "react";
import "./ProfileMob.css";
import { MdLocationOn } from "react-icons/md";
import { MdWatchLater } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import axios from "axios";
import exclusiveimg from "../../images/Group.png";
import { useNavigate } from "react-router-dom";
import { IoSchoolSharp } from "react-icons/io5";
import Admin from "../Admin/Admin";
import MemberMob from "../Member/MemberMob";
import AdminMob from "../Admin/AdminMob";
import { Button } from "@mui/material";
const data = {
  name: "Divya Devendar",
  email: "example123@gmail.com",
};

const cardData = [
  {
    event_catogary: "Education",
    organizer: "Indian Business School",
    location: "Hyderabad",
    event_type: "Online Event",
    date: "Jan 2 , 2023 | 12:31 pm",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque sint consectetur nemo volup",
  },
  {
    event_catogary: "Education",
    organizer: "Indian Business School",
    location: "Hyderabad",
    event_type: "Online Event",
    date: "Jan 2 , 2023 | 12:31 pm",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque sint consectetur nemo volup",
  },
  {
    event_catogary: "Education",
    organizer: "Indian Business School",
    location: "Hyderabad",
    event_type: "Online Event",
    date: "Jan 2 , 2023 | 12:31 pm",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque sint consectetur nemo volup",
  },
  {
    event_catogary: "Education",
    organizer: "Indian Business School",
    location: "Hyderabad",
    event_type: "Online Event",
    date: "Jan 2 , 2023 | 12:31 pm",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque sint consectetur nemo volup",
  },
  {
    event_catogary: "Education",
    organizer: "Indian Business School",
    location: "Hyderabad",
    event_type: "Online Event",
    date: "Jan 2 , 2023 | 12:31 pm",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque sint consectetur nemo volup",
  },
  {
    event_catogary: "Education",
    organizer: "Indian Business School",
    location: "Hyderabad",
    event_type: "Online Event",
    date: "Jan 2 , 2023 | 12:31 pm",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque sint consectetur nemo volup",
  },
  {
    event_catogary: "Education",
    organizer: "Indian Business School",
    location: "Hyderabad",
    event_type: "Online Event",
    date: "Jan 2 , 2023 | 12:31 pm",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque sint consectetur nemo volup",
  },
  {
    event_catogary: "Education",
    organizer: "Indian Business School",
    location: "Hyderabad",
    event_type: "Online Event",
    date: "Jan 2 , 2023 | 12:31 pm",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque sint consectetur nemo volup",
  },
];

const Profile = () => {
  const [subs, setSubs] = useState("event");
  const [userData, setUserData] = useState("");
  const [userEvent, setUserEvent] = useState("");
  const [affiliatData, setAffiliatData] = useState("");
  const [loading, setLoading] = useState(false);

  const [role, setRole] = useState("");
  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:5000/api/getprofile",
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

  const handleAffiliateSubmit = () => {
    axios({
      method: "post",
      url: "http://localhost:5000/api/createaffilatecoupon",
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
      url: "http://localhost:5000/api/getaffilatecoupon",
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
      url: "http://localhost:5000/api/getaffilatecoupon",
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

  const handleLogout = () => {
    axios({
      method: "get",
      url: "http://localhost:5000/api/logout",
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

  console.log(affiliatData);
  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:5000/api/geteventforcurrentuser",
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

  const handlesubs = () => {
    setSubs("subs");
  };
  const handleevent = () => {
    setSubs("event");
  };
  const handleAffiliate = () => {
    setSubs("affs");
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

  const options = [
    { value: "", label: "CHANGE PLAN" },
    { value: "Yearly", label: "Yearly" },
    { value: "Half-Yearly", label: "Half Yearly" },
    { value: "Monthly", label: "Monthly" },
  ];

  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

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
            <div className="logout">
              <span onClick={handleLogout}>
                <IoMdLogOut /> Logout
              </span>
            </div>
          </div>
        ) : (
          <></>
        )}
        <div id="right-container">
          {subs == "event" ? (
            <div id="allevent">
              {userEvent ? (
                userEvent.map((e) => (
                  <div id="card">
                    <div id="card-content">
                      <small>
                        <IoSchoolSharp
                          size={16}
                          color="green"
                          style={{ marginRight: "4px" }}
                        />
                        {e.Category}
                      </small>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <strong
                          style={{
                            marginLeft: "5px",
                            marginTop: "8px",
                            marginBottom: "8px",
                            color: "black",
                            fontSize: "small",
                            fontWeight: "bold",
                          }}
                        >
                          {e.OrganizerName},
                          <span
                            style={{
                              marginLeft: "5px",
                              marginTop: "8px",
                              marginBottom: "8px",
                              color: "grey",
                              fontSize: "small",
                              fontWeight: "100",
                            }}
                          >
                            {e.City}
                          </span>
                        </strong>

                        <div style={{ marginRight: "10px" }}>
                          {e.isSpeakerOreExclusive ? (
                            <img src={exclusiveimg} />
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div id="card-content">
                      <small>
                        <MdLocationOn color="grey" size={15} />
                        {e.Mode}
                      </small>
                      <date>
                        <MdWatchLater size={15} color="grey" />
                        {convertDate(e.EventEndDateAndTime)}
                      </date>
                    </div>
                    <div id="card-content">
                      <p>{e.ShortDescriptionOfTheEvent}</p>
                    </div>
                    <div id="card-content">
                      <button
                        onClick={() => {
                          navigate(`/event/${e._id}`);
                        }}
                      >
                        View Details
                      </button>
                      <hr
                        style={{
                          marginLeft: "-20px",
                          marginTop: "35px",
                          width: "100vw",
                        }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <></>
              )}
            </div>
          ) : subs === "subs" ? (
            <div id="subs-details">
              <h2>Subscription Details</h2>
              <div>
              {userData.subcription ? 
                   ( 
              <>
                <div id="plan-head">
                  <span>Subscription Plan</span>
                </div>
                <div id="plan">
                  <div id="selected-option">
                    {selectedOption && selectedOption}
                  </div>
                  <div className="custom-select">
                    <select value={"CHANGE PLAN"} onChange={handleOptionChange}>
                      {options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div id="billing-date">
                  <h5>Next Billing Date-</h5>
                  <span>01 Apr 2024</span>
                </div>
                <div id="auto-renew">
          <input type="checkbox" id="auto-renew-checkbox" />
          <label htmlFor="auto-renew-checkbox">Auto Renew</label>
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
