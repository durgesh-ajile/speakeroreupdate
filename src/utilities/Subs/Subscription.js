

import React, { useEffect, useState } from "react";
import "./subcription.css";
import mic from "../../images/FINAL_07_1.png";
// import pinkback from "../../images/Vector 9.png";
// import orangeback from "../../images/Vector 10.png";
import axios from "axios";
import { Button } from "@mui/material";
import LoginPopup from "../Pop/LoginPopup";
import CryptoJS from "crypto-js";

const priceData = [
  // if changing the price of the subscription you need to change it in input field also with classname apply-coupon-input in this file only
 
  {
    type: "Quaterly",
    name: "Monthly",
    price: 5000,
    showPrice: 1667,
    desc: "Paid on Quarterly basis",
  },
  {
    type: "HalfYearly",
    name: "Monthly",
    price: 7000,
    showPrice: 1167,
    desc: "Paid on Half Yearly basis",
  },
  {
    type: "Yearly",
    name: "Monthly",
    price: 9996,
    showPrice: 833,
    desc: "Paid on Yearly basis",
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
    const milliseconds = currentDate.getMilliseconds().toString().padStart(3, "0");
    // Concatenate the parts to create a unique orderId
    const orderId = `${hours}${minutes}${seconds}${milliseconds}`;
    return orderId;
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

  const secretKey = process.env.REACT_APP_PAYMENT_SECRET;
  console.log(secretKey)
const encryptObject = (object, secretKey) => {
const jsonString = JSON.stringify(object);
const encrypted = CryptoJS.AES.encrypt(jsonString, secretKey).toString();
const encryptedBase64 = CryptoJS.enc.Base64.stringify(
CryptoJS.enc.Utf8.parse(encrypted)
);
return encryptedBase64;
};

  const handlePayments = async (e) => {
    e.preventDefault();
    try {
      const paymentObject = {
        merchant_id: 2560771,
        order_id: generateOrderId(),
        currency: "INR",
        amount: selectPrice,
        merchant_param1: selectedType,
        merchant_param2: couponCode || "No_Coupon_Code",
      };

      const encryptPaymentData = encryptObject(paymentObject, secretKey);

      if (selectedType && selectedPriceData && userData) {
        window.location.href = `https://api.speakerore.com/api/paymentform?encrypt=${encryptPaymentData}`;
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
            <h2>Tap into the Gold Mine of Success</h2>
            <div className="sub-hidescrol">
              <p>Welcome to SpeakerOre, the ultimate platform designed to empower speakers and connect them with a multitude of speaking opportunities. Whether you're a seasoned speaker looking to expand your reach or a budding talent eager to make your mark, our subscription unlocks a world of possibilities.
             <br/> <br/> Choose from our flexible subscription plans – quarterly, half-yearly, or yearly – tailored to fit your needs. With SpeakerOre, you'll gain access to over 200,000 speaking opportunities across various categories, ranging from conferences and webinars to panel discussions and workshops. The power to elevate your speaking career is just a subscription away.
             <br/><br/>  Our platform connects you directly with event organizers, eliminating the need for intermediaries or agents. You'll have the freedom to engage in seamless communication, negotiate terms, and secure speaking engagements that align perfectly with your expertise and goals. Say goodbye to lengthy searches and hello to direct connections that open doors to success.
             <br/><br/>  As a subscriber, you'll gain access to exclusive events that can significantly impact your career. Some of these events are not listed anywhere else, providing you with a competitive edge and unique speaking opportunities that can help you stand out in the crowd. Your subscription ensures you don't miss out on these exclusive chances to shine.
             <br/><br/>  Subscribing to SpeakerOre is an investment in your speaking journey. With our platform, you'll save valuable time and effort that would have otherwise been spent on extensive research and networking. Focus on what you do best – captivating audiences, sharing your expertise, and making a lasting impact – while we handle the logistics of finding the right speaking gigs for you.
             <br/><br/>  Choose from our quarterly, half-yearly, or yearly subscription plans, tailored to suit your needs. And now, with our no-cost EMI options, you can enjoy the benefits of SpeakerOre while managing your payments in convenient monthly installments without any additional interest. </p>
            <p>Subscribe now and let your voice be heard!</p>
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
                    <h4>₹{value.showPrice} / ${convertRupeesToDollars(value.showPrice, 82.2).toFixed(2)}</h4>
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
            <div className="emi-box">
                <div className="emi">EMI</div>
                <p>No cost EMI available*</p>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Subscription;
