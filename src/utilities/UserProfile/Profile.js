import React, { useEffect, useState } from "react";
import "./profile.css";
import { IoMdLogOut } from "react-icons/io";
import axios from "axios";
import Admin from "../Admin/Admin";
import { Button } from "@mui/material";
import Member from "../Member/Member";
import CurrentUserEvent from "../../components/CurrentUser.js/CurrentUserEvent";
import { Link } from "react-router-dom";
import Affiliate from "../../components/Affiliate";

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

  console.log(userData);

  

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

  const handleLogout = () => {
    axios({
      method: "get",
      url: "https://api.speakerore.com/api/logout",
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

  const handlesubs = () => {
    setSubs("subs");
  };
  const handleevent = () => {
    setSubs("event");
  };
  const handleAffiliate = () => {
    setSubs("affs");
  };
  // let navigate = useNavigate();
  // function convertDate(e) {
  //   const date = new Date(e).toLocaleString();
  //   return date;
  // }
  function convertDate2(e) {
    const date = new Date(e).toLocaleDateString();
    return date;
  }
  console.log(role);
  return role === "admin" ? (
    <Admin />
  ) : role === "Team-member" ? (
    <Member />
  ) : (
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
                  onClick={handleAffiliate}
                  className={subs == "affs" ? "backgreen" : ""}
                >
                  Affiliate
                </button>
              </div>
            </div>
            <hr />
            <div className="logout">
              <span onClick={handleLogout}>
                <IoMdLogOut /> Logout
              </span>
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className="right-container">
          {subs == "event" ? (
            <CurrentUserEvent />
          ) : subs === "subs" ? (
            <div className="subs-details">
              <h2>Subscription Details</h2>
              <div>
                {userData.subcription ? (
                  <>
                    <div className="plan-head">
                      {" "}
                      <span>Subscription Plan</span>
                    </div>
                    <div className="plan">
                      <h3>{userData.subcription.Subcription_Type}</h3>
                    </div>
                    <div className="billing date">
                      <h5>
                        Next Billing Date :{" "}
                        {convertDate2(userData.subcription.EndDate)}
                      </h5>
                    </div>
                  </>
                ) : (
                  <>
                    <h3>
                      No subscription plan please subscribe or renew the plan
                    </h3>
                    <Link to="/subscription">
                      <Button variant="contained" color="success">
                        Upgrade
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          ) : (
            <Affiliate/>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
