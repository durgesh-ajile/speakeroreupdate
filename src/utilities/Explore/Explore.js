import React, { useState } from "react";
// import "./Explore.css";


const Explore = () => {
  const data = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  const [items, setItems] = useState(data);

  return (
    <>
      {/* <div className="container"> */}
        <div className="bg-navbar">
          <div className="bg-logo"></div>
          <div className="bg-nav">
            <a className="bg-events" href="#">
              Events
            </a>
            <a className="bg-newevent" href="#">
              Create New Events
            </a>
            <a className="bg-upgrade" href="#">
              Upgrade
            </a>
            <span className="vertical-line"></span>
            <a className="bg-name" href="#">
              HI DIVYA!
            </a>
          </div>
        </div>
        <div className="bg-line"></div>
        <div className="bg-title">
          Explore the cateogaries of <span className="bg-title-name">SpeakerOre</span>
        </div>
       
        {/* {items.map((item, index) => {
          return <Card item={item} key={index} />;
        })} */}
      {/* </div> */}
    </>
  );
};

export default Explore;