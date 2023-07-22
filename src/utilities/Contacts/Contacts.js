import React from "react";
import "./Contact.css";
import mic from "../../images/FINAL_07_1.png";
import { Button, Typography } from "@mui/material";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
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
const Contacts = () => {
  const [name, setName] = useState("");
  const [email, setEMail] = useState("");
  const [message, setMessage] = useState("");

  const handlesubmit = (e) => {
    console.log("running");
    e.preventDefault();
    axios({
      method: "post",
      url: "https://api.speakerore.com/api/submitcontactform",
      data: {
        name,
        email,
        message,
      },
    })
      .then((res) => {
        console.log(res);
        setName("");
        setMessage("");
        setEMail("");
        toast.success(res.data.Message, successToast);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message, successToast);
      });
  };
  return (
    <div className="contact-speaker">
      <ToastContainer />
      <div
        className="Subscription_container_fluid_left"
        style={{ marginTop: "20px" }}
      >
        {/* 50% */}
        <div className="Subscription_container_fluid_left_img">
          {/* 100% */}
          <img alt="img" id="bee" src={mic} />
        </div>
        <div className="Subscription_container_fluid_left_headingNp_tag_div">
          {/* 100% */}
          <h1>Speaker Ore</h1>
          <h2>Contact Us</h2>
          <div className="contact-para">
            <p>
              Have a question, suggestion, or need assistance? We're here to
              help! Please fill out the form below, and our dedicated support
              team will get back to you within 2-4 working days.
            </p>
            <p>The form includes the following fields:</p>
            <p>
              Name: Please enter your full name. Email: Provide us with your
              email address so we can respond to your inquiry. Message: Write
              your message or query in this section. Once you've completed the
              form, click the "Send" button, and your message will be sent
              directly to our support team via email. We value your feedback and
              strive to provide the best possible assistance.
            </p>
            <p>
              Please note that our team works diligently to respond to all
              queries promptly. However, due to high volumes of inquiries, it
              may take us 2-4 working days to address your request. We
              appreciate your patience during this time.
            </p>
            <p>
              Thank you for choosing Speakerore.com. We look forward to
              assisting you!
            </p>
          </div>
        </div>
      </div>

      <div className="contactContainer">
        <form className="contactContainerForm" onSubmit={handlesubmit}>
          <Typography variant="h4">Contact Us</Typography>

          <input
            className="contactInput"
            type="text"
            placeholder="Name"
            name="Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
            required
          />
          <input
            className="contactInput"
            type="email"
            placeholder="Email"
            name="Email"
            required
            value={email}
            onChange={(e) => {
              setEMail(e.target.value);
            }}
          />

          <textarea
            className="contactInput"
            name="Message"
            rows="10"
            placeholder="Message"
            required
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          ></textarea>
          <Button className="contactButton" type="submit">
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Contacts;
