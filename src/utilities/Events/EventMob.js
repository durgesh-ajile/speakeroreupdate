import React, { useRef } from "react";
import "./Eventmob.css";
// import filter_icon from '../../assets/img/filter_icon.jpg'
import EventlistInfo from "./EventlistInfo";
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
import { BiSearchAlt } from "react-icons/bi";

const Eventlist = () => {
  const [filterToggle, setFilterToggle] = useState(true);
  const NavbarboxRefFilter = useRef(null);
  const [cal, setcal] = React.useState(false);
  const [value, setValue] = useState(new Date());
  const [approvedEvent, setApprovedEvent] = useState();
  const [online, setOnline] = useState(false);
  const [inperson, setInperson] = useState(false);
  const [hybrid, setHybrid] = useState(false);
  const [exclusive, setExclusive] = useState(false);
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

  return (
    <>
      <div className="Eventlist_container">
        <div className="Eventlist_container_left">
          <h4 style={{ margin: "10px 0" }}>Events list</h4>
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
                <BiSearchAlt className="ico" />
                <input
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
            <input type="checkbox" checked={online}  name="" id="" />
            <p>online</p>
          </div>
          <div className="Eventlist_input_type_checkbox" onClick={handleInperson}>
            <input type="checkbox" name="" id="" checked={inperson}/>
            <p>In-person</p>
          </div>
          <div className="Eventlist_input_type_checkbox" onClick={handleHybrid}>
            <input type="checkbox" name="" id="" checked={hybrid}/>
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

          <p>Select a date</p>

          <div className="calendar">
            <input
              value={value}
              onClick={handleCalendar}
              placeholder="Select start date"
            />
          </div>

          <p>SpeakerOre</p>
          <div className="Eventlist_input_type_checkbox"  onClick={handleExclusive}>
            <input type="checkbox" name="" id=""  checked={exclusive}/>
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
          <div>
            {/* <img src={education} alt="" /> */}
            <p>{e.Category}</p>
          </div>

          <p style={{ margin: "0" }}>
            <b>{e.OrganizerName},</b> <span>{e.City}</span>{" "}
          </p>

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
                <p style={{ marginLeft: "4px" }}>{convertDate(e.EventEndDateAndTime)}</p>
              </div>
            </div>
          </div>
          <div className="EventlistInfo_bottom_text">
            <div>
              <p style={{ marginTop: "5px" }}>{e.ShortDescriptionOfTheEvent}</p>
              <button onClick={() => {
                        navigate(`/event/${e._id}`);
                      }} >View Details</button>
            </div>
          </div>
        </div>
      </div>
      <hr style={{ width: "100%" }} />
      </> ))}
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
            <div>
      {approvedEvent?.savedEvents.map((e) => (
      <>
      <div className="EventlistInfo_container">
        <div className="EventlistInfo_container_fluid">
          <div>
            {/* <img src={education} alt="" /> */}
            <p>{e.Category}</p>
          </div>

          <p style={{ margin: "0" }}>
            <b>{e.OrganizerName},</b> <span>{e.City}</span>{" "}
          </p>

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
                <p style={{ marginLeft: "4px" }}>{convertDate(e.EventEndDateAndTime)}</p>
              </div>
            </div>
          </div>
          <div className="EventlistInfo_bottom_text">
            <div>
              <p style={{ marginTop: "5px" }}>{e.ShortDescriptionOfTheEvent}</p>
              <button onClick={() => {
                        navigate(`/event/${e._id}`);
                      }} >View Details</button>
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
    </>
    
  );
};

export default Eventlist;