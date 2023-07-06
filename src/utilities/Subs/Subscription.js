

import React, { useEffect, useState } from "react";
import "./subcription.css";
import mic from "../../images/FINAL_07_1.png";
// import pinkback from "../../images/Vector 9.png";
// import orangeback from "../../images/Vector 10.png";
import axios from "axios";
import { Button } from "@mui/material";
import LoginPopup from "../Pop/LoginPopup";


const priceData = [
  // if changing the price of the subscription you need to change it in input field also with classname apply-coupon-input in this file only
 
  {
    type: "Quaterly",
    name: "Quaterly",
    price: 5000,
    showPrice: 5000,
    desc: "Find your Life Changing Event.",
  },
  {
    type: "HalfYearly",
    name: "Half Yearly",
    price: 7000,
    showPrice: 7000,
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
  const [inputRefs, setInputRefs] = useState([]);
  const [userData, setUserData] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

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
    if(!selectedType){
      setError("Select a subscription plan")
    }
    
  };
  
  const generateOrderId = () => {
    const currentDate = new Date();
    const hours = currentDate.getHours().toString().padStart(2, "0");
    const minutes = currentDate.getMinutes().toString().padStart(2, "0");
    const seconds = currentDate.getSeconds().toString().padStart(2, "0");
    return `${hours}${minutes}${seconds}`;
  };

  useEffect(() => {
      axios({
        method: "get",
        url: "https://api.speakerore.com/api/getprofile",
        withCredentials: true,
      })
        .then((res) => {
          if (res.data.status) {
            setUserData(true);
          }
        })
        .catch((err) => {
          console.log(err);
          setUserData(false);
        });
  }, []);

  const handlePayments = async (e) => {
    e.preventDefault();
    try {
      if (selectedType && selectedPriceData && userData) {
        window.location.href = `https://api.speakerore.com/api/paymentform?merchant_id=2560771&order_id=${generateOrderId()}&currency=INR&amount=${selectPrice}&merchant_param1=${selectedType}&merchant_param2=${couponCode}`
      }
    } catch (error) {
      console.log(error);
    }
    if(!selectedType){
      setError("Select a subscription plan")
    }
    if(!userData){
      setShowPopup(true)
    }
  };

  const handleClickSubscribtion = (value, index) => {
    if (inputRefs[index] && inputRefs[index].current) {
      inputRefs[index].current.click();
    }
    setSelectedType(value.type);
    setSelectPrice(value.price)
    setApplied(false)
    setCheckCouponData('')
    setError('')
  };

  const convertRupeesToDollars = (amountInRupees, exchangeRate) => {
    // const exchangeRate = exchangeRatesState?.rates?.INR - exchangeRatesState?.rates?.USD
    const amountInDollars = amountInRupees / exchangeRate;
    return amountInDollars;
  }
  console.log(userData)
  console.log(showPopup);

  const handleClosePopup = () => {
    setShowPopup(false);
  };


  return (
    <div className="Subscription_container">{/* 100% */}
      {showPopup && <LoginPopup onClose={handleClosePopup} />}

      <div className="Subscription_container_fluid">{/* 90% */}
        <div className="Subscription_container_fluid_left">{/* 50% */}
          <div className="Subscription_container_fluid_left_img">{/* 100% */}
            <img alt="img" id="bee" src={mic} />
          </div>
          <div className="Subscription_container_fluid_left_headingNp_tag_div">{/* 100% */}
            <h1>Speaker Ore</h1>
            <h2>Goldmine Control Room</h2>
            <p>Take Action, Ownership and Start Mining</p>
            <div>
              <p>Find your Life Changing Event. Speaking is a serious Business.</p>
              <p>Every Expert must get noticed to build their empire of followers.</p>
              <p> Knowledge within you wont help the world at large. </p>
              <p>Your Time is the Most Expensive Opportunity Cost.</p>
            </div>
          </div>
        </div>
        <div className="Subscription_container_fluid_right">{/* 50% */}
          <div className="Subscription_container_fluid_right_div_wrapper">{/* wrapper of the div */}
            {staticPrice.map((value, index) => {
              const inputRef = React.createRef();
              inputRefs[index] = inputRef;
              return (
                <div key={index}
                  onClick={() => { handleClickSubscribtion(value, index) }}
                  id={selectedType === value.type ? 'selected-price' : null}
                  className="Subscription_container_fluid_right_div">
                  <input ref={inputRefs[index]}type="radio" name="amount"  style={{visibility:'hidden'}} />
                  <div className="Subscription_container_fluid_right_div_HNP">
                    <h3>{value.name}</h3>
                    <p>{value.desc}</p>
                  </div>
                  <div style={{display:'flex'}} >
                    <h4>₹{value.showPrice},</h4>
                    <h4>( ${convertRupeesToDollars(value.showPrice, 82.09).toFixed(2)} )</h4>
                  </div>
                </div>
              )
            })}

            <div className="Subscription_container_fluid_right_div_input_n_button">
              <input
                onChange={(e) => {
                  setCouponCode(e.target.value);
                  setSelectPrice(() => {
                    if (selectedType === 'HalfYearly') {
                      return 7000
                    } else if (selectedType === 'Yearly') {
                      return 9996
                    } else if (selectedType === 'Quaterly') {
                      return 5000
                    }
                  });
                  setCheckCouponData('')
                  setApplied(false)
                }}
                type="text" placeholder="Type Coupon Code Here" name="Apply_Coupon_Code" />
              <button onClick={handleApplyCoupon}>APPLY</button>

              {error === 'Select a subscription plan' ? (
                <div>
                  <p>❌ {error}</p>
                </div>
              ) : error ?
              (
                <div>
                  <p>❌ {error.response.data.message}</p>
                </div>
              ) : checkCouponData ? (
                <div>
                  <p>✅ {checkCouponData.message}</p>
                  <p>⏰ Final Price : <span style={{ fontSize: '24px', fontWeight: "600" }}>{selectPrice}</span> </p>
                </div>
              ) : <h3 style={{ marginTop: '15px', textAlign: 'center', fontSize: '15px' }}></h3>}
            </div>
            <button onClick={handlePayments}>CONTINUE</button>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Subscription;
