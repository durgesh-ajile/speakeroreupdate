import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { MdLocationOn } from "react-icons/md";
import { MdWatchLater } from "react-icons/md";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useState } from 'react';
import exclusiveimg from "../../images/Group.png";

const Trash = () => {
    const [trashData, setTrashData] = useState("");
    const [page, setPage] = React.useState(1);

    const handleChange = (event, value) => {
      setPage(value);
    };

    useEffect(() => {
        axios({
          method: "get",
          url: "https://sobacke.in/api/getalltrashevents",
          withCredentials: true,
        })
          .then((res) => {
            setTrashData(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);

      function convertDate(e) {
        const date = new Date(e).toLocaleString();
        return date;
      }
      console.log(trashData)

  return (
    <div>
      <div className="allevent" style={{ flexWrap: "wrap" }}>
        <div>
          {trashData ? (
            <div>
              <div className="card-container">
                {trashData.deletedEvents.map((e) => (
                  <div className="card">
                  <div className="card-1">
                      <div>
                        <small
                          style={{
                            margin: "20px  0 0 2rem",
                            fontSize: "1rem",
                            fontWeight: "500",
                            color: "#24754F",
                          }}
                        >
                          {e.Category}{" "}
                        </small>
                        <bold>{e.OrganizerName}</bold>
                        <span>{e.City}</span>
                      </div>
                      <div>
                        {e.isSpeakerOreExclusive ? (
                          <img src={exclusiveimg} />
                        ) : null}
                      </div>
                    </div>
                    <div className="card-2">
                      <small>
                        <MdLocationOn color="grey" size={20} />
                        <h>{e.Mode}</h>
                      </small>
                      <br />
                      <date>
                        {" "}
                        <MdWatchLater size={20} color="grey" />
                        <q>{convertDate(e.EventEndDateAndTime)}</q>
                      </date>
                      <p></p>
                    </div>
                    <div className="desc">
                    <p>{e.ShortDescriptionOfTheEvent}</p>
                    </div>
                    <div className="card-4">
                      <button onClick={()=>{
                        // handleEventDelete(e._id)
                      }}>Delete permanently</button>
                      <button
                        style={{
                          color: "#24754F",
                          border: "#24754F 1px solid",
                        }}
                        onClick={()=>{
                        //   handleApproveEvent(e._id)
                      }}
                      >
                        Move To
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <Stack spacing={2}>
                <Pagination
                  style={{ justifyContent: "center", marginTop: "20px" }}
                  count={trashData.totalPages}
                  page={page}
                  onChange={handleChange}
                />
                <Typography>Page: {page}</Typography>
              </Stack>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  )
}

export default Trash
