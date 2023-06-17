import * as React from "react";
import { useState } from "react";
import "./sidebar.css";
import { styled, useTheme } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import man from "../../images/Group 11450.png";
import { MdLocationOn } from "react-icons/md";
import { MdWatchLater } from "react-icons/md";
import Calendar from "moedim";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import exclusiveimg from "../../images/Group.png";

const drawerWidth = 340;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [cal, setcal] = React.useState(false);
  const [value, setValue] = useState(new Date());
  const [approvedEvent, setApprovedEvent] = useState();
  const [online, setOnline] = useState(false);
  const [inperson, setInperson] = useState(false);
  const [hybrid, setHybrid] = useState(false);
  const [exclusive, setExclusive] = useState(false);
  const [pagiData, setPagiData] = useState();
  const [page, setPage] = React.useState(1);
  const [mode, setMode] = React.useState();
  const [category, setCategory] = React.useState();
  const [date, setDate] = React.useState();
  const [searchKey, setSearchKey] = React.useState();
  const [filter, setFilter] = useState();

  const handleChange = (event, value) => {
    setPage(value);
  };

  let navigate = useNavigate();

  const handleExclusive = () => {
    setExclusive(!exclusive);
  };
  const handleOnline = () => {
    if(!online){
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
    if(!inperson){
      setMode("Offline Event");
      setInperson(true);
    } else {
      setMode("");
      setInperson(false);
    }
    setOnline(false);
    setHybrid(false);
  };

  const handleHybrid = () => {
    if(!hybrid){
      setMode("Hybrid");
      setHybrid(true);
    } else {
      setMode("");
      setHybrid(false);
    }
    setOnline(false);
    setInperson(false);
  };

  const StyledCalendar = styled(Calendar)`
    --moedim-primary: #f00;
  `;
 
  const handleCalendar = () => {
    setcal((prev) => !prev);
  };

  useEffect(() => {
    axios({
      method: "get",
      url: `https://api.speakerore.com/api/getallapprovedevent?page=${page}`,
      withCredentials: true,
    })
      .then((res) => {
        console.log(res);
        setApprovedEvent(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [page]);

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
        if(err.response.status === 422 || 404){
          setFilter('')
        }
      });
  }, [searchKey]);
  console.log(filter);
  console.log(searchKey);


  useEffect(() => {
    if (mode || category || date || exclusive) {
      const apiUrl = `https://api.speakerore.com/api/geteventsbyfilter?${getQueryParams()}`;
      function getQueryParams() {
        const queryParams = [];

        if (mode) {
          queryParams.push(`mode=${mode}`);
        }

        if (category) {
          queryParams.push(`category=${category}`);
        }

        if (date) {
          queryParams.push(`date=${date}`);
        }

        
        if (exclusive !== undefined) {
          queryParams.push(`speakeroreExclusive=${exclusive}`);
          
        }
        return queryParams.join("&");
      }
     

      axios({
        method: "get",
        url: apiUrl,
        withCredentials: true,
      })
        .then((res) => {
          console.log(res);
          setFilter(res.data.savedEvents);
        })
        .catch((err) => {
          console.log(err);
          setFilter("");
        });
    }
    if (!mode && !category && !date && ! exclusive) {
      setFilter('')
    }
  }, [mode, category, date, exclusive]);


  function convertDate(e) {
    const date = new Date(e).toLocaleString();
    return date;
  }
  console.log(date)
  console.log(filter)

  return (
    <div className="event-main">
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
              <input type="checkbox" checked={online}  />
              <lable>Online</lable>
            </div>

            <div onClick={handleInperson}>
              <input
                type="checkbox"
                checked={inperson}
              />
              <lable>In-person</lable>
            </div>

            <div onClick={handleHybrid}>
              <input type="checkbox" checked={hybrid} />
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
                Artificial Intelligence{" "}
              </option>
              <option value="Automobile">Automobile</option>
              <option value="Banking">Banking </option>
              <option value="Business">Business</option>
              <option value="Coaching">Coaching</option>
              <option value="Communication">Communication</option>
              <option value="Design Thinking">Design Thinking</option>
              <option value="Education">Education</option>
              <option value="Finance">Finance</option>
              <option value="Fitness">Fitness</option>
              <option value="Health">Health</option>
              <option value="Human resource">Human resource </option>
              <option value="Innovation">Innovation </option>
              <option value="Leadership">Leadership</option>
              <option value="LGBTQ">LGBTQ</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Marketing">Marketing</option>
              <option value="Oil Gas">Oil Gas</option>
              <option value="Parenting">Parenting</option>
              <option value="Presentation Skill">Presentation Skill</option>
              <option value="Retails">Retails</option>
              <option value="Sales"> Sales</option>
              <option value="Soft Skill">Soft Skill</option>
            </select>
          </div>
          <div>
            <h4>Select a date</h4>
          </div>
          <div className="calendar">
            <input
              value={value}
              onClick={handleCalendar}
              placeholder="Select start date"
            />
          </div>
          <div onClick={handleExclusive}>
            <h4>SpeakerOre</h4>
            <div className="speaker-exclusive">
              <input
                type="checkbox"
                checked={exclusive}
              />
              <lable>Exclusive</lable>
            </div>
          </div>

          {cal == true ? (
            <Calendar value={value} onChange={(d) => setValue(d)} />
          ) : (
            ""
          )}
          <div className="filter-input">
          <h4>Search by keyword</h4>
          <input placeholder=" Type here" value={searchKey} onChange={(e)=> {
            setSearchKey(e.target.value)
          }} />
          </div>
        </div>
      </div>

      <div className="right-container-e" id='right-container-event'>
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
                      <q>{convertDate(e.EventEndDateAndTime)}</q>
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
              ))}
            </div>
            <Stack spacing={2}>
              <Pagination
                style={{ justifyContent: "center", marginTop: "20px" }}
                count={filter.totalPages}
                page={page}
                onChange={handleChange}
              />
              <Typography>Page: {page}</Typography>
            </Stack>
          </div>
        ) : mode || category || date || exclusive || searchKey ? (<div>
          <h3>No Matching Events</h3>
        </div>) : approvedEvent ? (
          <div>
            <div className="card-container">
              {approvedEvent.savedEvents.map((e) => (
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
                      <q>{convertDate(e.EventEndDateAndTime)}</q>
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
              ))}
            </div>
            <Stack spacing={2}>
              <Pagination
                style={{ justifyContent: "center", marginTop: "20px" }}
                count={approvedEvent.totalPages}
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
  );
}
