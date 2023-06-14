import axios from "axios";
import React, { useState } from "react";
import { MdLocationOn } from "react-icons/md";
import { MdWatchLater } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import exclusiveimg from "../../images/Group.png";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

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
      url: "https://api.speakerore.com/api/geteventforapproval",
      withCredentials: true,
    })
      .then((res) => {
        setEventsForApproval(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    geteventforapproval();
  }, []);

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
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(feedback);
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
      })
      .catch((err) => {
        console.log(err);
      });
  };

 const handleFeedbackSubmit = (event) => {
setFeedback(event.target.value)
 }

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
                      <button
                        onClick={() => {
                          setDeleteevent(e._id);
                          handleClickOpen();
                        }}
                      >
                        Delete Event
                      </button>
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
                              handleFeedbackSubmit(e)
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
                      <button
                        style={{
                          color: "#24754F",
                          border: "#24754F 1px solid",
                        }}
                        onClick={() => {
                          handleApproveEvent(e._id);
                        }}
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
