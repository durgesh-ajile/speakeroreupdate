import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { BiSearchAlt } from "react-icons/bi";
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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function UserTable() {
  const [userData, setUserData] = useState("");
  const [loading, setLoading] = useState(false);
  const [block, setBlock] = useState("");
  const [makeMemberId, setMakeMemberId] = useState("");
  const [page, setPage] = React.useState(1);
  const [searchKey, setSearchKey] = React.useState();
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
        console.log(res.data);
        setLoading(!loading);
        toast.success(res.data.message, successToast);
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
  console.log(userData);

  return userData ? (
    <div className="table-container">
      <ToastContainer />

      <div className="input-div">
        <BiSearchAlt className="ico" />
        <input
          placeholder="Search via subscription plan"
          className="dash-input"
          value={searchKey}
          onChange={(e) => {
            setSearchKey(e.target.value);
          }}
        />
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>User Id</StyledTableCell>
              <StyledTableCell align="right">Email</StyledTableCell>
              <StyledTableCell align="right">Plan</StyledTableCell>
              <StyledTableCell align="right">Start Date</StyledTableCell>
              <StyledTableCell align="right">Expiry Date</StyledTableCell>
              <StyledTableCell align="right">Action Required</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filter ? (
              filter.map((row) => (
                <StyledTableRow key={row.alphaUnqiueId}>
                  <StyledTableCell align="">
                    {row.alphaUnqiueId}
                  </StyledTableCell>
                  <StyledTableCell component="th" align="right" scope="row">
                    {row.email}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.subcription ? row.subcription.Subcription_Type : null}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {convertDate(row.subcription && row.subcription.StartDate)}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {convertDate(row.subcription && row.subcription.EndDate)}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <span
                      onClick={() => {
                        setLoading(!loading);
                        handleClickOpen();
                        setBlock(row._id);
                      }}
                      style={{ color: "red", cursor: "pointer" }}
                    >
                      BLACKLIST
                    </span>{" "}
                    |{" "}
                    <span
                      onClick={() => {
                        setLoading(!loading);
                        handleClickOpen2();
                        setMakeMemberId(row._id);
                      }}
                      style={{ color: "#24754F", cursor: "pointer" }}
                    >
                      MAKE MEMBER
                    </span>
                  </StyledTableCell>
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
                </StyledTableRow>
              ))
            ) : searchKey ? (
              <div>
                <h3>No Matching User</h3>
              </div>
            ) : (
              userData.savedUser.map((row) => (
                <StyledTableRow key={row.alphaUnqiueId}>
                  <StyledTableCell align="">
                    {row.alphaUnqiueId}
                  </StyledTableCell>
                  <StyledTableCell component="th" align="right" scope="row">
                    {row.email}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.subcription ? row.subcription.Subcription_Type : null}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {convertDate(row.subcription && row.subcription.StartDate)}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {convertDate(row.subcription && row.subcription.EndDate)}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <span
                      onClick={() => {
                        setLoading(!loading);
                        handleClickOpen();
                        setBlock(row._id);
                      }}
                      style={{ color: "red", cursor: "pointer" }}
                    >
                      BLACKLIST
                    </span>{" "}
                    |{" "}
                    <span
                      onClick={() => {
                        setLoading(!loading);
                        handleClickOpen2();
                        setMakeMemberId(row._id);
                      }}
                      style={{ color: "#24754F", cursor: "pointer" }}
                    >
                      MAKE MEMBER
                    </span>
                  </StyledTableCell>
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
                </StyledTableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
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
    <Typography>No team member present</Typography>
  );
}
