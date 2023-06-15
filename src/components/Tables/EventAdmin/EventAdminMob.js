import React from 'react'
import { MdLocationOn } from "react-icons/md";
import { MdWatchLater } from "react-icons/md";
import { IoSchoolSharp } from 'react-icons/io5';
import "./EventAdmin.css"

const cardData = [
    {
        event_catogary: "Education",
        organizer: "Indian Business School",
        location: "Hyderabad",
        event_type: "Online Event",
        date: "Jan 2 , 2023 | 12:31 pm",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque sint consectetur nemo volup",
      },
      {
        event_catogary: "Education",
        organizer: "Indian Business School",
        location: "Hyderabad",
        event_type: "Online Event",
        date: "Jan 2 , 2023 | 12:31 pm",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque sint consectetur nemo volup",
      },
      {
        event_catogary: "Education",
        organizer: "Indian Business School",
        location: "Hyderabad",
        event_type: "Online Event",
        date: "Jan 2 , 2023 | 12:31 pm",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque sint consectetur nemo volup",
      },
      {
        event_catogary: "Education",
        organizer: "Indian Business School",
        location: "Hyderabad",
        event_type: "Online Event",
        date: "Jan 2 , 2023 | 12:31 pm",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque sint consectetur nemo volup",
      },
      {
        event_catogary: "Education",
        organizer: "Indian Business School",
        location: "Hyderabad",
        event_type: "Online Event",
        date: "Jan 2 , 2023 | 12:31 pm",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque sint consectetur nemo volup",
      },
  {
    event_catogary: "Education",
    organizer: "Indian Business School",
    location: "Hyderabad",
    event_type: "Online Event",
    date: "Jan 2 , 2023 | 12:31 pm",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque sint consectetur nemo volup",
  },
  {
    event_catogary: "Education",
    organizer: "Indian Business School",
    location: "Hyderabad",
    event_type: "Online Event",
    date: "Jan 2 , 2023 | 12:31 pm",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque sint consectetur nemo volup",
  },
  {
    event_catogary: "Education",
    organizer: "Indian Business School",
    location: "Hyderabad",
    event_type: "Online Event",
    date: "Jan 2 , 2023 | 12:31 pm",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque sint consectetur nemo volup",
  },
];

const EventAdmin = () => {
  return (
    <div>
       <div id='alleven1' className="allevent" >
            {cardData.map((e) => (
              <div id='Card' className="card" >
                <div id='Card-1' className="card-1">
                  <small ><IoSchoolSharp size={16} color="green" style={{marginRight:'4px'}} /> 
                    {e.event_catogary}{" "}  
                  </small> 
                  <div style={{display:'flex', alignItems:'center'}}>
           <strong style={{marginLeft:"35px", marginTop:"8px", marginBottom:"8px", color:"black"}}>{e.organizer},</strong>
           <span style={{marginLeft:"5px", marginTop:"8px", marginBottom:"8px" }}>{e.location}</span>
              </div>

                </div>
                <div id='Card-2' className="card-2">
                  <small>
                    <MdLocationOn id='Location' color="grey" size={20} />
                    {e.event_type}
                  </small>
                  <br />
                  <date>
                    {" "}
                    <MdWatchLater id='WatchLater' size={20} color="grey" />
                    {e.date}
                  </date>
                  <p></p>
                </div>
                <div id='Desc' className="desc">
                  <p>{e.desc}</p>
                </div>
                <div id='Card-4' /*style={{display: "flex", justifyContent: "space-evenly", padding:'15px', paddingTop:'0px'}}*/ className="card-4">
                  <button id='Delb' >Delete Event</button>
                  <button id='Viewb'>View Event</button>
                </div>
                <hr style={{ marginLeft: "-10px", width: "100vw" }} />
              </div>
            ))}
          </div>
    </div>
  )
}

export default EventAdmin
