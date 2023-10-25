import React, { useRef } from "react";
import "./Eventmob.css";
// import filter_icon from '../../assets/img/filter_icon.jpg'
import { useState } from "react";
import "./sidebar.css";
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
import { BiSearchAlt } from "react-icons/bi";
import UserPopup from "../Pop/UserPopUp";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, useMediaQuery } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { styled, useTheme } from "@mui/material/styles";

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

const Eventlist = () => {
  const [filterToggle, setFilterToggle] = useState(true);
  const NavbarboxRefFilter = useRef(null);
  const [approvedEvent, setApprovedEvent] = useState();
  const [online, setOnline] = useState(false);
  const [inperson, setInperson] = useState(false);
  const [hybrid, setHybrid] = useState(false);
  const [exclusive, setExclusive] = useState(false);
  const [page, setPage] = React.useState(1);
  const [mode, setMode] = React.useState();
  const [category, setCategory] = React.useState();
  const [searchKey, setSearchKey] = React.useState();
  const [filter, setFilter] = useState();
  const [showdate, setShowDate] = React.useState();
  const [filterdate, setFilterDate] = React.useState();
  const [user, setUser] = useState("");
  const [filterPage, setFilterPage] = React.useState(1);
  const [filterTotalPage, setFilterTotalPage] = React.useState();
  const [deleteevent, setDeleteevent] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [role, setRole] = useState("");
  const [feedback, setFeedback] = React.useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event, value) => {
    setFilterPage(value);
  };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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

  useEffect(() => {
    axios({
      method: "get",
      url: `https://api.speakerore.com/api/getallapprovedevent?page=${page}`,
      withCredentials: true,
    })
      .then((res) => {
        console.log(res);
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
  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 60) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page]);

  const handleToggle = () => {
    const box = NavbarboxRefFilter.current;
    // Apply initial styles
    box.style.transition = "transform 0.3s ease-in-out";
    box.style.transform = filterToggle && "translateX(70%)";
    box.style.right = !filterToggle && "-21%";
    box.style.display = filterToggle ? "block" : "none";

    // Delay style changes to ensure initial styles are applied before transition
    setTimeout(() => {
      box.style.transition = "transform 0.3s ease-out";
      box.style.transform = filterToggle
        ? "translateX(-0%)"
        : "translateX(70%)";
      box.style.right = filterToggle ? "0%" : "-21%";
    }, 200);
    setFilterToggle(!filterToggle);
  };
  
  const handleFeedbackSubmit = (event) => {
    setFeedback(event.target.value);
  };
console.log(role)
  return (
    <>
      {user === "User is not subcribed to view this page" ? (
        <UserPopup />
      ) : null}
      <ToastContainer />
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
            <img src={man} style={{ width: "100%" }} />
          </div>
        </div>
      </div>
      <div className="Eventlist_container">
        <div className="Eventlist_container_left">
          <h4 style={{ margin: "10px" }}>Events list</h4>
        </div>

        <div
          onClick={() => handleToggle()}
          className="Eventlist_container_right"
        >
          {/* <img src={filter_icon} alt="" /> */}
          <h4 style={{ margin: "0 10px" }}>Filter</h4>
        </div>
      </div>
      <hr style={{ width: "100%" }} />
      <div className="input-div" style={{ marginTop: "20px" }}>
        <BiSearchAlt style={{ top: "13px" }} className="ico" />
        <input
          style={{ width: "80%" }}
          placeholder="Search via keyword"
          className="dash-input"
          value={searchKey}
          onChange={(e) => {
            setSearchKey(e.target.value);
          }}
        />
      </div>
      {/* {
            filterToggle && */}
      {!filterToggle && (
        <div
          onClick={() => handleToggle()}
          className="Eventlist_filter_sidebar_empty_div"
        ></div>
      )}

      <div ref={NavbarboxRefFilter} className="Eventlist_filter_sidebar">
        <div className="Eventlist_filter_sidebar_fluid">
          <h3>Filter</h3>
          <p>Models</p>
          <div className="Eventlist_input_type_checkbox" onClick={handleOnline}>
            <input type="radio" checked={online} name="" id="" />
            <p>Online</p>
          </div>
          <div
            className="Eventlist_input_type_checkbox"
            onClick={handleInperson}
          >
            <input type="radio" name="" id="" checked={inperson} />
            <p>In-person</p>
          </div>
          <div className="Eventlist_input_type_checkbox" onClick={handleHybrid}>
            <input type="radio" name="" id="" checked={hybrid} />
            <p>Hybrid</p>
          </div>

          <p>Category</p>

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

          <p>Select a date</p>

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

          <p>SpeakerOre</p>
          <div
            className="Eventlist_input_type_checkbox"
            onClick={handleExclusive}
          >
            <input type="radio" name="" id="" checked={exclusive} />
            <p className="p">SpeakerOre Exclusive</p>
          </div>
        </div>
      </div>
      {/* } */}

      {/* use map funtion here */}
      {filter ? (
        <div>
          <div>
            {filter.map((e) => (
              <>
                <div className="EventlistInfo_container">
                  <div className="EventlistInfo_container_fluid">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div id="Card-1" className="card-1">
                        <small
                          style={{
                            marginLeft: "5px",
                          }}
                        >
                          {e.Category}{" "}
                        </small>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <strong
                            style={{
                              marginLeft: "5px",
                              marginTop: "8px",
                              marginBottom: "8px",
                              color: "black",
                            }}
                          >
                            {e.TitleOfTheEvent},
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

                    <div>
                      <div
                        className="EventlistInfo_location"
                        style={{ color: "#6F6F6F" }}
                      >
                        <div>
                          <MdLocationOn size={20} />
                          <p>{e.Mode}</p>
                        </div>
                        <div style={{ marginLeft: "20px" }}>
                          <MdWatchLater size={20} />
                          <p style={{ marginLeft: "4px" }}>
                            {convertDate(e.EventStartDateAndTime)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="EventlistInfo_bottom_text">
                      <div>
                        <p style={{ marginTop: "5px" }}>
                          {e.ShortDescriptionOfTheEvent}
                        </p>
                        <Link to={`/event/${e._id}`} target="_blank">
                          <button>View Details</button>
                        </Link>
                        {role === "admin" && (
                      <button
                        style={{ marginLeft: "5px", background:"red" }}
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
                  </div>
                </div>
                <hr style={{ width: "100%" }} />
              </>
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
          <div>
            {approvedEvent?.map((e) => (
              <>
                <div className="EventlistInfo_container">
                  <div className="EventlistInfo_container_fluid">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div id="Card-1" className="card-1">
                        <small
                          style={{
                            marginLeft: "5px",
                          }}
                        >
                          {e.Category}{" "}
                        </small>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <strong
                            style={{
                              marginLeft: "5px",
                              marginTop: "8px",
                              marginBottom: "8px",
                              color: "black",
                            }}
                          >
                            {e.TitleOfTheEvent},
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

                    <div>
                      <div
                        className="EventlistInfo_location"
                        style={{ color: "#6F6F6F" }}
                      >
                        <div>
                          <MdLocationOn size={20} />
                          <p>{e.Mode}</p>
                        </div>
                        <div style={{ marginLeft: "20px" }}>
                          <MdWatchLater size={20} />
                          <p style={{ marginLeft: "4px" }}>
                            {convertDate(e.EventStartDateAndTime)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="EventlistInfo_bottom_text">
                      <div>
                        <p style={{ marginTop: "5px" }}>
                          {e.ShortDescriptionOfTheEvent}
                        </p>
                        <Link to={`/event/${e._id}`} target="_blank">
                          <button>View Details</button>
                        </Link>
                        {role === "admin" && (
                      <button
                        style={{ marginLeft: "5px", background:"red" }}
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
                  </div>
                </div>
                <hr style={{ width: "100%" }} />
              </>
            ))}
          </div>
          {/* <Stack spacing={2}>
            <Pagination
              style={{ justifyContent: "center", marginTop: "20px" }}
              count={approvedEvent.totalPages}
              page={page}
              onChange={handleChange}
            />
            <Typography>Page: {page}</Typography>
          </Stack> */}
          {/* <Footer/> */}
        </div>
      ) : (
        ""
      )}
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
    </>
  );
};

export default Eventlist;
