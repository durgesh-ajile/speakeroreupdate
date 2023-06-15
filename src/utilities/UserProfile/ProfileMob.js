import React, { useState } from "react";
import "./ProfileMob.css";
import { MdLocationOn } from "react-icons/md";
import { MdWatchLater } from "react-icons/md";
// import { IoMdLogOut } from "react-icons/io";
import { IoSchoolSharp } from 'react-icons/io5';
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
  const [subs, setSubs] = useState(false);

  const handlesubs = () => {
    setSubs(true);
  };

  const handleevent = () => {
    setSubs(false);
  };

  const options = [
    { value: '', label: 'CHANGE PLAN' },
    { value: 'Yearly', label: 'Yearly' },
    { value: 'Half-Yearly', label: 'Half Yearly' },
    { value: 'Monthly', label: 'Monthly' }
  ];

  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div id="profile-container">
      <div  id="left-container">
        <div id="profile-pic">
          <div id="img">{data.name[0]}</div>
          <div id="name-details">
            <strong>{data.name}</strong>
            <span>{data.email}</span>
          </div>
        </div>
        <div id="subs-button">
          <div id="subsbutton">
            <button onClick={handleevent} className={!subs ? "backgreen" : ""}>
              Your Events
            </button>
            <button onClick={handlesubs} className={subs ? "backgreen" : ""}>
              Subscription
            </button>
          </div>
        </div>
      </div>
      <div id="right-container">
        {!subs ? (
          <div id="allevent" >
            {cardData.map((e, index) => (
              <div id="card" key={index}>
                <div id="card-content">
                  <small><IoSchoolSharp size={16} color="green" style={{marginRight:'4px'}}/> 
                  {e.event_catogary}</small>
                  <div style={{display:'flex', alignItems:'center'}}>
           <strong style={{marginLeft:"5px", marginTop:"8px", marginBottom:"8px", color:"black", fontSize:"small", fontWeight:"bold"}}>{e.organizer},</strong>
           <span style={{marginLeft:"5px", marginTop:"8px", marginBottom:"8px", color:"grey", fontSize:"small", fontWeight:"100"}}>{e.location}</span>
              </div>
                </div>
                <div id="card-content">
                  <small>
                    <MdLocationOn color="grey" size={15} />
                    {e.event_type}
                  </small>
                  <date>
                    <MdWatchLater size={15} color="grey" />
                    {e.date}
                  </date>
                </div>
                <div id="card-content">
                  <p>{e.desc}</p>
                </div>
                <div id="card-content">
                  <button>View Details</button>
                  <hr style={{ marginLeft: "-20px", marginTop:"35px", width: "100vw" }} />
                </div>
             
              </div>
                   ))} 
               
          </div>
        ) : (
          <div id="subs-details">
            <h2>Subscription Details</h2>
            <div>
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
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
    </div>
            </div>
            <div id="billing-date">
               <h5>Next Billing Date-</h5>
               <span>01 Apr 2024</span>
            </div>
          </div>
        )}
      </div>
      <div id="auto-renew">
                <input type="checkbox" id="auto-renew-checkbox" />
                <label htmlFor="auto-renew-checkbox">Auto Renew</label>
              </div>
    </div>
  );
};

export default Profile;
