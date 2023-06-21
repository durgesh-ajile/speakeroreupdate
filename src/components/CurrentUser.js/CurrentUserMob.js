import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { MdWatchLater } from "react-icons/md";
import exclusiveimg from "../../images/Group.png";
import { IoSchoolSharp } from "react-icons/io5";
import axios from "axios";
import { Pagination, Stack, Typography } from "@mui/material";

const CurrentUserMob = () => {
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
    <div className="input-div">
        <input
          placeholder="Search via roles"
          style={{
            padding: "8px 8px 8px 32px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            backgroundColor: "#f5f5f5",
            width: "280px",
            margin: "20px 0",
            backgroundImage: `url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"%3E%3Ccircle cx="11" cy="11" r="8" fill="white" /%3E%3Cpath d="M21 21l-4.35-4.35" /%3E%3C/svg%3E')`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "8px center",
            backgroundSize: "16px",
          }}
          value={searchKey}
          onChange={(e) => {
            setSearchKey(e.target.value);
          }}
        />
        </div>
        {userEvent ? (
      <div className="allevent" style={{ flexWrap: "wrap" }}>
        {filter ? (
            filter.map((e) => (
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
                  {convertDate(e.EventStartDateAndTime)}
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
          ) : searchKey ? (
            <div>
              <h3>No Matching Events</h3>
            </div>
          ) : (

          userEvent.savedEventsOfCurrentUser.map((e) => (
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
                  {convertDate(e.EventStartDateAndTime)}
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
        )}
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
  );
};

export default CurrentUserMob;
