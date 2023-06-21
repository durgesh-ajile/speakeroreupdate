import { Button } from "@mui/material";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

const successToast = {
  position: "bottom-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

const CreateCoupon = () => {
  const [coupon_code, setCoupon_code] = useState("");
  const [subscription_type, setSubscription_type] = useState("");
  const [discount, setDiscount] = useState("");
  const [expiry, setExpiry] = useState("");
  const [usage_count, setUsage_count] = useState("");
  const [max_usages, setMax_usages] = useState("");

  const handleSubmit = () => {
    axios({
      method: "post",
      url: "https://api.speakerore.com/api/createcoupon",
      data: {
        couponCode: coupon_code,
        subcriptionType: subscription_type,
        discount: discount,
        expiryDate: expiry,
        maxUsage: max_usages,
      },
      withCredentials: true,
    })
      .then((res) => {
        console.log(res);
        toast.success(res.data.message, successToast);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message, successToast);
      });
  };
  function handleRemoveClick() {
    setSubscription_type((prevState) => prevState.slice(0, -1));
  }
  return (
    <div className="create-coupon">
      <ToastContainer />

      <div>
        <h3>Coupon Code</h3>
        <input
          value={coupon_code}
          onChange={(e) => {
            setCoupon_code(e.target.value);
          }}
        />
      </div>
      <div>
        <h3>Subscription Type</h3>
        <input defaultValue={subscription_type} readOnly></input>
        <div className="sub-type">
          <select
            value={subscription_type}
            onChange={(e) => {
              setSubscription_type([...subscription_type, e.target.value]);
            }}
          >
            <option selected>Select a subcription</option>
            <option value="Quaterly">Quaterly</option>
            <option value="HalfYearly">Half Yearly</option>
            <option value="Yearly">Yearly</option>
          </select>
          <button onClick={handleRemoveClick}>Remove</button>
        </div>
      </div>
      <div>
        <h3>Discount (in percent)</h3>
        <input
          type="number"
          placeholder=" eg. 10"
          value={discount}
          onChange={(e) => {
            setDiscount(e.target.value);
          }}
        />
      </div>
      <div>
        <h3>Expiry Date</h3>
        <input
          type="date"
          value={expiry}
          onChange={(e) => {
            setExpiry(e.target.value);
          }}
        />
      </div>
      <div>
        <h3>Max Usage</h3>
        <input
          type="number"
          value={max_usages}
          onChange={(e) => {
            setMax_usages(e.target.value);
          }}
        />
      </div>
      <Button
        onClick={handleSubmit}
        variant="contained"
        sx={{ margin: "10px 0" }}
      >
        Submit
      </Button>
    </div>
  );
};

export default CreateCoupon;
