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
import { useEffect, useState } from "react";
import axios from "axios";


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
  return { name, calories, fat, carbs, protein, action };
}

const rows = [
  createData(123456789, 'abc@gmail.com', "yearly", "24.01.2019", "24.01.2020", "backlist"),
  createData(123456789, 'abc@gmail.com', "yearly", "24.01.2019", "24.01.2020", "backlist"),
  createData(123456789, 'abc@gmail.com', "yearly", "24.01.2019", "24.01.2020", "backlist"),
  createData(123456789, 'abc@gmail.com', "yearly", "24.01.2019", "24.01.2020", "backlist"),
  createData(123456789, 'abc@gmail.com', "yearly", "24.01.2019", "24.01.2020", "backlist"),
];

export default function UserTable() {
  const [userData, setUserData] = useState("");

  useEffect(() => {
    axios({
      method: "get",
      url: "https://www.sobacke.in/api/getallregularuser",
      withCredentials: true,
    })
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function convertDate(e) {
    const date = new Date(e).toLocaleDateString();
    return date;
  }

  console.log(userData)

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
            <StyledTableCell align="right">Plan</StyledTableCell>
            <StyledTableCell align="right">Start Date</StyledTableCell>
            <StyledTableCell align="right">Expiry Date</StyledTableCell>
            <StyledTableCell align="right">Action Required</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {userData ? userData.savedUser.map((row) => (
            <StyledTableRow key={row.alphaUnqiueId}>
              <StyledTableCell align="">{row.alphaUnqiueId}</StyledTableCell>
              <StyledTableCell component="th" align="right" scope="row">
                {row.email}
              </StyledTableCell>
              <StyledTableCell align="right">{row.subcription.Subcription_Type}</StyledTableCell>
              <StyledTableCell align="right">{convertDate(row.subcription.StartDate)}</StyledTableCell>
              <StyledTableCell align="right">{convertDate(row.subcription.EndDate)}</StyledTableCell>
              <StyledTableCell align="right" sx={{color:'red'}}><span>backlist</span></StyledTableCell>
            </StyledTableRow>
          )) : <></>}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}