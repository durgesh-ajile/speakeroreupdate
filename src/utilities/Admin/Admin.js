import React, { useEffect, useState } from "react";
import axios from "axios";
import UserTable1 from "../../components/Tables/UserTable/UserTable1";
import "./Admin.css";
import { IoMdLogOut } from "react-icons/io";

import TeamMembers1 from "../../components/Tables/TeamMember/TeamMembers1";
import CouponTable1 from "../../components/Tables/CouponTable/CouponTable1";
import EventAdmin1 from "../../components/Tables/EventAdmin/EventAdmin1";
import CreateCoupon from "../../components/Tables/CreateCoupon";
import Trash1 from "../../components/Tables/Trash/Trash1";
import Archived1 from "../../components/Tables/Archived/Archived1";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import ManageAdmin from "../../components/Tables/ManageAdmin/ManageAdmin";
import Download from "../../components/Download/Download";

const adminEMail = 'nikhilchaudhary86@gmail.com'
const isAdminStyle = {
  display:'block'
}
const Admin = () => {
  const [select, setSelect] = useState('event');
 
  const [profile, setProfile] = useState('')

  const handleUser = () => {
    setSelect('user'); 
  };
  const handleMember = () => {
    setSelect('member')
  };
  const handleAdmin = () => {
    setSelect('admin')
  };
  const handleEvent = () => {
   setSelect('event')
  };
  const handleCoupon = () => {
    setSelect('coupon')
  };
  const handleCreateCoupon = () => {
    setSelect('createCoupon')
  };
  const handleTrash = () => {
    setSelect('trash')
  };
  const handleArchieved = () => {
    setSelect('archieved')
  };
  const handleDownload = () => {
    setSelect('download')
  };
  

  useEffect(() => {
    axios({
      method: "get",
      url: "https://api.speakerore.com/api/getprofile",
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
 
  // console.log(eventsForApproval)
  let navigate = useNavigate();

  console.log(profile)

  return (
    <div id='Admin' className="admin">
      <div className="left-container" id='Left-container' >
      {profile ? <div className="profile-pic" id='Profile-pic'>
          <div className="img"  id='Img'>{profile.first_name[0]}</div>
          <div className="name-deatils"  id='Name-deatils'>
            <h3>{profile.first_name} {profile.last_name}</h3>
            <span>{profile.email}</span>
          </div>
        </div>
        :
        <>
        </>
        }
        

        <div id='Subs-button' className="subs-button">
          <div className="subsbutton" id='Subsbutton'>
            <button
              onClick={handleEvent}
              className={select === 'event' ? "backgreen" : ""}
            >
              {" "}
              Events Request
            </button>
            <button
              onClick={handleUser}
              className={select == 'user' ? "backgreen" : ""}
            >
              Users
            </button>
            <button
              onClick={handleMember}
              className={select == 'member' ? "backgreen" : ""}
            >
              Team <span id='Span'>Members</span> 
            </button>
            <button
              style={adminEMail === profile?.email ? isAdminStyle : null}
              onClick={handleAdmin}
              id='nonadmin'
              className={select == 'admin' ? "backgreen" : ""}
            >
              Admins
            </button>
            <button
              onClick={handleCoupon}
              className={select == 'coupon' ? "backgreen" : ""}
            >
              Coupons
            </button>
            
          </div>
          <div className="mobile-adjust subsbutton" id='Subsbutton' style={{paddingTop:'0'}}>
            <button
              onClick={handleTrash}
              className={select == 'trash' ? "backgreen" : ""}
            >
              Trash
            </button>
            <button
              onClick={handleArchieved}
              className={select == 'archieved' ? "backgreen" : ""}
            >
              Archived
            </button>
            <button
              onClick={handleCreateCoupon}
              className={select == 'createCoupon' ? "backgreen" : ""}
            >
              Create Coupon
            </button>
            <button
              style={adminEMail === profile?.email ? isAdminStyle : null}
              onClick={handleDownload}
              id='nonadmin'
              className={select == 'download' ? "backgreen" : ""}
            >
              Download
            </button>
            </div>
        </div>
        <hr />
        <div className="logout">
          <span onClick={handleLogout}> <IoMdLogOut /> Logout</span>
        </div>
      </div>
      <div id='Events-content' className="events-content">
        {select === 'event' ? <EventAdmin1 /> : ""}
        {select === 'user'  ? <UserTable1 /> : ""}
        {select === 'member'  ? <TeamMembers1 /> : ""}
        {select === 'trash'  ? <Trash1 /> : ""}
        {select === 'coupon' ? <CouponTable1 /> : ""}
        {select === 'createCoupon' ? <CreateCoupon /> : ""}
        {select === 'archieved' ? <Archived1 /> : ""}
        {select === 'admin' ? <ManageAdmin /> : ""}
        {select === 'download' ? <Download /> : ""}
      </div>
    </div>
  );
};

export default Admin;
