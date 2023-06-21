import React, { useEffect, useState } from "react";
import { MdLocationOn } from "react-icons/md";
import { MdWatchLater } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import exclusiveimg from "../../images/Group.png";
import axios from "axios";
import { Pagination, Stack, Typography } from "@mui/material";
import { BiSearchAlt } from "react-icons/bi";

const CurrentUserEvent = () => {
  const [userEvent, setUserEvent] = useState("");
  const [page, setPage] = React.useState(1);
  const [searchKey, setSearchKey] = React.useState();
  const [filter, setFilter] = useState();
  const handleChange = (event, value) => {
    setPage(value);
  };
  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:5000/api/geteventforcurrentuser?${page}`,
      withCredentials: true,
    })
      .then((res) => {
        setUserEvent(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:5000/api/geteventforcurrentuser?${page}`,
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

  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:5000/api/geteventbyqueryforcurrentuser?keyword=${searchKey}&page=${page}`,
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
    const date = new Date(e).toLocaleString();
    return date;
  }

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
                      <button
                        onClick={() => {
                          navigate(`/event/${e._id}`);
                        }}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))
              ) : searchKey ? (
                <div>
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
                      <button
                        onClick={() => {
                          navigate(`/event/${e._id}`);
                        }}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            <Stack spacing={2}>
              <Pagination
                style={{ justifyContent: "center", marginTop: "20px" }}
                count={userEvent.totalPages}
                page={page}
                onChange={handleChange}
              />
              <Typography>Page: {page}</Typography>
            </Stack>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default CurrentUserEvent;
