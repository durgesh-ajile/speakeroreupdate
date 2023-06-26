import React, { useEffect, useState, useRef } from "react";
import { TagsInput } from "react-tag-input-component";

const Organizerdetails = ({ organizerDetails, setStateHandle_Event_Organiser_Preview }) => {

  const [handleOrganizerDetails, setHandleOrganizerDetails] = useState([])
  const [checkReqierdField, setcheckReqierdField] = useState(false)
  const [tags, setTags] = useState([]);
  const inputRefsOrganizerdetails = useRef([]);
  const [isValid, setIsValid] = useState(!false);

  const onSubmit = (e) => {
    e.preventDefault();
    setcheckReqierdField(true)
    if ((handleOrganizerDetails?.organizerName &&
      handleOrganizerDetails?.organizerEmail &&
      isValid &&
      handleOrganizerDetails?.organizerContactNumber?.length === 0) ||
      (handleOrganizerDetails?.organizerName &&
        handleOrganizerDetails?.organizerEmail &&
        isValid &&
        handleOrganizerDetails?.organizerContactNumber?.length > 9)) {
      setStateHandle_Event_Organiser_Preview(p => {
        p.organise = false
        p.preview = true
        return { ...p }
      })
    }
  };

  organizerDetails(handleOrganizerDetails, tags);

  const handleChangeOrganizerDetailsForm = (e) => {
    let tempprev = {}
    if (e.target.name === 'organizerContactNumber') {
      setHandleOrganizerDetails(prev => {
        let numberString
        if (typeof prev.organizerContactNumber === 'string') {
          numberString = prev.organizerContactNumber.length
        }
        prev[e.target.name] = e.target.value
        tempprev = prev
        if (numberString >= 10) {
          prev.organizerContactNumber = prev.organizerContactNumber.slice(0, 10)
        }
        return { ...prev }
      });
    } else if (e.target.name === 'organizerEmail') {
      setHandleOrganizerDetails(prev => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidEmail = emailPattern.test(e.target.value);
        setIsValid(isValidEmail);
        prev[e.target.name] = e.target.value
        tempprev = prev
        // localStorage.setItem('handleOrganizerDetails', JSON.stringify(tempprev))
        return { ...prev }
      });
    }
    else {
      setHandleOrganizerDetails(prev => {
        prev[e.target.name] = e.target.value
        tempprev = prev
        return { ...prev }
      })
    }
    localStorage.setItem('handleOrganizerDetails', JSON.stringify(tempprev))
  }

  // const

  const previous_Button = () => {
    setStateHandle_Event_Organiser_Preview(p => { p.event = !false; p.organise = !true; return { ...p } });
  }

  const handleKeyDown = (event, index) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const nextIndex = index + 1;
      if (nextIndex < inputRefsOrganizerdetails.current.length) {
        inputRefsOrganizerdetails.current[nextIndex].focus();
      }
    }
  };

  const registerRef = (ref, index) => {
    inputRefsOrganizerdetails.current[index] = ref;
  };

  useEffect(() => {
    let handleOrganizerDetailsLocal = null
    inputRefsOrganizerdetails.current[0].focus();

    try {
      handleOrganizerDetailsLocal = JSON.parse(localStorage.getItem('handleOrganizerDetails'))
    } catch (error) {
      console.error('Error parsing JSON:', error);
      alert(error)
    }
    if (handleOrganizerDetailsLocal !== null) {
      setHandleOrganizerDetails(() => handleOrganizerDetailsLocal)
    }
  }, [])

  // console.log('handleOrganizerDetails?.organizerContactNumber', handleOrganizerDetails?.organizerContactNumber?.length)

  return (
    <div className="Organizerdetails">
      <form>
        <div className="input-details">
          <label>Organizer Name</label>
          <input ref={(ref) => registerRef(ref, 0)} onKeyDown={(event) => handleKeyDown(event, 0)}
            onChange={(e) => { handleChangeOrganizerDetailsForm(e) }}
            name="organizerName"
            type="text"
            value={handleOrganizerDetails?.organizerName}

            placeholder="Enter the Organizer Name"
          />
          {
            checkReqierdField &&
            !handleOrganizerDetails?.organizerName && <p style={{ color: 'red', fontSize: '13px' }}> Above field is required </p>
          }
        </div>

        <div className="double">
          <div className="input-details">
            <label>Organizer Email</label>
            <input ref={(ref) => registerRef(ref, 1)} onKeyDown={(event) => handleKeyDown(event, 1)}
              onChange={(e) => { handleChangeOrganizerDetailsForm(e) }}
              // onBlur={()=>handleValidateEmail()}
              name="organizerEmail"
              type="email"
              placeholder="Enter the Organizer Name"
              required
              value={handleOrganizerDetails?.organizerEmail}
            />
            {
              checkReqierdField &&
              !handleOrganizerDetails?.organizerEmail && <p style={{ color: 'red', fontSize: '13px' }}> Above field is required </p>
            }
            {checkReqierdField &&
              handleOrganizerDetails?.organizerEmail && !isValid && <p style={{ color: 'red', fontSize: '13px' }}> Invalid Email ID </p>}
          </div>

          <div className="input-details">
            <label>Organizer Contact Number</label>
            <input ref={(ref) => registerRef(ref, 2)} onKeyDown={(event) => handleKeyDown(event, 2)}
              onChange={(e) => { handleChangeOrganizerDetailsForm(e) }}
              type="number"
              name="organizerContactNumber"
              placeholder="Enter the Number Here..."
              disabled={!true}
              required
              maxLength={10}
              value={handleOrganizerDetails?.organizerContactNumber}
            />
            {
              checkReqierdField &&
              handleOrganizerDetails?.organizerContactNumber?.length >= 1 && handleOrganizerDetails?.organizerContactNumber?.length <= 9 && <p style={{ color: 'red', fontSize: '13px' }}> Phone number should be of 10 digits </p>
            }
          </div>
        </div>

        <div className="input-details">
          <label>Tags</label>
          <span>
            Improve discoverability of your event by adding relevent to subject
            matter.
          </span>
          <TagsInput
            value={tags}
            onChange={setTags}
            name="tag"
            placeHolder="Press Enter To Add a Field"
          />
        </div>

        <div className="card_3next_button">
          <button ref={(ref) => registerRef(ref, 3)} onKeyDown={(event) => handleKeyDown(event, 3)} type="submit" onClick={(e) => onSubmit(e)} >Next</button>
          <button type="button" onClick={(e) => previous_Button(e)} style={{ marginRight: '10px' }}>Previous</button>
        </div>
      </form>
    </div>
  );
};

export default Organizerdetails;
