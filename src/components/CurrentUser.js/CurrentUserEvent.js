import React, { useEffect, useState } from "react";
import { MdLocationOn } from "react-icons/md";
import { MdWatchLater } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import exclusiveimg from "../../images/Group.png";
import axios from "axios";
import { Button, Pagination, Stack, Typography } from "@mui/material";
import { BiSearchAlt } from "react-icons/bi";
import man from "../../images/Group 11450.png";

const CurrentUserEvent = () => {
  const [userEvent, setUserEvent] = useState("");
  const [page, setPage] = React.useState(1);
  const [searchKey, setSearchKey] = React.useState();
  const [filter, setFilter] = useState();
  const [noEvent, setNoEvent] = useState(false);

  const handleChange = (event, value) => {
    setPage(value);
  };
  useEffect(() => {
    axios({
      method: "get",
      url: `https://api.speakerore.com/api/geteventforcurrentuser?page=${page}`,
      withCredentials: true,
    })
      .then((res) => {
        setUserEvent(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        if(err.response.status===404){
          setNoEvent(true)
        }
      });
  }, []);

  useEffect(() => {
    axios({
      method: "get",
      url: `https://api.speakerore.com/api/geteventforcurrentuser?page=${page}`,
      withCredentials: true,
    })
      .then((res) => {
        setUserEvent(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [page]);

  console.log(userEvent)
  console.log(page)


  useEffect(() => {
    axios({
      method: "get",
      url: `https://api.speakerore.com/api/geteventbyqueryforcurrentuser?keyword=${searchKey}&page=${page}`,
      withCredentials: true,
    })
      .then((res) => {
        console.log(res);
        setFilter(res.data.queryResult);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 422 || 404) {
          setFilter("");
        }
      });
  }, [searchKey, page]);

  let navigate = useNavigate();
  function convertDate(e) {
    const dateObject = new Date(e);
    const year = dateObject.getUTCFullYear();
    const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(dateObject);
    const day = dateObject.getUTCDate();
    const hours = dateObject.getUTCHours();
    const minutes = dateObject.getUTCMinutes();
    const seconds = dateObject.getUTCSeconds();
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
  
    const dateTimeString = `${day} ${month} ${year} ${formattedHours}:${minutes}:${seconds} ${period}`;
    return dateTimeString;
  }
  console.log(userEvent);
  return (
    <div>
      <div className="allevent" style={{ flexWrap: "wrap" }}>
        {userEvent ? (
          <div>
            <div className="input-div" style={{ marginTop: "20px" }}>
              <BiSearchAlt className="ico" />
              <input
                placeholder="Search via keyword"
                className="dash-input"
                value={searchKey}
                onChange={(e) => {
                  setSearchKey(e.target.value);
                }}
              />
            </div>
            <div className="card-container">
              {filter ? (
                filter.map((e) => (
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
                        {e.isSpeakerOreExclusive ? (
                          <img src={exclusiveimg} />
                        ) : null}
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
                        <q>{convertDate(e.EventStartDateAndTime)}</q>
                      </date>
                      <p></p>
                    </div>
                    <div className="desc">
                      <p>{e.ShortDescriptionOfTheEvent}</p>
                    </div>
                    <div className="card-3">
                    <Link to={`/event/${e._id}`} target="_blank">
                    <button>
                      View Details
                    </button>
                    </Link>
                    </div>
                  </div>
                ))
              ) : searchKey ? (
                <div className="no-event">
                  <h3>No Matching Events</h3>
                </div>
              ) : (
                userEvent.savedEventsOfCurrentUser.map((e) => (
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
                        {e.isSpeakerOreExclusive ? (
                          <img src={exclusiveimg} />
                        ) : null}
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
                        <q>{convertDate(e.EventStartDateAndTime)}</q>
                      </date>
                      <p></p>
                    </div>
                    <div className="desc">
                      <p>{e.ShortDescriptionOfTheEvent}</p>
                    </div>
                    <div className="card-3">
                    <Link to={`/event/${e._id}`} target="_blank">
                    <button>
                      View Details
                    </button>
                    </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
            <Stack spacing={2}>
              <Pagination
                style={{ justifyContent: "center", marginTop: "20px" }}
                count={userEvent.totalPage}
                page={page}
                onChange={handleChange}
              />
              <Typography>Page: {page}</Typography>
            </Stack>
          </div>
        ) : noEvent ? <>
          <div>
          <div className="head-banner">
        <div className="banner-container">
          <div className="banner-text" style={{marginLeft:"6%"}}>
            
            <h5>
            Create Your first Event
            </h5>
          </div>
          <div className="banner-img">
            <img src={man} />
          </div>
        </div>
      </div>
      <div style={{padding:"40px 5%"}}>
      <Link to='/createnewevent'><Button variant="contained" color="success" >
                      Create New Event
                    </Button></Link></div>
      
          </div>
        </> : (
          <></>
        )}
      </div>
    </div>
  );
};

export default CurrentUserEvent;
