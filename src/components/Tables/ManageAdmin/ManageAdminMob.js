import React from "react";
// import "./TeamMembers.css";
import axios from "axios";
import { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";


// import TableRow from "@mui/material/TableRow";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
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

export default function ManageAdminMob() {
  const [adminData, setAdminData] = React.useState("");
  const [loading, setLoading] = useState(false);
  const [makeMemberId, setMakeMemberId] = useState("");
  // const [makeUserId, setmakeUserId] = useState("");
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [searchKey, setSearchKey] = React.useState('');
  // const [filter, setFilter] = useState();

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

  const makeadmintoteammember = () => {
    axios({
      method: "patch",
      url: "https://api.speakerore.com/api/makeadmintoteammember",
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

  React.useEffect(() => {
    axios({
      method: "get",
      url: "https://api.speakerore.com/api/getalladmins",
      withCredentials: true,
    })
      .then((res) => {
        setAdminData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  React.useEffect(() => {
    axios({
      method: "get",
      url: `https://api.speakerore.com/api/getalladmins?page=${page}`,
      withCredentials: true,
    })
      .then((res) => {
        setAdminData(res.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 404) {
          setAdminData("");
        }
      });
  }, [loading, page]);

  return adminData ? (
    <div className="team-members-container">
      <ToastContainer />
      <div className="search-bar">
        {/* <BiSearchAlt className="search-icon" /> */}
        {/* <input
          placeholder="Search via subscription plan"
          className="search-input"
          value={searchKey}
          onChange={(e) => {
            setSearchKey(e.target.value);
          }}
        /> */}
      </div>
      <div className="member-list">
        {
          adminData.savedTeamMember.map((row) => (
            <div className="member-card" key={row.alphaUnqiueId}>
              <div className="member-info">
                <div className="info-row">
                  <span className="info-label">USER ID |</span>
                  <span className="info-value">{row.alphaUnqiueId}</span>
                </div>
                <div className="info-row">
                  <span className="info-value">{row.calories}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Email |</span>
                  <span className="info-value">{row.email}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Role|</span>
                  <span className="info-value">{row.role}</span>
                </div>
                <div className="button-group">
                  <button
                    className="backlist-button"
                    onClick={() => {
                      handleClickOpen();
                     setMakeMemberId(row._id);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    Make Member
                  </button>
                  {/* <button
                    className="make-member-button"
                    onClick={() => {
                      handleClickOpen2();
                      setAdminId(row._id);
                    }}
                    style={{ background: "#24754F", cursor: "pointer" }}
                  >
                    Make Admin
                  </button> */}
                  <Dialog
                    fullScreen={fullScreen}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                  >
                    <DialogTitle id="responsive-dialog-title">
                      {
                        "Are you sure you want to make this Admin a Team Member"
                      }
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
                          makeadmintoteammember();
                        }}
                        autoFocus
                      >
                        Make Member
                      </Button>
                    </DialogActions>
                  </Dialog>
                  {/* <Dialog
                    fullScreen={fullScreen}
                    open={open2}
                    onClose={handleClose2}
                    aria-labelledby="responsive-dialog-title"
                  >
                    <DialogTitle id="responsive-dialog-title">
                      {"Do you want to make this Member an Admin"}
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
                          maketeammembertoadmin();
                        }}
                        autoFocus
                      >
                        Make Admin
                      </Button>
                    </DialogActions>
                  </Dialog> */}
                </div>
              </div>
              <hr className="divider" />
            </div>
          )
        )}
      </div>
      <Stack spacing={2}>
        <Pagination
          style={{ justifyContent: "center", marginTop: "20px" }}
          count={adminData.totalPages}
          page={page}
          onChange={handleChange}
        />
        <Typography>Page: {page}</Typography>
      </Stack>
    </div>
  ) : (
    <Typography>No Admin present</Typography>
  );
}
