import axios from "axios";
import React, { useState } from "react";
import { MdLocationOn } from "react-icons/md";
import { MdWatchLater } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";


const EventAdmin = ({ eventsForApproval }) => {
  const [eventId, setEventId] = useState("");
  const [page, setPage] = React.useState(1);

  const handleChange = (event, value) => {
    setPage(value);
  };

  let navigate = useNavigate();

  function convertDate(e) {
    const date = new Date(e).toLocaleString();
    return date;
  }

  const handleSingleView = () => {
    console.log("single view is running");
    // axios({
    //   method: "get",
    //   url: `http://localhost:5000/api/getsingleevent/${eventId}`,
    //   withCredentials: true,
    // })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  const handleEventDelete = () => {
    console.log("delete is running ");
    // axios({
    //   method: "patch",
    //   url: "http://localhost:5000/api/makeeventapprove",
    //   data: {
    //     eventId: "", // event id will go to make event approve
    //   },
    //   withCredentials: true,
    // })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  const handleApproveEvent = () => {
    console.log("approve is runing ");
    // axios({
    //   method: "patch",
    //   url: "http://localhost:5000/api/makeeventdecline",
    //   data: {
    //     eventId: "", // event id will go to make event approve
    //   },
    //   withCredentials: true,
    // })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  return (
    <div>
      <div className="allevent" style={{ flexWrap: "wrap" }}>
        <div>
          {eventsForApproval ? (
            <div>
              <div className="card-container">
                {eventsForApproval.savedEvents.map((e) => (
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
                      <small>
                        <MdLocationOn color="grey" size={20} />
                        <h>{e.Mode}</h>
                      </small>
                      <br />
                      <date>
                        {" "}
                        <MdWatchLater size={20} color="grey" />
                        <q>{convertDate(e.EventEndDateAndTime)}</q>
                      </date>
                      <p></p>
                    </div>
                    <div className="desc">
                    <p>{e.ShortDescriptionOfTheEvent}</p>
                    </div>
                    <div className="card-4">
                      <button onClick={handleEventDelete}>Delete Event</button>
                      <button
                        style={{
                          color: "#24754F",
                          border: "#24754F 1px solid",
                        }}
                        onClick={handleApproveEvent}
                      >
                        Approve Event
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <Stack spacing={2}>
                <Pagination
                  style={{ justifyContent: "center", marginTop: "20px" }}
                  count={eventsForApproval.totalPages}
                  page={page}
                  onChange={handleChange}
                />
                <Typography>Page: {page}</Typography>
              </Stack>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default EventAdmin;
