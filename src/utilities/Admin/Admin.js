import React, { useEffect, useState } from "react";
import UserTable from "../../components/Tables/UserTable";
import "./Admin.css";
import { IoMdLogOut } from "react-icons/io";

import TeamMembers from "../../components/Tables/TeamMembers";
import CouponTable from "../../components/Tables/CouponTable";
import EventAdmin from "../../components/Tables/EventAdmin";
import axios from "axios";
const data = {
  name: "Divya Devendar",
  email: "example123@gmail.com",
};

const Admin = () => {
  const [event, setevent] = useState(true);
  const [user, setUser] = useState(false);
  const [members, setMembers] = useState(false);
  const [coupon, setCoupon] = useState(false);
  const [eventsForApproval, setEventsForApproval] = useState("");
  const [userData, setUserData] = useState("");
  const [teamMemberData, setTeamMemberData] = useState("");
  const [couponData, setCouponData] = useState("");
  const [trashData, setTrashData] = useState("");
  const [archivedData, setArchivedData] = useState("");
  const [profile, setProfile] = useState('')

  const handleUser = () => {
    setUser(true);
    setevent(false);
    setCoupon(false);
    setMembers(false);
  };
  const handleMember = () => {
    setUser(false);
    setevent(false);
    setCoupon(false);
    setMembers(true);
  };
  const handleEvent = () => {
    setUser(false);
    setevent(true);
    setCoupon(false);
    setMembers(false);
  };
  const handleCoupon = () => {
    setUser(false);
    setevent(false);
    setCoupon(true);
    setMembers(false);
  };

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:5000/api/getprofile",
      withCredentials: true,
    })
      .then((res) => {
        if (res.data.status) {
          setProfile(res.data.response);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:5000/api/geteventforapproval",
      withCredentials: true,
    })
      .then((res) => {
        setEventsForApproval(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(eventsForApproval)

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:5000/api/getallregularuser",
      withCredentials: true,
    })
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:5000/api/getallteammembers",
      withCredentials: true,
    })
      .then((res) => {
        setTeamMemberData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:5000/api/getallcoupons",
      withCredentials: true,
    })
      .then((res) => {
        setCoupon(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:5000/api/getalltrashevents",
      withCredentials: true,
    })
      .then((res) => {
        setTrashData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:5000/api/getallarchievedevent",
      withCredentials: true,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  console.log(profile)

  return (
    <div className="admin">
      <div className="left-container">
        <div className="profile-pic">
          {/* <div className="img">{userData.first_name[0]}</div> */}
          <div className="name-deatils">
            <h3>{userData.first_name} {userData.last_name}</h3>
            <span>{userData.email}</span>
          </div>
        </div>

        <div className="subs-button">
          <div className="subsbutton">
            <button
              onClick={handleEvent}
              className={event == true ? "backgreen" : ""}
            >
              {" "}
              Events
            </button>
            <button
              onClick={handleUser}
              className={user == true ? "backgreen" : ""}
            >
              Users
            </button>
            <button
              onClick={handleMember}
              className={members == true ? "backgreen" : ""}
            >
              Team Members
            </button>
            <button
              onClick={handleCoupon}
              className={coupon == true ? "backgreen" : ""}
            >
              Coupons
            </button>
          </div>
        </div>
        <hr />
        <div className="logout">
          <IoMdLogOut /> <span>Logout</span>
        </div>
      </div>
      <div className="events-content">
        {event == true ? <EventAdmin  eventsForApproval = {eventsForApproval}/> : ""}
        {user == true ? <UserTable /> : ""}
        {members == true ? <TeamMembers /> : ""}
        {coupon == true ? <CouponTable /> : ""}
      </div>
    </div>
  );
};

export default Admin;
