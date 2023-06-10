import React from "react";
import "./subcription.css";
import mic from "../../images/FINAL-07 1.png";
import pinkback from '../../images/Vector 9.png'
import orangeback from '../../images/Vector 10.png'

const pricedata = [
  {
    type: "Half-Yearly",
    price: 7000,
    desc: "Find your Life Changing Event. ",
  },
  {
    type: "Quaterly",
    price: 5000,
    desc: "Find your Life Changing Event. ",
  },
  {
    type: "Monthly ",
    price:  833,
    desc: "Find your Life Changing Event.  ",
  },
];

const Subscription = () => {
  return (
    <div className="subscribe-conatiner">
      <div className="text-container">
        <div className="mic-img">
          <img id='orange' src={orangeback} />
          <img id='pink' src={pinkback} />
          <img id='bee' src={mic} />
        </div>
        <div className="heading">
          <span>Speaker Ore</span>
          <small>Goldmine Control Room</small>
          <p>Take Action, Ownership and Start Mining</p>
        </div>
        <div className="goldmine">
        </div>
        <div className="para">
          <span>
            Find your Life Changing Event. Speaking is a serious
            <br /> Business .Every Expert must get noticed to build their <br />
            empire of followers. Knowledge within you wont help
            <br /> the world at large. Your Time is the Most Expensive <br />
            Opportunity Cost.
          </span>
        </div>
      </div>
      <div className="price-container">
        {pricedata.map((e) => {
          return (
            <div className="pricebox">
              <div className="price-details">
                <div className="input"><input type="radio" /></div>
                <div className="price-type">
                  <small>{e.type}</small>
                  <span>{e.desc}</span>
                </div>
              </div>
              <div className="price">
                <price>₹ {e.price}</price>
              </div>
            </div>
          );
        })}
        <div className="price-continue">
        <button>CONTINUE</button>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
