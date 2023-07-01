import React, { useEffect, useState } from "react";
import axios from "axios";
import UserTable1 from "../../components/Tables/UserTable/UserTable1";
import "./Admin.css";
import TeamMembers1 from "../../components/Tables/TeamMember/TeamMembers1";
import CouponTable1 from "../../components/Tables/CouponTable/CouponTable1";
import EventAdmin1 from "../../components/Tables/EventAdmin/EventAdmin1";
import CreateCoupon from "../../components/Tables/CreateCoupon";
import Trash1 from "../../components/Tables/Trash/Trash1";
import Archived1 from "../../components/Tables/Archived/Archived1";
import { useNavigate } from "react-router-dom";
import ManageAdminMob from "../../components/Tables/ManageAdmin/ManageAdminMob";

const adminEMail = 'durgeshrajak254@gmail.com'
const isAdminStyle = {
  display:'block'
}
const AdminMob = () => {
  const [select, setSelect] = useState("event");

  const [profile, setProfile] = useState("");

  const handleUser = () => {
    setSelect("user");
  };
  const handleMember = () => {
    setSelect("member");
  };
  const handleEvent = () => {
    setSelect("event");
  };
  const handleCoupon = () => {
    setSelect("coupon");
  };
  const handleCreateCoupon = () => {
    setSelect("createCoupon");
  };
  const handleTrash = () => {
    setSelect("trash");
  };
  const handleArchieved = () => {
    setSelect("archieved");
  };
  const handleDownload = () => {
    setSelect('download')
  };
  const handleAdmin = () => {
    setSelect('admin')
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

 

  // console.log(eventsForApproval)
  let navigate = useNavigate();

  console.log(profile);

  return (
    <div id="Admin" className="admin">
      <div id="Left-container">
        {profile ? (
          <div className="profile-pic" id="Profile-pic">
            <div className="img" id="Img">
              {profile.first_name[0]}
            </div>
            <div className="name-deatils" id="Name-deatils">
              <h3>
                {profile.first_name} {profile.last_name}
              </h3>
              <span>{profile.email}</span>
            </div>
          </div>
        ) : (
          <></>
        )}

        <div>
          <div className="subsbutton" id="Subsbutton">
            <button
              onClick={handleEvent}
              className={select === "event" ? "backgreen1" : ""}
            >
              {" "}
              Events Request
            </button>
            <button
              onClick={handleUser}
              className={select == "user" ? "backgreen1" : ""}
            >
              Users
            </button>
            <button
              onClick={handleMember}
              className={select == "member" ? "backgreen1" : ""}
            >
              Team <span id="Span">Members</span>
            </button>
            <button
              style={adminEMail === profile?.email ? isAdminStyle : null}
              onClick={handleAdmin}
              id='nonadmin'
              className={select == 'admin' ? "backgreen1" : ""}
            >
              Admins
            </button>
            
          </div>
          <div
            className="subsbutton"
            id="Subsbutton"
            style={{ margin: "8px 20px" }}
          >
          <button
              onClick={handleCoupon}
              className={select == "coupon" ? "backgreen1" : ""}
            >
              Coupons
            </button>
            <button
              onClick={handleTrash}
              className={select == "trash" ? "backgreen1" : ""}
            >
              Trash
            </button>
            <button
              onClick={handleArchieved}
              className={select == "archieved" ? "backgreen1" : ""}
            >
              Archived
            </button>
            <button
              onClick={handleCreateCoupon}
              className={select == "createCoupon" ? "backgreen1" : ""}
            >
              Create Coupon
            </button>
            
            
          </div>
          <div
            className="subsbutton"
            id="Subsbutton"
            style={{ margin: "8px 20px" }}
          ><button
              style={adminEMail === profile?.email ? isAdminStyle : null}
              onClick={handleDownload}
              id='nonadmin'
              className={select == 'download' ? "backgreen1" : ""}
            >
              Download
            </button></div>
        </div>
        
      </div>
      <div id="Events-content" className="events-content">
        {select === "event" ? <EventAdmin1 /> : ""}
        {select === "user" ? <UserTable1 /> : ""}
        {select === "member" ? <TeamMembers1 /> : ""}
        {select === "trash" ? <Trash1 /> : ""}
        {select === "coupon" ? <CouponTable1 /> : ""}
        {select === "createCoupon" ? <CreateCoupon /> : ""}
        {select === "archieved" ? <Archived1 /> : ""}
        {select === 'admin' ? <ManageAdminMob /> : ""}
      </div>
    </div>
  );
};

export default AdminMob;
