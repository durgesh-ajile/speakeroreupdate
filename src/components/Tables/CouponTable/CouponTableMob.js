import React from "react";
import CouponCard from "./CouponCard";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const CouponTableMob = () => {
  const [couponData, setCouponData] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios({
      method: "get",
      url: "https://api.speakerore.com/api/getallcoupons",
      withCredentials: true,
    })
      .then((res) => {
        setCouponData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function convertDate(e) {
    const date = new Date(e).toLocaleDateString();
    return date;
  }

  return (
    <div>
     {couponData && couponData.savedCoupon.map((row) => (
      <>
      <div className="coupon-card-continer">
      <div className="user-id">
        <span>COUPON CODE</span>
        <div></div>
        <span> {row.coupon_code}</span>
      </div>

      <div className="plan-type">
        <span>Discount</span>
        <div></div>
        <span style={{ color: "gray" }}>{row.discount}%</span>
      </div>
      <div className="date-wrapper">
        <div className="start-date">
          <span>Maximum Usage</span>
          <div></div>
          <span style={{ color: "gray" }}>{row.max_usages}</span>
        </div>
        <div className="expiry-date">
          <span>Expiry Date</span>
          <div></div>
          <span style={{ color: "gray" }}>{convertDate(row.expiration_date)}</span>
        </div>
      </div>

      <div>
        <button className="disable-btn">Disable</button>
      </div>
    </div>
      <hr style={{ marginLeft: 0, width: "100vw" }} />
    </>
    ))}
    </div>
  );
};

export default CouponTableMob;
