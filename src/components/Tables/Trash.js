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
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const Trash = () => {
    const [trashData, setTrashData] = useState("");
    const [page, setPage] = React.useState(1);
    const [loading, setLoading] = useState(false);
    const [deleteId, setDeleteId] = useState('');
    const [reviveId, setReviveId] = useState('');


    const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const [open2, setOpen2] = React.useState(false);

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };


    const handleChange = (event, value) => {
      setPage(value);
    };

    useEffect(() => {
        axios({
          method: "get",
          url: "https://api.speakerore.com/api/getalltrashevents",
          withCredentials: true,
        })
          .then((res) => {
            setTrashData(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);

      useEffect(() => {
        axios({
          method: "get",
          url: "https://api.speakerore.com/api/getalltrashevents",
          withCredentials: true,
        })
          .then((res) => {
            setTrashData(res.data);
          })
          .catch((err) => {
            console.log(err);
            if(err.response.status === 404){
              setTrashData('')
            }
          });
      }, [loading]);

      const handlePermanentDelete = () =>{
        axios({
          method: "delete",
          url: `https://api.speakerore.com/api/deleteevent?eventId=${deleteId}`,
          withCredentials: true,
        })
          .then((res) => {
            console.log(res.data);
            setLoading(!loading)
          })
          .catch((err) => {
            console.log(err);
          })
        }

        const handleReviveCard = () =>{
          axios({
            method: "patch",
            url: "https://api.speakerore.com/api/revivefortrash",
            withCredentials: true,
            data: {
              eventId: reviveId,
            },
          })
            .then((res) => {
              console.log(res.data);
              setLoading(!loading)
            })
            .catch((err) => {
              console.log(err);
            });
          }

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
                        handleClickOpen();
                        setDeleteId(e._id)
                      }}>Delete permanently</button>
                      <button
                        style={{
                          color: "#24754F",
                          border: "#24754F 1px solid",
                        }}
                        onClick={()=>{
                          handleClickOpen2();
                          setReviveId(e._id)
                      }}
                      >
                        Revive Event
                      </button>
                      <Dialog
                        fullScreen={fullScreen}
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="responsive-dialog-title"
                      >
                        <DialogTitle id="responsive-dialog-title">
                          {"Do you want to delete this event permanently"}
                        </DialogTitle>
      
                        <DialogActions>
                          <Button
                            onClick={() => {
                              handleClose();
                            }}
                            autoFocus
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={() => {
                              handleClose();
                              handlePermanentDelete();
                              
                            }}
                            autoFocus
                          >
                            Delete Event Permanently
                          </Button>
                        </DialogActions>
                      </Dialog>
                      <Dialog
                        fullScreen={fullScreen}
                        open={open2}
                        onClose={handleClose2}
                        aria-labelledby="responsive-dialog-title"
                      >
                        <DialogTitle id="responsive-dialog-title">
                          {"Revive this event"}
                        </DialogTitle>
      
                        <DialogActions>
                          <Button
                            onClick={() => {
                              handleClose2();
                            }}
                            autoFocus
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={() => {
                              handleClose2();
                              handleReviveCard();
                            }}
                            autoFocus
                          >
                            Revive Event
                          </Button>
                        </DialogActions>
                      </Dialog>
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
