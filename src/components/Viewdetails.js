import React, { useState } from "react";
import "./viewdetails.css";
import man from "../images/Group 11450.png";
import web from "../images/mdi_web.png";
import { MdDateRange } from "react-icons/md";
import { MdOutlineLocationOn } from "react-icons/md";
import { BsFillPersonFill } from "react-icons/bs";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


const Viewdetails = () => {

  const [data, setData] = useState()
  const {eventId} = useParams()

  function convertDate(e){
    const date = new Date(e).toLocaleString()
    return date
  }

  useEffect(() => {
    axios({
      method: "get",
      url: `https://api.speakerore.com/api/getsingleevent/${eventId}`,
      withCredentials: true,
    })
      .then((res) => {
        console.log(res);
        setData(res.data.savedEvent)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(data)
  
  const eventdata = {
    website: "",
    date: "Friday ,31march 7-8:30PM",
    location:
      "The Hive- Flexible Workspace, Gachibowli Hyderabad The Hive Nanakaramguda, TG 500032",
    audience_number: 100,
    audience_type: "student",
    event_type: "Online",
    catogary: "Education",
    para: "Find your Life Changing Event. Speaking is a serious Business. Every Expert must get noticed to build their empire of followers. Knowledge within you wont help the world at large. Your Time is the Most Expensive Opportunity Cost.Find your Life Changing Event. Speaking is a serious Business.Every Expert must get noticed to build their empire of followers. Knowledge within you wont help the world at large. Your Time is the Most Expensive Opportunity Cost.",
    tags1: "Opportunity",
    tags2: "Opportunity",
    tags3: "Opportunity",
    tags4: "Opportunity",
  };

  return (
    data ? 
    <div className="view-detail">
      <div className="head-banner">
        <div className="banner-container">
          <div className="banner-text">
            <span>Event Title of the event: Just give a </span>
          </div>
          <div className="banner-img">
            <img src={man} />
          </div>
        </div>
      </div>

      <div style={{ margin: "2rem 0 0 0" }}>
        <div className="mail">
          <div>
            <span>
              Find your Life Changing Event. Speaking is a serious Business
              .Every Expert must get
              <br /> noticed to build their empire of followers. Knowledge
              within you wont help the world at.
            </span>
          </div>
          <div className="web">
            <img src={web} style={{ textAlign: "center" }} /><span>website: </span>
            <a href={data.EventWebsiteUrl}> {data.EventWebsiteUrl}</a>
          </div>
        </div>
      </div>

      <div className="venue-details">
        <div>
          <h2 style={{ fontWeight: "800" }}>When and where and who</h2>
        </div>
        <div className="venue-details-container">
          <div className="dateandtime box">
            <div className="icon-view">
              <MdDateRange />
            </div>
            <div className="view-description">
              <bold>Date and time</bold>
              <div className="in-des">{convertDate(data.EventStartDateAndTime)}</div>
            </div>
          </div>

          <div className="location box">
            <div className="icon-view">
              <MdOutlineLocationOn />
            </div>
            <div className="view-description">
              <bold>Location</bold>
              <div className="in-des">{data.Location}<br/> {data.Pincode} {data.City},<br/> {data.Country} </div>
            </div>
          </div>

          <div className="audience box">
            <div className="icon-view">
              <BsFillPersonFill />
            </div>
            <div className="view-description">
              <bold>Audience</bold>
              <div className="in-des">
                <li>{data.AudienceSize}</li>
                <li>{data.AudienceType}</li>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="aboutevent">
        <div>
          <h2 style={{ fontWeight: "800" }}>About this Event</h2>
        </div>
        <div className="eventtype">
          <small>{data.Category}</small>
          <span>{data.EngagementTerm}</span>
        </div>
        <div className="aboutevent-para">
          <span>{data.DetailedDescriptionOfTheEvent}</span>
        </div>
      </div>

      <div className="tags">
        <h3 style={{ fontWeight: "800" }}>Tags</h3>
        <div className="tag">
          <span>{eventdata.tags1}</span>
          <span>{eventdata.tags2}</span>
          <span>{eventdata.tags3}</span>
          <span>{eventdata.tags4}</span>
        </div>
      </div>
    </div>
    :
    <>

    </>
  );
};

export default Viewdetails;
