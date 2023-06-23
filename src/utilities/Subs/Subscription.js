

import React, { useEffect, useState } from "react";
import "./subcription.css";
import mic from "../../images/FINAL-07 1.png";
import pinkback from "../../images/Vector 9.png";
import orangeback from "../../images/Vector 10.png";
import axios from "axios";
import { Button } from "@mui/material";


const priceData = [
  // if changing the price of the subscription you need to change it in input field also with classname apply-coupon-input in this file only
  {
    type: "HalfYearly",
    name: "Half Yearly",
    price: 7000,
    showPrice: 7000,
    desc: "Find your Life Changing Event.",
  },
  {
    type: "Quaterly",
    name: "Quaterly",
    price: 5000,
    showPrice: 5000,
    desc: "Find your Life Changing Event.",
  },
  {
    type: "Yearly",
    name: "Monthly",
    price: 9996,
    showPrice: 833,
    desc: "Paid on annual basis.",
  },
];

const Subscription = () => {
  const [selectedType, setSelectedType] = useState("");
  const [staticPrice, setStaticPrice] = useState(priceData);
  const [selectPrice, setSelectPrice] = useState(0);
  const [applied, setApplied] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [checkCouponData, setCheckCouponData] = useState(null);
  const [error, setError] = useState(null);

  const selectedPriceData = priceData.find(
    (item) => item.type === selectedType
  );

  useEffect(() => {
    if (selectedPriceData) {
      setSelectPrice(selectedPriceData.price);
    }
  }, [selectedPriceData]);


  useEffect(() => {
    const selectedPriceData = staticPrice.find((item) => item.type === selectedType);
    if (selectedPriceData) {
      setSelectPrice(selectedPriceData.price);
    }
  }, [selectedType, staticPrice]);

  const handleChange = (e) => {
    setSelectedType(e.target.value);
  };

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    try {
      if (couponCode && selectedType && selectPrice && !applied) {
        const checkCoupon = await axios({
          method: "get",
          url: `https://api.speakerore.com/api/applycouponcode?couponCode=${couponCode}&amount=${selectPrice}&subcriptionType=${selectedType}`,
          withCredentials: true,
        });
        setCheckCouponData(checkCoupon.data)
        setSelectPrice(checkCoupon.data.finalPrice)
        setApplied(true)
        setError('')
        console.log(checkCoupon)
      }
    } catch (error) {
      setCheckCouponData('')
      setError(error)
      console.log(error);
    }
  };
  const generateOrderId = () => {
    const currentDate = new Date();
    const hours = currentDate.getHours().toString().padStart(2, "0");
    const minutes = currentDate.getMinutes().toString().padStart(2, "0");
    const seconds = currentDate.getSeconds().toString().padStart(2, "0");
    return `${hours}${minutes}${seconds}`;
  };
  
  const handlePayments = async (e) => {
    e.preventDefault();
    try {
      if (selectedType && selectedPriceData) {
       window.location.href = `https://api.speakerore.com/api/paymentform?merchant_id=2560771&order_id=${generateOrderId()}&currency=INR&amount=${selectPrice}&merchant_param1=${selectedType}&merchant_param2=${couponCode}`
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(selectedType)
  console.log(selectPrice)

  return (
    <div className="subscribe-container">
      <div className="text-container">
        <div className="mic-img">
          <img id="orange" src={orangeback} />
          <img id="pink" src={pinkback} />
          <img id="bee" src={mic} />
        </div>
        <div className="heading">
          <span>Speaker Ore</span>
          <small>Goldmine Control Room</small>
          <p>Take Action, Ownership and Start Mining</p>
        </div>
        <div className="goldmine"></div>
        <div className="para">
          <span>
            Find your Life Changing Event. Speaking is a serious
            <br /> Business. Every Expert must get noticed to build their <br />
            empire of followers. Knowledge within you won't help
            <br /> the world at large. Your Time is the Most Expensive <br />
            Opportunity Cost.
          </span>
        </div>
      </div>
      <div className="price-container">
        {staticPrice && (
          <div>
            {staticPrice.map((e, index) => (
              <div
                className="pricebox"
                key={index}
                onClick={() => {
                  setSelectedType(e.type);
                  setSelectPrice(e.price)
                  setApplied(false)
                  setCheckCouponData('')
                  setError('')
                }}
               id= {selectedType === e.type? 'selected-price' : null}
              >
                <div className="price-details">
                  <div className="price-type">
                    <small>{e.name}</small>
                    <span>{e.desc}</span>
                  </div>
                </div>
                <div className="price">
                  <price>₹ {e.showPrice}</price>
                </div>
              </div>
            ))}
          </div>
        )}
   <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <input
          className="apply-coupon-input"
          onChange={(e) => {
            setCouponCode(e.target.value);
            setSelectPrice(() =>{
             if(selectedType === 'HalfYearly'){
              return 7000
             } else if(selectedType === 'Yearly'){
              return 9996
              } else if(selectedType === 'Quaterly'){
              return 5000
             }
            });
            setCheckCouponData('')
            setApplied(false)
          }}
        />
        <Button
        variant="contained"
        id='apply-coupon-button'
          onClick={(e) => {
            handleApplyCoupon(e);
          }}
        >
          Apply 
        </Button>
        </div>
          <div>
        
        </div>  
        {error ? (
  <div>
    <p>❌ {error.response.data.message}</p>
  </div>
) : checkCouponData  ? (
  <div>
    <p>✅ {checkCouponData.message}</p>
    <p>⏰ Final Price : <span style={{fontSize:'24px', fontWeight:"600"}}>{selectPrice}</span> </p>
  </div>
) : <h3 style={{marginTop:'0'}}>Apply Coupon Code</h3>}

        <div id="price-continue">
          <button onClick={handlePayments}>CONTINUE</button>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
