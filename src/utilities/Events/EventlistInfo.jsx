import React from "react";
// import education from '../../assets/img/education.jpg'
// import location from '../../assets/img/location.jpg'
// import time_icon from '../../assets/img/time_icon.jpg'

const EventlistInfo = () => {
  return (
    <>
      <div className="EventlistInfo_container">
        <div className="EventlistInfo_container_fluid">
          <div>
            {/* <img src={education} alt="" /> */}
            <p>Education</p>
          </div>

          <p style={{ margin: "0" }}>
            <b>Indian Business School,</b> <span>Hyderabad</span>{" "}
          </p>

          <div>
            <div
              className="EventlistInfo_location"
              style={{ color: "#6F6F6F" }}
            >
              <div>
                {/* <img src={location} alt="" /> */}
                <p>Online event</p>
              </div>
              <div style={{ marginLeft: "20px" }}>
                {/* <img src={time_icon} alt="" /> */}
                <p style={{ marginLeft: "5px" }}>Jan 2, 2023 | 12 : 31 pm </p>
              </div>
            </div>
          </div>
          <div className="EventlistInfo_bottom_text">
            <div>
              <p style={{ marginTop: "5px" }}>
                Whatever your interest, from hiking and reading to networking
                and skill sharing...
              </p>
              <button>View Details</button>
            </div>
          </div>
        </div>
      </div>
      <hr style={{ width: "100%" }} />
    </>
  );
};

export default EventlistInfo;
