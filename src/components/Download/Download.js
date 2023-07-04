import { Button, MenuItem, Select } from '@mui/material'
import React from 'react'
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { CSVLink } from "react-csv";
import './Download.css'
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
    const [eventData, setEventData] = React.useState('');
    const [couponData, setCouponData] = React.useState('');
    const [subData, setSubData] = React.useState('');


    const couponHeaders = [
      {
        label: "Coupon_code", key: "coupon_code"
      },
      {
        label: "Discount", key: "discount"
      },
      {
        label: "Expiration_date", key: "expiration_date"
      },
      {
        label: "IsActive", key: "isActive"
      },
      {
        label: "IsAffilate", key: "isAffilate"
      },
      {
        label: "Max_usages", key: "max_usages"
      },
      {
        label: "HalfYearly", key: "subscription_type.0"
      },
      {
        label: "Yearly", key: "subscription_type.1"
      },
      {
        label: "Usage_count", key: "usage_count"
      },
      {
        label: "_V", key: "_v"
      },
      {
        label: "_Id", key: "_id"
      }
    ]
  
    const headers = [
      {
        label: "audienceSize", key: "AudienceSize"
      },
      {
        label: "audienceType", key: "AudienceType"
      },
      {
        label: "category", key: "Category"
      },
      {
        label: "city", key: "City"
      },
      {
        label: "country", key: "Country"
      },
      {
        label: "detailedDescriptionOfTheEvent", key: "DetailedDescriptionOfTheEvent"
      },
      {
        label: "engagementTerm", key: "EngagementTerm"
      },
      {
        label: "eventEndDateAndTime", key: "EventEndDateAndTime"
      },
      {
        label: "eventStartDateAndTime", key: "EventStartDateAndTime"
      },
      {
        label: "eventType", key: "EventType"
      },
      {
        label: "eventWebsiteUrl", key: "EventWebsiteUrl"
      },
      {
        label: "location", key: "Location"
      },
      {
        label: "mode", key: "Mode"
      },
      {
        label: "organizerContactNumber", key: "OrganizerContactNumber"
      },
      {
        label: "organizerEmail", key: "OrganizerEmail"
      },
      {
        label: "organizerName", key: "OrganizerName"
      },
      {
        label: "pincode", key: "Pincode"
      },
      {
        label: "shortDescriptionOfTheEvent", key: "ShortDescriptionOfTheEvent"
      },
      {
        label: "titleOfTheEvent", key: "TitleOfTheEvent"
      },
      {
        label: "CreatedAt", key: "createdAt"
      },
      {
        label: "IsApprove", key: "isApprove"
      },
      {
        label: "IsArchived", key: "isArchived"
      },
      {
        label: "IsDeleted", key: "isDeleted"
      },
      {
        label: "IsSpeakerOreExclusive", key: "isSpeakerOreExclusive"
      },
      {
        label: "ApdatedAt", key: "updatedAt"
      },
      {
        label: "_V", key: "_v"
      },
      {
        label: "_Id", key: "_id"
      },
      {
        label: "alphaUnqiueId", key: "User.alphaUnqiueId"
      },
      {
        label: "first_name", key: "User.first_name"
      },
      {
        label: "last_name", key: "User.last_name"
      },
      {
        label: "email", key: "User.email"
      }
    ]
  
    const eventLink = {
      filename: "myEvents.csv",
      headers: headers,
      data: eventData && eventData?.savedData
    }
// console.log(data)
    const couponLink = {
      filename: "coupon.csv",
      headers: couponHeaders,
      data: couponData && couponData?.savedEvents
    }

    const subscriptionLink = {
      filename: "mysubscription.csv",
      headers: headers,
      data: subData && subData?.savedEvents
    }
    

    const handleChange = (event) => {
        setSelector(event.target.value);
        getReport()
    };

    const getReport = () => {
      if(selector === 'event'){
        getEventReport()
      } else if(selector === 'coupon'){
        getCouponReport()
      } else if(selector === 'subscription'){

      }
  };

    const getEventReport = () => {
        axios({
          method: "get",
          url: `https://api.speakerore.com/api/getreportofevent?startDate=${startDate}&endDate=${endDate}`,
          withCredentials: true,
        })
          .then((res) => {
            console.log(res.data);
            setEventData(res.data)
            toast.success(res.data.message, successToast);
          })
          .catch((err) => {
            console.log(err);
            setEventData('')
            toast.error(err.response.data.message, successToast);
          });
      };

      const getCouponReport = () => {
        axios({
          method: "get",
          url: `https://api.speakerore.com/api/getreportofcoupon?startDate=${startDate}&endDate=${endDate}`,
          withCredentials: true,
        })
          .then((res) => {
            console.log(res.data);
            setCouponData(res.data)
            toast.success(res.data.message, successToast);
          })
          .catch((err) => {
            console.log(err);
            setCouponData('')
            toast.error(err.response.data.message, successToast);
          });
      };

  
  return (
    <div className='download-component'>
    <ToastContainer/>
      <input type='date' onChange={(e)=>{
        setStartDate(e.target.value)
        getReport()
      }}/>
      <input type='date' onChange={(e)=>{
        setEndDate(e.target.value)
        getReport()
      }}/>
      <select onChange={handleChange}>
        <option selected >Select</option>
        <option value= 'event'>Event Report</option>
        <option value= 'coupon'>Coupon Report</option>
        <option value= 'subscription'>Subscription Report</option>
      </select>
      <Button variant="contained">
      {selector === 'event'? 
        (<CSVLink {...eventLink}>Download</CSVLink>) :
        selector === 'coupon' ? (<CSVLink {...couponLink}>Download</CSVLink>) :  
        selector === 'subscription' ? (<CSVLink {...couponLink}>Download</CSVLink>) : 'Download'}
       </Button>
    </div>
  )
}

export default Download
