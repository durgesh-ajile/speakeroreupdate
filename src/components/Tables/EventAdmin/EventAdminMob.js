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
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import exclusiveimg from "../../../images/Group.png";
import { ToastContainer, toast } from "react-toastify";

const successToast = {
  position: "bottom-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

const EventAdmin = () => {
  const [deleteevent, setDeleteevent] = React.useState("");
  const [feedback, setFeedback] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [eventId, setEventId] = useState("");
  const [eventsForApproval, setEventsForApproval] = useState("");
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = useState(false);
  const [searchKey, setSearchKey] = React.useState();
  const [filter, setFilter] = useState();

  const handleChange = (event, value) => {
    setPage(value);
  };

  let navigate = useNavigate();

  function convertDate(e) {
    const date = new Date(e).toLocaleString();
    return date;
  }

  const geteventforapproval = () => {
    axios({
      method: "get",
      url: `https://api.speakerore.com/api/geteventforapproval?page=${page}`,
      withCredentials: true,
    })
      .then((res) => {
        setEventsForApproval(res.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 404) {
          setEventsForApproval("");
        }
      });
  };

  useEffect(() => {
    axios({
      method: "get",
      url: `https://api.speakerore.com/api/geteventbyquery?keyword=${searchKey}&page=${page}`,
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
  }, [searchKey]);

  useEffect(() => {
    geteventforapproval();
  }, []);

  useEffect(() => {
    geteventforapproval();
  }, [loading, page]);

  const handleSingleView = () => {
    axios({
      method: "get",
      url: `https://api.speakerore.com/api/getsingleevent/${eventId}`,
      withCredentials: true,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEventDelete = () => {
    axios({
      method: "patch",
      url: "https://api.speakerore.com/api/makeeventdecline",
      data: {
        eventId: deleteevent,
        feedback: feedback,
      },
      withCredentials: true,
    })
      .then((res) => {
        console.log(res);
        setLoading(!loading);
        toast.success(res.data.Message, successToast);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message, successToast);
      });
  };

  const handleApproveEvent = (id) => {
    axios({
      method: "patch",
      url: "https://api.speakerore.com/api/makeeventapprove",
      data: {
        eventId: id,
      },
      withCredentials: true,
    })
      .then((res) => {
        console.log(res);
        geteventforapproval();
        setLoading(!loading);
        toast.success(res.data.Message, successToast);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message, successToast);
      });
  };

  const handleFeedbackSubmit = (event) => {
    setFeedback(event.target.value);
  };

  return (
    <div>
      <ToastContainer />
      {eventsForApproval ? (
        <div id="alleven1" className="allevent">
          {filter ? (
            filter.map((e) => (
              <div id="Card" className="card">
                <div id="Card-1" className="card-1">
                  <small>
                    <IoSchoolSharp
                      size={16}
                      color="green"
                      style={{ marginRight: "4px" }}
                    />
                    {e.event_catogary}{" "}
                  </small>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <strong
                      style={{
                        marginLeft: "35px",
                        marginTop: "8px",
                        marginBottom: "8px",
                        color: "black",
                      }}
                    >
                      {e.organizer},
                    </strong>
                    <span
                      style={{
                        marginLeft: "5px",
                        marginTop: "8px",
                        marginBottom: "8px",
                      }}
                    >
                      {e.location}
                    </span>
                  </div>
                </div>
                <div id="Card-2" className="card-2">
                  <small>
                    <MdLocationOn id="Location" color="grey" size={20} />
                    {e.event_type}
                  </small>
                  <br />
                  <date>
                    {" "}
                    <MdWatchLater id="WatchLater" size={20} color="grey" />
                    {e.date}
                  </date>
                  <p></p>
                </div>
                <div id="Desc" className="desc">
                  <p>{e.desc}</p>
                </div>
                <div
                  id="Card-4"
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    padding: "15px",
                    paddingTop: "0px",
                  }}
                  className="card-4"
                >
                  <button id="Delb">Delete Event</button>
                  <button id="Viewb">View Event</button>
                </div>
                <hr style={{ marginLeft: "-10px", width: "100vw" }} />
              </div>
            ))
          ) : searchKey ? (
            <div>
              <h3>No Matching Events</h3>
            </div>
          ) : (
            eventsForApproval.savedEvents.map((e) => (
              <div id="Card" className="card">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div id="Card-1" className="card-1">
                    <small>
                      <IoSchoolSharp
                        size={16}
                        color="green"
                        style={{ marginRight: "4px" }}
                      />
                      {e.Category}{" "}
                    </small>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <strong
                        style={{
                          marginLeft: "35px",
                          marginTop: "8px",
                          marginBottom: "8px",
                          color: "black",
                        }}
                      >
                        {e.OrganizerName},
                      </strong>
                      <span
                        style={{
                          marginLeft: "5px",
                          marginTop: "8px",
                          marginBottom: "8px",
                        }}
                      >
                        {e.City}
                      </span>
                    </div>
                  </div>
                  <div>
                    {e.isSpeakerOreExclusive ? (
                      <img src={exclusiveimg} />
                    ) : null}
                  </div>
                </div>
                <div id="Card-2" className="card-2">
                  <small>
                    <MdLocationOn id="Location" color="grey" size={20} />
                    {e.Mode}
                  </small>
                  <br />
                  <date>
                    {" "}
                    <MdWatchLater id="WatchLater" size={20} color="grey" />
                    {convertDate(e.EventStartDateAndTime)}
                  </date>
                  <p></p>
                </div>
                <div id="Desc" className="desc">
                  <p>{e.ShortDescriptionOfTheEvent}</p>
                </div>
                <div
                  id="Card-4"
                  style={{
                    display: "flex",
                    padding: "0 0 15px",
                    paddingTop: "0px",
                    justifyContent: "space-between",
                  }}
                  className="card-4"
                >
                  <span>
                    <button
                      id="Delb"
                      onClick={() => {
                        setDeleteevent(e._id);
                        handleClickOpen();
                      }}
                    >
                      Delete Event
                    </button>
                    <button
                      id="Viewb"
                      onClick={() => {
                        handleApproveEvent(e._id);
                      }}
                    >
                      Approve Event
                    </button>
                  </span>
                  <div className="arrow-icon">
                    <BsArrowRightCircle
                      className="arrow-icon-main"
                      size={30}
                      color="grey"
                      onClick={() => {
                        navigate(`/event/${e._id}`);
                      }}
                    />
                  </div>
                  <Dialog
                    fullScreen={fullScreen}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                  >
                    <DialogTitle id="responsive-dialog-title">
                      {"Please provide feedback"}
                    </DialogTitle>
                    <DialogContent>
                      <input
                        value={feedback}
                        type="text"
                        onChange={(e) => {
                          handleFeedbackSubmit(e);
                        }}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={() => {
                          handleClose();
                        }}
                        autoFocus
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={() => {
                          handleClose();
                          handleEventDelete();
                        }}
                        autoFocus
                      >
                        Submit
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
                <hr style={{ marginLeft: "-10px", width: "100vw" }} />
              </div>
            ))
          )}
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
        <></>
      )}
    </div>
  );
};

export default EventAdmin;
