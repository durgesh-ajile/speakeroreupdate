import React from "react";
import "./UsersCard.css";

const UsersCard = () => {
  return (
    <div className="coupon-card-continer">
      <div className="user-id">
        <span>USER ID</span>
        <div></div>
        <span>123456789</span>
      </div>
      <p className="mail">abcd@gmail.com</p>
      <div className="plan-type">
        <span>Role</span>
        <div></div>
        <span style={{ color: "gray" }}>ABCD</span>
      </div>

      <div>
        <button id="Button" className="blacklist-btn">Remove</button>
        <button id="Button" className="make-members-btn">Blacklist</button>
      </div>
    </div>
  );
};

export default UsersCard;
