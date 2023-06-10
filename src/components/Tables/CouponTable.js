import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

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
  createData(123456789, 'Rs 833', "yearly", "24.01.2019", "24.01.2020", "DISABLE"),
  createData(123456789, 'Rs 833', "yearly", "24.01.2019", "24.01.2020", "DISABLE"),
  createData(123456789, 'Rs 833', "yearly", "24.01.2019", "24.01.2020", "DISABLE"),
  createData(123456789, 'Rs 833', "yearly", "24.01.2019", "24.01.2020", "DISABLE"),
  createData(123456789, 'Rs 833', "yearly", "24.01.2019", "24.01.2020", "DISABLE"),
];

export default function CouponTable() {
  const [couponData, setCouponData] = useState("");

  useEffect(() => {
    axios({
      method: "get",
      url: "https://www.sobacke.in/api/getallcoupons",
      withCredentials: true,
    })
      .then((res) => {
        setCouponData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  
  console.log(couponData)
  return (
    <div className='table-container'>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow sx={{backgroundColor:'#393939'}}>
            <StyledTableCell>Coupon Code</StyledTableCell>
            <StyledTableCell align="right">Amount</StyledTableCell>
            <StyledTableCell align="right">Start Date</StyledTableCell>
            <StyledTableCell align="right">Expiry Date</StyledTableCell>
            <StyledTableCell align="right">Action Required</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.calories}</StyledTableCell>
              <StyledTableCell align="right">{row.carbs}</StyledTableCell>
              <StyledTableCell align="right">{row.protein}</StyledTableCell>
              <StyledTableCell align="right" sx={{color:'black'}}>{row.action}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}