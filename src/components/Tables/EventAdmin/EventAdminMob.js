import React, { useState, useEffect } from "react";
import { MdLocationOn } from "react-icons/md";
import { MdWatchLater } from "react-icons/md";
import { IoSchoolSharp } from "react-icons/io5";
import "./EventAdmin.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { BsArrowRightCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import axios from "axios";



const EventAdmin = () => {

  function convertDate(e) {
    const date = new Date(e).toLocaleString();
    return date;
  }

  const [eventsForApproval, setEventsForApproval] = useState([]);
  const [deleteEventId, setDeleteEventId] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [feedback, setFeedback] = useState("");

  const getEventForApproval = () => {
    axios
      .get("https://api.speakerore.com/api/geteventforapproval", {
        withCredentials: true,
      })
      .then((res) => {
        setEventsForApproval(res.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.status === 404) {
          setEventsForApproval([]);
        }
      });
  };

  let navigate = useNavigate();

  useEffect(() => {
    getEventForApproval();
  }, []);

  const handleEventDelete = () => {
    axios
      .patch(
        "https://api.speakerore.com/api/makeeventdecline",
        {
          eventId: deleteEventId,
          feedback: feedback,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        getEventForApproval();
        setDialogOpen(false);
        setFeedback("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleApproveEvent = (eventId) => {
    axios
      .patch(
        "https://api.speakerore.com/api/makeeventapprove",
        {
          eventId,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        getEventForApproval();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const openDeleteDialog = (eventId) => {
    setDeleteEventId(eventId);
    setDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteEventId("");
    setDialogOpen(false);
    setFeedback("");
  };

  const handleFeedbackSubmit = (e) => {
    setFeedback(e.target.value);
  };

  return (
    <div>
      <div className="allevent" id="alleven1">
        {Array.isArray(eventsForApproval.savedEvents) ? (
          eventsForApproval.savedEvents.map((event) => (
            <div className="card" id="Card" key={event._id}>
              <div className="card-1" id="Card-1">
                <small>
                  <IoSchoolSharp size={16} color="green" style={{ marginRight: "4px" }} />
                  {event.Category}
                </small>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <strong style={{ marginLeft: "35px", marginTop: "8px", marginBottom: "8px" }}>
                    {event.Approved ? "Approved" : "Pending Approval"}
                  </strong>
                  <div
                    className={`dot ${event.Approved ? "approved" : "pending"}`}
                    style={{ marginLeft: "8px" }}
                  ></div>
                </div>
              </div>
              <div className="card-2" id="Card-2">
                <small>
                  <MdLocationOn id="Location" color="grey" size={20} />
                  {event.Location}
                </small>
                <small>
                  <MdWatchLater id="Watch" color="grey" size={20} />
                  {convertDate(event.EventEndDateAndTime)}
                </small>
              </div>
              <div className="card-3" id="Card-3">
                <h4>{event.ShortDescriptionOfTheEvent}</h4>
                <p>{event.Description}</p>
              </div>
              <div className="arrow-icon">
                <BsArrowRightCircle
                  className="arrow-icon-main"
                  size={40}
                  color="grey"
                  onClick={() => {
                    navigate(`/event/${event._id}`);
                  }}
                />
              </div>
              <div className="card-4" id="Card-4">
                <button onClick={() => handleApproveEvent(event._id)}>View Event</button>
                <button onClick={() => openDeleteDialog(event._id)}>Delete Event</button>
              </div>
            </div>
          ))
        ) : (
          <p>No events for approval.</p>
        )}
      </div>
      <Dialog open={dialogOpen} onClose={closeDeleteDialog}>
        <DialogTitle>{"Please provide feedback"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <input type="text" onChange={(e) => handleFeedbackSubmit(e)} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button onClick={closeDeleteDialog} autoFocus>
            Cancel
          </button>
          <button onClick={handleEventDelete} autoFocus>
            Submit
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EventAdmin;