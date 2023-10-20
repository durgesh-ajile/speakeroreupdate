import React from 'react'
import { Button } from "@mui/material";
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import man from "../images/Group 11450.png";

const Affiliate = () => {
    const [affiliatData, setAffiliatData] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios({
          method: "get",
          url: "https://api.speakerore.com/api/getaffilatecoupon",
          withCredentials: true,
        })
          .then((res) => {
            setAffiliatData(res.data.affilateCoupon);
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
            setAffiliatData(404)
          });
      }, [loading]);

      const handleAffiliateSubmit = () => {
        axios({
          method: "post",
          url: "https://api.speakerore.com/api/createaffilatecoupon",
          withCredentials: true,
        })
          .then((res) => {
            if (res.data.status) {
              setLoading(!loading);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      };

  return (
    <>
              {affiliatData?.discount ? (
                <>
                  <div className="aff-form">
                    <h2>
                      Coupon Code:{" "}
                      <span style={{ color: "#24754F" }}>
                        "{affiliatData.coupon_code}"
                      </span>
                    </h2>
                    <h3>
                      Discount:{" "}
                      <span style={{ color: "#24754F" }}>
                        {affiliatData.discount}%
                      </span>
                    </h3>
                  </div>
                </>
              ) : affiliatData === 404 ? (
                <div className="aff-main">
                  <div className="head-banner">
                    <div className="banner-container">
                      <div className="banner-text" id="new-banner">
                        <h5>Welcome to the Speakerore Affiliate Program!</h5>
                      </div>
                      <div className="banner-img" id="new-banner-img">
                        <img  src={man} />
                      </div>
                    </div>
                  </div>
                  <div className="affiliate">
                    <p>
                      Join our affiliate program and start earning generous
                      commissions by referring new subscribers to Speakerore. As
                      an affiliate, you'll have the opportunity to create unique
                      discount coupons that provide a 10% discount on
                      subscription costs to new users. Plus, you'll receive a
                      commission based on the pretax value of the amount paid by
                      the new subscriber.
                    </p>
                    <h3>Affiliate Benefits:</h3>
                    <p>
                      Subscribers using your unique coupon code receive a 10%
                      discount on their subscription cost, making it an enticing
                      offer for potential customers. As an affiliate, you earn a
                      10% commission on the pretax value of the amount paid by
                      new subscribers if you are a subscriber yourself.
                      Non-subscribed affiliates earn a 5% commission. The
                      commission is calculated on a monthly basis and credited
                      to your account in the following month, ensuring a
                      consistent stream of earnings. Once you've referred at
                      least three new subscribers using your unique coupon code,
                      your commission will start getting credited. Additionally,
                      you'll receive commissions for those initial three
                      subscribers as well. You earn commissions regardless of
                      the subscription plan chosen by the new subscriber,
                      including no-cost EMI options.
                    </p>
                    <h3>How it Works:</h3>
                    <p>
                      Sign up on Speakerore.com like any other user. Simply
                      create an account and gain access to all the features and
                      benefits we offer. Once signed in, navigate to your
                      profile section, where you'll find the "Affiliate" tab. In
                      the "Affiliate" tab, you can generate your unique discount
                      code, which will act as both a discount coupon for
                      potential subscribers and an affiliate tracker for you.
                      Share your unique discount code with your audience,
                      friends, and colleagues through your website, social media
                      platforms, email campaigns, or any other promotional
                      channel you prefer. When someone uses your discount code
                      during the subscription process on Speakerore.com, they
                      will receive a 10% discount on their subscription cost,
                      courtesy of your affiliation. As the affiliate, you will
                      earn a 10% commission on the pre-tax value of the amount
                      paid by the new subscriber if you are a subscriber
                      yourself. Non-subscribed affiliates earn a 5% commission.
                      The commission calculation is performed on a monthly
                      basis, and your earnings will be credited to your account
                      in the following month. It's important to note that the
                      commission payment will begin once you have successfully
                      referred at least three new subscribers using your unique
                      discount code. You will also receive commissions for those
                      initial three subscribers. Your affiliate commission will
                      be provided regardless of the subscription plan chosen by
                      the new subscriber, including if they opt for no-cost EMI
                      options. Start earning commissions and sharing the
                      benefits of Speakerore.com with your network! If you have
                      any questions or require assistance, please don't hesitate
                      to reach out to our dedicated affiliate support team.
                    </p>

                    <h5>
                      Note: Please ensure you review and understand the terms
                      and conditions of our affiliate program, which are
                      available on our website.
                    </h5>
                    <div className="aff-btn">
                      <Button
                        variant="contained"
                        color="success"
                        onClick={handleAffiliateSubmit}
                      >
                        Get Coupon
                      </Button>
                    </div>
                  </div>
                </div>
              ) : <></>}
            </>
  )
}

export default Affiliate