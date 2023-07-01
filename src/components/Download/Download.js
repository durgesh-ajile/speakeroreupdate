import { Button, MenuItem, Select } from '@mui/material'
import React from 'react'
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

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
  
const Download = () => {
    const [selector, setSelector] = React.useState('');
    const [startDate, setStartDate] = React.useState('');
    const [endDate, setEndDate] = React.useState('');


    const handleChange = (event) => {
        setSelector(event.target.value);
    };  
    const downloadEventReport = () => {
        axios({
          method: "get",
          url: `https://api.speakerore.com/api/getreportofevent?startDate=${startDate}&endDate=${endDate}`,
          withCredentials: true,
        })
          .then((res) => {
            console.log(res.data);
            toast.success(res.data.message, successToast);
          })
          .catch((err) => {
            console.log(err);
            toast.error(err.response.data.message, successToast);
          });
      };

      const handleDownload = () =>{
        if(selector === 'event'){
            downloadEventReport()
        }
      }
  return (
    <div className='download-component'>
    <ToastContainer/>
      <input type='date' onChange={(e)=>{
        setStartDate(e.target.value)
      }}/>
      <input type='date' onChange={(e)=>{
        setEndDate(e.target.value)
      }}/>
      <select onChange={handleChange}>
        <option selected >Select</option>
        <option value= 'event'>Event Report</option>
        <option value= 'coupon'>Coupon Report</option>
        <option value= 'subscription'>Subscription Report</option>
      </select>
      <Button variant="contained" onClick={handleDownload}>Download</Button>
    </div>
  )
}

export default Download
