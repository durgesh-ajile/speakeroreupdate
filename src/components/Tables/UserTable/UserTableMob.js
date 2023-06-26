// import UsersCard from "./UsersCard";
import * as React from "react";
import { styled } from "@mui/material/styles";
import './UsersCard.css'
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { ToastContainer, toast } from "react-toastify";
import { Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
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
const UsersWrapper = () => {
  const [userData, setUserData] = useState("");
  const [loading, setLoading] = useState(false);
  const [block, setBlock] = useState("");
  const [makeMemberId, setMakeMemberId] = useState("");
  const [page, setPage] = React.useState(1);
  const [searchKey, setSearchKey] = React.useState('');
  const [filter, setFilter] = useState();
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const handleChange = (event, value) => {
    setPage(value);
  };
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

  const handleUnblock = (unblockId) => {
    axios({
      method: "patch",
      url: "https://api.speakerore.com/api/unblockregularuser",
      withCredentials: true,
      data: {
        userId: unblockId,
      },
    })
      .then((res) => {
        console.log(res.data);
        setLoading(!loading);
        toast.success(res.data.message, successToast);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message, successToast);
      });
  };

  const blockRegularUser = () => {
    axios({
      method: "patch",
      url: "https://api.speakerore.com/api/blockregularuser",
      withCredentials: true,
      data: {
        userId: block,
      },
    })
      .then((res) => {
        toast.success(res.data.message, successToast);
        setLoading(!loading);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message, successToast);
      });
  };

  const makeMember = () => {
    axios({
      method: "patch",
      url: "https://api.speakerore.com/api/makeusertoteammember",
      withCredentials: true,
      data: {
        userId: makeMemberId,
      },
    })
      .then((res) => {
        console.log(res.data);
        setLoading(!loading);
        toast.success(res.data.message, successToast);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message, successToast);
      });
  };

  useEffect(() => {
    axios({
      method: "get",
      url: "https://api.speakerore.com/api/getallregularuser",
      withCredentials: true,
    })
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  

  React.useEffect(() => {
    console.log('run')
    axios({
      method: "get",
      url: `https://api.speakerore.com/api/getallregularuser?page=${page}`,
      withCredentials: true,
    })
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 404) {
          setUserData("");
        }
      });
  }, [loading, page]);

  React.useEffect(() => {
    axios({
      method: "get",
      url: `https://api.speakerore.com/api/getuserbysearch?keyword=${searchKey}&page=${page}`,
      withCredentials: true,
    })
      .then((res) => {
        setFilter(res.data.queryResult);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 422 || 404) {
          setFilter("");
        }
      });
  }, [searchKey, page]);

  function convertDate(e) {
    const date = new Date(e).toLocaleDateString();
    return date;
  }
  
  return (
    userData ? (
    <div>
      <ToastContainer />
      <div className="input-div">
        <input
          placeholder="Search via roles"
          style={{
            padding: "8px 8px 8px 32px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            backgroundColor: "#f5f5f5",
            width: "280px",
            marginTop: "20px",
            backgroundImage: `url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"%3E%3Ccircle cx="11" cy="11" r="8" fill="white" /%3E%3Cpath d="M21 21l-4.35-4.35" /%3E%3C/svg%3E')`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "8px center",
            backgroundSize: "16px",
          }}
          value={searchKey}
          onChange={(e) => {
            setSearchKey(e.target.value);
          }}
        />
      </div>
      {filter ? (
              filter.map((row) => (
                <>
            <div className="coupon-card-continer">
              <div className="user-id">
                <span>USER ID</span>
                <div></div>
                <span>{row.alphaUnqiueId}</span>
              </div>
              <p className="mail">{row.email}</p>
              <div  style={{ marginBottom: "10px" }} className="plan-type">
                <span>Plan</span>
                <div></div>
                <span style={{ color: "gray" }}>
                  {row.subcription ? row.subcription.Subcription_Type : null}
                </span>
              </div>
              <div>
                {convertDate(row.subcription && row.subcription.StartDate)} -{" "}
                {convertDate(row.subcription && row.subcription.EndDate)}
              </div>
              <div>
                {!row.blocked ? <button
                  id="Button"
                  className="blacklist-btn"
                  onClick={() => {
                    setLoading(!loading);
                    handleClickOpen();
                    setBlock(row._id);
                  }}
                >
                  Blacklist
                </button>:<button
                 id="Button"
                  className="blacklist-btn"
                      onClick={() => {
                        handleUnblock(row._id);
                      }}
                    >
                      UNBLOCK
                    </button>}
                <button
                  id="Button"
                  className="make-members-btn"
                  onClick={() => {
                    setLoading(!loading);
                    handleClickOpen2();
                    setMakeMemberId(row._id);
                  }}
                >
                  Make Member
                </button>
                <Dialog
                  fullScreen={fullScreen}
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="responsive-dialog-title"
                >
                  <DialogTitle id="responsive-dialog-title">
                    {"Are You Sure You Want To Block This User"}
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
                        blockRegularUser();
                      }}
                      autoFocus
                    >
                      Block
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
                    {"Do you want to make this user to team member"}
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
                        makeMember();
                      }}
                      autoFocus
                    >
                      Make Member
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            </div>
            <hr style={{ marginLeft: 0, width: "100vw" }} />
          </>))
            ) : searchKey ? (
              <div>
                <h3>No Matching User</h3>
              </div>
            ) : (
        userData.savedUser.map((row) => (
          <>
            <div className="coupon-card-continer">
              <div className="user-id">
                <span>USER ID</span>
                <div></div>
                <span>{row.alphaUnqiueId}</span>
              </div>
              <p className="mail">{row.email}</p>
              <div  style={{ marginBottom: "10px" }} className="plan-type">
                <span>Plan</span>
                <div></div>
                <span style={{ color: "gray" }}>
                  {row.subcription ? row.subcription.Subcription_Type : null}
                </span>
              </div>
              <div>
                {convertDate(row.subcription && row.subcription.StartDate)} -{" "}
                {convertDate(row.subcription && row.subcription.EndDate)}
              </div>
              <div>
              {!row.blocked ? <button
                  id="Button"
                  className="blacklist-btn"
                  onClick={() => {
                    setLoading(!loading);
                    handleClickOpen();
                    setBlock(row._id);
                  }}
                >
                  Blacklist
                </button>:<button
                 id="Button"
                  className="blacklist-btn"
                      onClick={() => {
                        handleUnblock(row._id);
                      }}
                    >
                      UNBLOCK
                    </button>}
                <button
                  id="Button"
                  className="make-members-btn"
                  onClick={() => {
                    setLoading(!loading);
                    handleClickOpen2();
                    setMakeMemberId(row._id);
                  }}
                >
                  Make Member
                </button>
                <Dialog
                  fullScreen={fullScreen}
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="responsive-dialog-title"
                >
                  <DialogTitle id="responsive-dialog-title">
                    {"Are You Sure You Want To Block This User"}
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
                        blockRegularUser();
                      }}
                      autoFocus
                    >
                      Block
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
                    {"Do you want to make this user to team member"}
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
                        makeMember();
                      }}
                      autoFocus
                    >
                      Make Member
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            </div>
            <hr style={{ marginLeft: 0, width: "100vw" }} />
          </>
        )))
      }
      <Stack spacing={2}>
        <Pagination
          style={{ justifyContent: "center", marginTop: "20px" }}
          count={userData.totalPages}
          page={page}
          onChange={handleChange}
        />
        <Typography>Page: {page}</Typography>
      </Stack>
    </div>
    ) : (
      <></>
    )
  );
};

export default UsersWrapper;
