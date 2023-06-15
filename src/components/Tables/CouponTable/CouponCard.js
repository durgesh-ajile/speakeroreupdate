import React from "react";
import "./couponCard.css";

const CouponCard = () => {
  return (
    <div className="coupon-card-continer">
      <div className="user-id">
        <span>COUPON CODE</span>
        <div></div>
        <span>123456789</span>
      </div>

      <div className="plan-type">
        <span>Amount</span>
        <div></div>
        <span style={{ color: "gray" }}>833</span>
      </div>
      <div className="date-wrapper">
        <div className="start-date">
          <span>Start Date</span>
          <div></div>
          <span style={{ color: "gray" }}>22.01.2022</span>
        </div>
        <div className="expiry-date">
          <span>Expiry Date</span>
          <div></div>
          <span style={{ color: "gray" }}>22.01.2022</span>
        </div>
      </div>

      <div>
        <button className="disable-btn">Disable</button>
      </div>
    </div>
  );
};

export default CouponCard;
