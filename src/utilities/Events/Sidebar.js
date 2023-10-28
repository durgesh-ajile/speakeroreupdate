import * as React from "react";
import { useState } from "react";
import "./sidebar.css";
import { styled, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import man from "../../images/Group 11450.png";
import { MdLocationOn } from "react-icons/md";
import { MdWatchLater } from "react-icons/md";
import Calendar from "moedim";
import { useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import exclusiveimg from "../../images/Group.png";
import UserPopup from "../Pop/UserPopUp";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import useMediaQuery from "@mui/material/useMediaQuery";
import { adminEMail } from "../Admin/Admin";

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

export default function Sidebar() {
  const [approvedEvent, setApprovedEvent] = useState();
  const [online, setOnline] = useState(false);
  const [inperson, setInperson] = useState(false);
  const [hybrid, setHybrid] = useState(false);
  const [exclusive, setExclusive] = useState(false);
  const [page, setPage] = React.useState(1);
  const [mode, setMode] = React.useState();
  const [category, setCategory] = React.useState();
  const [filterdate, setFilterDate] = React.useState();
  const [searchKey, setSearchKey] = React.useState();
  const [filter, setFilter] = useState();
  const [showdate, setShowDate] = React.useState();
  const [user, setUser] = useState("");
  const [filterPage, setFilterPage] = React.useState(1);
  const [filterTotalPage, setFilterTotalPage] = React.useState();
  const [deleteevent, setDeleteevent] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [feedback, setFeedback] = React.useState("");
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("");

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event, value) => {
    setFilterPage(value);
  };

  let navigate = useNavigate();

  const handleExclusive = () => {
    setExclusive(!exclusive);
  };
  const handleOnline = () => {
    if (!online) {
      setMode("Online Event");
      setOnline(true);
    } else {
      setMode("");
      setOnline(false);
    }
    setHybrid(false);
    setInperson(false);
  };

  const handleInperson = () => {
    if (!inperson) {
      setMode("In Person");
      setInperson(true);
    } else {
      setMode("");
      setInperson(false);
    }
    setOnline(false);
    setHybrid(false);
  };

  const handleHybrid = () => {
    if (!hybrid) {
      setMode("Hybrid Event");
      setHybrid(true);
    } else {
      setMode("");
      setHybrid(false);
    }
    setOnline(false);
    setInperson(false);
  };

  useEffect(() => {
    axios({
      method: "get",
      url: "https://api.speakerore.com/api/getprofile",
      withCredentials: true,
    })
      .then((res) => {
        if (res.data.status) {
          setRole(res.data.response.role);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios({
      method: "get",
      url: `https://api.speakerore.com/api/getallapprovedevent?page=${page}`,
      withCredentials: true,
    })
      .then((res) => {
        if (approvedEvent) {
          setApprovedEvent((prevData) => [
            ...prevData,
            ...res.data.savedEvents,
          ]);
        } else {
          setApprovedEvent(res.data.savedEvents);
        }
      })
      .catch((err) => {
        console.log(err);
        setUser(err.response.data.message);
      });
  }, [page, loading]);

  useEffect(() => {
   axios({
      method: "get",
      url: `https://api.speakerore.com/api/geteventbyquery?keyword=${searchKey}&page=1`,
      withCredentials: true,
    })
      .then((res) => {
        console.log(res);
        setFilter(res.data.queryResult);
        setFilterTotalPage(res.data.totalPage);
        setFilterPage(1)
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 422 || 404) {
          setFilter("");
        }
      })
  }, [searchKey, loading]);

  useEffect(() => {
    axios({
      method: "get",
      url: `https://api.speakerore.com/api/geteventbyquery?keyword=${searchKey}&page=${filterPage}`,
      withCredentials: true,
    })
      .then((res) => {
        console.log(res);
        setFilter(res.data.queryResult);
        setFilterTotalPage(res.data.totalPage);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 422 || 404) {
          setFilter("");
        }
      })
  }, [filterPage]);

  useEffect(() => {
    if (mode || category || filterdate || exclusive) {
      const apiUrl = `https://api.speakerore.com/api/geteventsbyfilter?${getQueryParams()}&page=1`;
      function getQueryParams() {
        const queryParams = [];
        console.log(filterdate);
        if (mode) {
          queryParams.push(`mode=${mode}`);
        }

        if (category) {
          queryParams.push(`category=${category}`);
        }

        if (filterdate) {
          queryParams.push(`date=${filterdate}`);
        }

        if (exclusive) {
          queryParams.push(`exclusive=${exclusive}`);
        }
        return queryParams.join("&");
      }
      axios({
        method: "get",
        url: apiUrl,
        withCredentials: true,
      })
        .then((res) => {
          setFilterPage(1)
          setFilter(res.data.savedEvents);
          setFilterTotalPage(res.data.totalPages);
        })
        .catch((err) => {
          console.log(err);
          setFilter("");
        });
    }
    if (!mode && !category && !filterdate && !exclusive) {
      setFilter("");
    }
  }, [mode, category, filterdate, exclusive, loading]);

  useEffect(() => {
    if (mode || category || filterdate || exclusive) {
      const apiUrl = `https://api.speakerore.com/api/geteventsbyfilter?${getQueryParams()}&page=${filterPage}`;
      function getQueryParams() {
        const queryParams = [];
        console.log(filterdate);
        if (mode) {
          queryParams.push(`mode=${mode}`);
        }
        

        if (category) {
          queryParams.push(`category=${category}`);
        }

        if (filterdate) {
          queryParams.push(`date=${filterdate}`);
        }

        if (exclusive) {
          queryParams.push(`exclusive=${exclusive}`);
        }
        return queryParams.join("&");
      }
      axios({
        method: "get",
        url: apiUrl,
        withCredentials: true,
      })
        .then((res) => {
          setFilter(res.data.savedEvents);
          setFilterTotalPage(res.data.totalPages);
        })
        .catch((err) => {
          console.log(err);
          setFilter("");
        });
    }
    if (!mode && !category && !filterdate && !exclusive) {
      setFilter("");
    }
  }, [mode, category, filterdate, exclusive, filterPage, loading]);

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 20) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function convertDate(e) {
    const dateObject = new Date(e);
    const year = dateObject.getUTCFullYear();
    const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
      dateObject
    );
    const day = dateObject.getUTCDate();
    const hours = dateObject.getUTCHours();
    const minutes = dateObject.getUTCMinutes();
    const seconds = dateObject.getUTCSeconds();
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;

    const dateTimeString = `${day} ${month} ${year} ${formattedHours}:${minutes}:${seconds} ${period}`;
    return dateTimeString;
  }

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
        toast.success(res.data.Message, successToast);
        setLoading(!loading);
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
    <div className="event-main">
      <ToastContainer />
      {user === "User is not subcribed to view this page" ? (
        <UserPopup />
      ) : null}
      <div className="filter-sidebar">
        <div className="filter-child">
          <div>
            <h1>Filter</h1>
          </div>
          <div>
            <h4>Modes</h4>
          </div>
          <div className="mode">
            <div onClick={handleOnline}>
              <input type="radio" checked={online} />
              <lable>Online</lable>
            </div>

            <div onClick={handleInperson}>
              <input type="radio" checked={inperson} />
              <lable>In-person</lable>
            </div>

            <div onClick={handleHybrid}>
              <input type="radio" checked={hybrid} />
              <lable>Hybrid</lable>
            </div>
          </div>
          <div>
            <h4>Category</h4>
          </div>
          <div className="catogary">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select</option>
                  <option value="Advertising">Advertising</option>
                  <option value="Agriculture">Agriculture</option>
                  <option value="Artificial Intelligence">
                    Artificial Intelligence
                  </option>
                  <option value="Automobile">Automobile</option>
                  <option value="Business">Business </option>
                  <option value="Banking">Banking </option>
                  <option value="Coaching">Coaching</option>
                  <option value="Communication">Communication</option>
                  <option value="Data Analysis">Data Analysis</option>
                  <option value="Design Thinking">Design Thinking</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="Education">Education</option>
                  <option value="Environment">Environment</option>
                  <option value="E commerce">E commerce</option>
                  <option value="Finance">Finance</option>
                  <option value="Fitness">Fitness</option>
                  <option value="Food">Food</option>
                  <option value="Health">Health</option>
                  <option value="Human resource">Human resource </option>
                  <option value="Information Technology">
                    Information Technology{" "}
                  </option>
                  <option value="Innovation">Innovation </option>
                  <option value="Leadership">Leadership</option>
                  <option value="LGBTQ">LGBTQ</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Medical">Medical</option>
                  <option value="Musician"> Musician</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Oil Gas">Oil Gas</option>
                  <option value="Parenting">Parenting</option>
                  <option value="Presentation Skill">Presentation Skill</option>
                  <option value="Retails">Retails</option>
                  <option value="Sales"> Sales</option>
                  <option value="Soft Skill">Soft Skill</option>
                  <option value="Sustainability">Sustainability</option>
                  <option value="Tedx">Tedx</option>
            </select>
          </div>
          <div>
            <h4>Select a date</h4>
          </div>
          <div className="calendar">
            <input
              type="date"
              value={showdate}
              onChange={(e) => {
                const date = new Date(e.target.value);
                if (e.target.value) {
                  setFilterDate(date.toISOString());
                } else {
                  setFilterDate("");
                }
                setShowDate(e.target.value);
              }}
            />
            <Button
              onClick={(e) => {
                setFilterDate("");
                setShowDate("");
              }}
            >
              Reset date
            </Button>
          </div>
          <div onClick={handleExclusive}>
            <h4>SpeakerOre</h4>
            <div className="speaker-exclusive">
              <input type="radio" checked={exclusive} />
              <lable>Exclusive</lable>
            </div>
          </div>

          <div className="filter-input">
            <h4>Search by keyword</h4>
            <input
              placeholder=" Type here"
              value={searchKey}
              onChange={(e) => {
                setSearchKey(e.target.value);
              }}
            />
          </div>
        </div>
      </div>

      <div className="right-container-e" id="right-container-event">
        <div className="head-banner">
          <div className="banner-container">
            <div className="view-text">
              <h3>Gold Deposits - Events Exploration Page </h3>
              <h5>
                Explore, Map, Analyse, Mine &amp; Extract. For best results,
                <br /> Choose events from your category and focus!
              </h5>
            </div>
            <div>
              <img src={man} />
            </div>
          </div>
        </div>
        {filter ? (
          <div>
            <div className="card-container">
              {filter.map((e) => (
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
                      <bold>{e.TitleOfTheEvent}</bold>
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
                    {/* <p></p> */}
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
                    {role === "admin" && (
                      <button
                        style={{ marginLeft: "5px" }}
                        onClick={() => {
                          setDeleteevent(e._id);
                          handleClickOpen();
                        }}
                      >
                        Delete Event
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <Stack spacing={2}>
              <Pagination
                style={{ justifyContent: "center", marginTop: "20px" }}
                count={filterTotalPage}
                page={filterPage}
                onChange={handleChange}
              />
              <Typography>Page: {filterPage}</Typography>
            </Stack>
          </div>
        ) : mode || category || filterdate || exclusive || searchKey ? (
          <div className="no-event">
            <h3>No Matching Events</h3>
          </div>
        ) : approvedEvent ? (
          <div>
            <div className="card-container">
              {approvedEvent.map((e) => (
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
                      <bold>{e.TitleOfTheEvent}</bold>
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
                    {/* <p></p> */}
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
                    {role === "admin" && (
                      <button
                        style={{ marginLeft: "5px" }}
                        onClick={() => {
                          setDeleteevent(e._id);
                          handleClickOpen();
                        }}
                      >
                        Delete Event
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          ""
        )}
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
  );
}
