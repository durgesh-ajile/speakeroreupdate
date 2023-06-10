import * as React from "react";
import { useState } from "react";
import "./sidebar.css";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import man from "../../images/Group 11450.png";
import { MdLocationOn } from "react-icons/md";
import { MdWatchLater } from "react-icons/md";
import Calendar from "moedim";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

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
  const handleChange = (event, value) => {
    setPage(value);
  };

  let navigate = useNavigate();

  const handleExclusive = () => {
    setExclusive(!exclusive);
  };
  const handleOnline = () => {
    setOnline(!online);
  };

  const handleInperson = () => {
    setInperson(!inperson);
  };

  const handleHybrid = () => {
    setHybrid(!hybrid);
  };

  const StyledCalendar = styled(Calendar)`
    --moedim-primary: #f00;
  `;
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleCalendar = () => {
    setcal((prev) => !prev);
  };

  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:5000/api/getallapprovedevent?page=${page}`,
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
  console.log(approvedEvent);

  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:5000/api/geteventsbyfilter?mode=&category=${"Musician"}&date=${"2023-06-19T13:00:00"}&speakeroreExclusive=${true}`,
      withCredentials: true,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const returnOnline = () => { 
    return 'Online Event'
  }

  function convertDate(e) {
    const date = new Date(e).toLocaleString();
    return date;
  }

  return (
    <Box sx={{ display: "flex", color: "grey" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        style={{ backgroundColor: "#24754F" }}
      >
        {/* <Toolbar style={{ paddingRight: "0" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography noWrap component="" className="topbar">
            <div>
              <h3>
                Gold Deposits - Events Exploration Page{" "}
                <h5>
                  Explore, Map, Analyse, Mine &amp; Extract. For best results,
                  <br /> Choose events from your category and focus!
                </h5>
              </h3>
            </div>
            <div>
              <img src={man} style={{ width: "100%" }} />
            </div>
          </Typography>
        </Toolbar> */}
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
      </AppBar>
      <Drawer
        className="drawer"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            background: "#F6F6F6",
            color: "#666870",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <div style={{ width: "75%", margin: "auto" }}>
          <h1>Filter</h1>
        </div>

        <Divider />
        <div className="filter-sidebar">
          {/* <div style={{width:"75%",margin:"auto"}}><h1>Filter</h1></div> */}
          <div style={{ width: "75%", margin: "auto" }}>
            <h4>Modes</h4>
          </div>
          <div className="mode">
            <div>
              <input type="checkbox" checked={online} onChange={handleOnline} />
              <lable>Online</lable>
            </div>

            <div>
              <input
                type="checkbox"
                checked={inperson}
                onChange={handleInperson}
              />
              <lable>In-person</lable>
            </div>

            <div>
              <input type="checkbox" checked={hybrid} onChange={handleHybrid} />
              <lable>Hybrid</lable>
            </div>
          </div>
          <div style={{ width: "75%", margin: "auto" }}>
            <h4>Category</h4>
          </div>
          <div className="catogary">
            <select placeholder="Select here">
              <option selected>Select</option>
              <option value="">1</option>
              <option>1</option>
              <option>1</option>
            </select>
          </div>
          <div style={{ width: "75%", margin: "auto" }}>
            <h4>Select a date</h4>
          </div>
          <div className="calendar">
            <input
              value={value}
              onClick={handleCalendar}
              placeholder="Select start date"
            />
          </div>
          <div style={{ width: "75%", margin: "auto" }}>
            <h4>SpeakerOre</h4>
            <div>
              <input
                type="checkbox"
                checked={exclusive}
                onChange={handleExclusive}
              />
              <lable>Exclusive</lable>
            </div>
          </div>

          {cal == true ? (
            <Calendar value={value} onChange={(d) => setValue(d)} />
          ) : (
            ""
          )}
        </div>

        <Divider />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <div>
          {approvedEvent ? (
            <div>
              <div className="card-container">
                {approvedEvent.savedEvents.map((e) => (
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
              <Stack spacing={2} >
                <Pagination
                style={{justifyContent:'center', marginTop:'20px'}}
                  count={approvedEvent.totalPages}
                  page={page}
                  onChange={handleChange}
                />
                <Typography >Page: {page}</Typography>
              </Stack>
            </div>
          ) : (
            ""
          )}
        </div>
      </Main>
    </Box>
  );
}
