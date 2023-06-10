import React, { useEffect, useState } from "react";
import "./profile.css";
import { MdLocationOn } from "react-icons/md";
import { MdWatchLater } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
  const [userData, setUserData] = useState("");
  const [userEvent, setUserEvent] = useState("");

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:5000/api/getprofile",
      withCredentials: true,
    })
      .then((res) => {
        if (res.data.status) {
          setUserData(res.data.response);
          
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(userData)
  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:5000/api/geteventforcurrentuser",
      withCredentials: true,
    })
      .then((res) => {
        setUserEvent(res.data.savedEventsOfCurrentUser)
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  console.log(userEvent)

  const handlesubs = () => {
    setSubs(true);
  };
  const handleevent = () => {
    setSubs(false);
  };
  let navigate = useNavigate();
  function convertDate(e){
    const date = new Date(e).toLocaleString()
    return date
  }

  return (
    <div className="profile-container">
    {userData ?
      <div className="left-container">
        <div className="profile-pic">
          <div className="img">{userData.first_name[0]}</div>
          <div className="name-deatils">
            <h3>{userData.first_name} {userData.last_name}</h3>
            <span>{userData.email}</span>
          </div>
        </div>

        <div className="subs-button">
          <div className="subsbutton">
            <button
              onClick={handleevent}
              className={subs == false ? "backgreen" : ""}
            >
              {" "}
              Your Events
            </button>
            <button
              onClick={handlesubs}
              className={subs == true ? "backgreen" : ""}
            >
              Subscription details
            </button>
          </div>
        </div>
        <hr />
        <div className="logout">
          <IoMdLogOut /> <span>Logout</span>
        </div>
      </div>
      :
      <></>}
      {userEvent ? 
      <div className="right-container">
        {subs == false ? (
          <div className="allevent" style={{ flexWrap: "wrap" }}>
            {userEvent.map((e) => (
              <div className="card">
              <div className="card-1">
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
              <div className="card-2">
                <span>
                  <MdLocationOn  size={20} />
                  <h>

                  {e.Mode}
                  </h>
                </span>
          
                <date>
                  {" "}
                  <MdWatchLater size={20}  />
                  <q>

                  {convertDate(e.EventEndDateAndTime)}
                  </q>
                </date>
                <p></p>
              </div>
              <div className="desc">
                <p>{e.ShortDescriptionOfTheEvent}</p>
              </div>
              <div className="card-3">
              
                <button onClick={()=>{
                  navigate(`/event/${e._id}`)
                }}>View Details</button>
             
              </div>
            </div>
            ))}
          </div>
        ) : (
          <div className="subs-details">
            <h2>Subscription Details</h2>
            <div>
              <div className="plan-head">
                {" "}
                <span>Subscription Plan</span>
              </div>
              <div className="plan">
                <select>
                  <option>Yearly</option>
                  <option>Half Yearly</option>
                  <option>Monthly</option>
                </select>
              </div>
            </div>

            <div className="billing date">
              <h5>Next Billing Date : 01 Apr 2024</h5>
            </div>
          </div>
        )}
      </div>
      :
      <></>}
    </div>
  );
};

export default Profile;
