import React from "react";
import { IoSchoolSharp } from "react-icons/io5";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { MdLocationOn } from "react-icons/md";
import { MdWatchLater } from "react-icons/md";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import exclusiveimg from "../../../images/Group.png";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { BiSearchAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
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

const ArchivedMob = () => {
  const [archivedData, setArchivedData] = useState("");
  const [page, setPage] = React.useState(1);
  const [deleteId, setDeleteId] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchKey, setSearchKey] = React.useState();
  const [filter, setFilter] = useState();

  const handleChange = (event, value) => {
    setPage(value);
  };

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  const handlePermanentDelete = () => {
    axios({
      method: "delete",
      url: `https://api.speakerore.com/api/deleteevent?eventId=${deleteId}`,
      withCredentials: true,
    })
      .then((res) => {
        console.log(res.data);
        setLoading(!loading);
        toast.success(res.data.message, successToast);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message, successToast);
      });
  };

  useEffect(() => {
    axios({
      method: "get",
      url: `https://api.speakerore.com/api/geteventbyqueryforarchived?keyword=${searchKey}&page=${page}`,
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

  console.log(page);
  console.log(archivedData);
  //   console.log(page)

  useEffect(() => {
    axios({
      method: "get",
      url: `https://api.speakerore.com/api/getallarchievedevent?page=${page}`,
      withCredentials: true,
    })
      .then((res) => {
        console.log(res);
        setArchivedData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios({
      method: "get",
      url: `https://api.speakerore.com/api/getallarchievedevent?page=${page}`,
      withCredentials: true,
    })
      .then((res) => {
        console.log(res);
        setArchivedData(res.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 404) {
          setArchivedData("");
        }
      });
  }, [loading, page]);

  return (
    <div>
      <ToastContainer />
      <div className="input-div">
        <input
          placeholder="Search via roles"
          style={{
            padding: "8px 8px 8px 32px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            backgroundColor: "#f5f5f5",
            width: "280px",
            marginTop: "20px",
            backgroundImage: `url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"%3E%3Ccircle cx="11" cy="11" r="8" fill="white" /%3E%3Cpath d="M21 21l-4.35-4.35" /%3E%3C/svg%3E')`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "8px center",
            backgroundSize: "16px",
          }}
          onChange={(e) => {
            setSearchKey(e.target.value);
          }}
        />
      </div>
      {archivedData ? (
        <div id="alleven1" className="allevent">
          {filter ? (
            filter.map((e) => (
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
                    justifyContent: "space-evenly",
                    padding: "15px",
                    paddingTop: "0px",
                  }}
                  className="card-4"
                >
                  <button
                    id="Delb"
                    onClick={() => {
                      handleClickOpen();
                      setDeleteId(e._id);
                    }}
                  >
                    Delete permanently
                  </button>
                  <button
                    id="Viewb"
                    onClick={() => {
                      navigate(`/event/${e._id}`);
                    }}
                  >
                    View Event
                  </button>
                  <Dialog
                    fullScreen={fullScreen}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                  >
                    <DialogTitle id="responsive-dialog-title">
                      {"Do you want to delete this event permanently"}
                    </DialogTitle>

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
                          handlePermanentDelete();
                        }}
                        autoFocus
                      >
                        Delete Event Permanently
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
                <hr style={{ marginLeft: "-10px", width: "100vw" }} />
              </div>
            ))
          ) : searchKey ? (
            <div className="no-event">
              <h3>No Matching Events</h3>
            </div>
          ) : (
            archivedData.savedEvents.map((e) => (
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
                    padding: "15px",
                    paddingTop: "0px",
                  }}
                  className="card-4"
                >
                  <button
                    style={{ marginLeft: "0" }}
                    id="Delb"
                    onClick={() => {
                      handleClickOpen();
                      setDeleteId(e._id);
                    }}
                  >
                    Delete permanently
                  </button>
                  <button
                    id="Viewb"
                    onClick={() => {
                      navigate(`/event/${e._id}`);
                    }}
                  >
                    View Event
                  </button>
                  <Dialog
                    fullScreen={fullScreen}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                  >
                    <DialogTitle id="responsive-dialog-title">
                      {"Do you want to delete this event permanently"}
                    </DialogTitle>

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
                          handlePermanentDelete();
                        }}
                        autoFocus
                      >
                        Delete Event Permanently
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
              count={archivedData.totalPages}
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
  );
};

export default ArchivedMob;
