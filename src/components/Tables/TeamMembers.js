import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { BiSearchAlt } from 'react-icons/bi';
import axios from 'axios';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useState } from 'react';

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
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein, action) {
  return { name, calories, fat, action };
}

export default function TeamMembers() {
  const [teamMemberData, setTeamMemberData] = React.useState("");
  const [loading, setLoading] = useState(false);
  const [makeAdminId, setAdminId] = useState('');
  const [makeUserId, setmakeUserId] = useState('');

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

  const maketeammembertouser = () => {
    axios({
      method: "patch",
      url: "https://api.speakerore.com/api/maketeammembertouser",
      withCredentials: true,
      data: {
        userId: makeUserId,
      },
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const maketeammembertoadmin = () => {
    axios({
      method: "patch",
      url: "https://api.speakerore.com/api/maketeammembertoadmin",
      withCredentials: true,
      data: {
        userId: makeAdminId,
      },
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    axios ({
      method: "get",
      url: "https://api.speakerore.com/api/getallteammembers",
      withCredentials: true,
    })
      .then((res) => {
        setTeamMemberData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    axios ({
      method: "get",
      url: "https://api.speakerore.com/api/getallteammembers",
      withCredentials: true,
    })
      .then((res) => {
        setTeamMemberData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loading]);

  console.log(teamMemberData)

  return (
    <div className='table-container'>
    <div className='input-div'>
        <BiSearchAlt className='ico'/>
        <input placeholder='Search via subscription plan' className='dash-input'/>
    </div>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>User Id</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
            <StyledTableCell align="right">Role</StyledTableCell>
            <StyledTableCell align="right">Action Required</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
         
          {teamMemberData ? teamMemberData.savedTeamMember.map((row) => (
            <StyledTableRow key={row.alphaUnqiueId}>
              <StyledTableCell align="">{row.alphaUnqiueId}</StyledTableCell>
              <StyledTableCell component="th" align="right" scope="row">
                {row.email}
              </StyledTableCell>
              <StyledTableCell align="right">{row.role}</StyledTableCell>
              <StyledTableCell align="right" ><span onClick={() => {
              
                handleClickOpen();
                setmakeUserId(row._id)
              }} style={{color:'red', cursor:'pointer'}}>MAKE USER</span> | <span onClick={() => {
               
                handleClickOpen2();
                setAdminId(row._id)
              }} style={{color:'#24754F', cursor:'pointer'}}>MAKE ADMIN</span></StyledTableCell>
              <Dialog
                        fullScreen={fullScreen}
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="responsive-dialog-title"
                      >
                        <DialogTitle id="responsive-dialog-title">
                          {"Are You Sure You Want To Make This Member a Normal User"}
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
                              maketeammembertouser();
                              setLoading(!loading)
                            }}
                            autoFocus
                          >
                            Make User
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
                              setLoading(!loading)
                            }}
                            autoFocus
                          >
                            Make Admin
                          </Button>
                        </DialogActions>
                      </Dialog>
            </StyledTableRow>
          )) : <></>}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}