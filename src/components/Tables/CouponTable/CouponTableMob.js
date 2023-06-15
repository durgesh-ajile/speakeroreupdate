import React from "react";
import CouponCard from "./CouponCard";

const CouponTableMob = () => {
  return (
    <div>
      <CouponCard />
      <hr style={{ marginLeft: 0, width: "100vw" }} />
      <CouponCard />
      <hr style={{ marginLeft: 0, width: "100vw" }} />
      <CouponCard />
    </div>
  );
};

export default CouponTableMob;
