import axios from 'axios';
import React, { useState } from 'react'
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
const FacebookNoEmail = ({setLoading}) => {

    const [emailInput, setEmailInput] = useState('')
       const handleSubmit = () => axios({
          method: "patch",
          url: "https://api.speakerore.com/api/updateemail",
          data: {email:emailInput},
          withCredentials: true,
        })
          .then((res) => {
              setLoading('changed');
              toast.success(res.data.message, successToast);
          })
          .catch((err) => {
            console.log(err.response);
            // toast.error(err.response.data.message, successToast);
          });

  return (
    <div>
    <ToastContainer/>
      <div className="form-popup">
          <div className="form-container">
            <h1>Enter your email</h1>
            <label htmlFor="email"><>Your facebook account has no email linked please provide an email id</></label>
            <input type="text" placeholder="example@mail.com" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} required />
            {/* <p className="error-message">error</p> */}
            <button className="btn" onClick={handleSubmit}>Submit</button>
            {/* <button className="btn cancel" onClick={closeEmailPopup}>Close</button> */}
          </div>
        </div>
    </div>
  )
}

export default FacebookNoEmail
