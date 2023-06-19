import React, { useEffect, useState } from "react";
import "./subcription.css";
import mic from "../../images/FINAL-07 1.png";
import pinkback from "../../images/Vector 9.png";
import orangeback from "../../images/Vector 10.png";
import axios from "axios";
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

const pricedata = [
  {
    type: "HalfYearly",
    price: 7000,
    desc: "Find your Life Changing Event. ",
  },
  {
    type: "Quaterly",
    price: 5000,
    desc: "Find your Life Changing Event. ",
  },
  {
    type: "Yearly",
    price: 9996,
    desc: "Paid on annual basis.  ",
  },
];

const Subscription = () => {
  const [selectedType, setSelectedType] = useState("");
  const [selectPrice, setSelectPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const selectedPriceData = pricedata.find(
    (item) => item.type === selectedType
  );

  useEffect(() => {
    if (selectedPriceData) {
      setSelectPrice(selectedPriceData.price);
    }
  }, [selectedPriceData]);

  const handleChange = (e) => {
    setSelectedType(e.target.value);
  };

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    try {
      if (couponCode && selectedType && selectPrice) {
        const checkCoupon = await axios({
          method: "get",
          url: `http://localhost:5000/api/applycouponcode?couponCode=${couponCode}&amount=${selectPrice}&subcriptionType=${selectedType}`,
          withCredentials: true,
        });
        console.log(checkCoupon)
      }
    } catch (error) {
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
        const response = await axios({
          method: "POST",
          url: "https://sobacke.in/api/ccavRequestHandler",
          data: {
            merchant_id: "2560771",
            order_id: generateOrderId(),
            currency: "INR",
            amount: selectPrice,
            redirect_url: "https://sobacke.in/api/ccavResponseHandler",
            cancel_url: "https://sobacke.in/api/ccavResponseHandler",
            language: "EN",
            merchant_param1: selectedType,
            merchant_param2: couponCode || "No Coupon Code",
          },
          withCredentials: true,
        });

        // const order = response.data;
        // console.log(order);
        // let couponCodeExist = order.order.notes.couponCode || "No Coupon Code";
        // let subcriptionType = order.order.notes.subcriptionType;

        // const options = {
        //   key: "rzp_live_bzuVO7uY2e0AZp",
        //   amount: order.order.amount,
        //   currency: "INR",
        //   name: "",
        //   email: "",
        //   contact: "",
        //   description: "This is testing",
        //   image:
        //     "https://pbs.twimg.com/profile_images/1528248719585734657/roEyxCoi_400x400.jpg",
        //   order_id: order.order.id,
        //   callback_url: `http://localhost:5000/api/payment/verify?subscriptionType=${subcriptionType}&couponCode=${couponCodeExist}`,
        //   prefill: {},
        //   notes: {
        //     address: "Razorpay Corporate Office",
        //   },
        //   theme: {
        //     color: "#121212",
        //   },
        // };
        
        // const razor = new window.Razorpay(options);
        // razor.open();
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(selectedType)

  return (
    <div className="subscribe-conatiner">
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
            <br /> Business .Every Expert must get noticed to build their <br />
            empire of followers. Knowledge within you wont help
            <br /> the world at large. Your Time is the Most Expensive <br />
            Opportunity Cost.
          </span>
        </div>
      </div>
      <div className="price-container">
        {pricedata.map((e, index) => (
          <div className="pricebox" key={index} onClick={() => {
                setSelectedType(e.type)
              }}>
            <div className="price-details">
              <div className="input" >
                <input
                  type="radio"
                  name="subscriptionType"
                  value={e.type}
                  checked={selectedType === e.type}
                  // onChange={(e) => {
                  //   handleChange(e);
                  // }}
                />
              </div>
              <div className="price-type">
                {e.type === "Yearly" ? (
                  <small>Monthly</small>
                ) : (
                  <small>{e.type}</small>
                )}
                <span>{e.desc}</span>
              </div>
            </div>
            <div className="price">
              {e.type === "Yearly" ? (
                <price>₹ 833</price>
              ) : (
                <price>₹ {e.price}</price>
              )}
            </div>
          </div>
        ))}
        <input
          onChange={(e) => {
            setCouponCode(e.target.value);
          }}
        />
        <button
          onClick={(e) => {
            handleApplyCoupon(e);
          }}
        >
          Check
        </button>
        <div className="price-continue">
          <button onClick={handlePayments}>CONTINUE</button>
        </div>
      </div>
    </div>
  );
};

export default Subscription;