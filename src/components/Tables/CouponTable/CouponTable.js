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
import { Pagination, Stack, Typography } from "@mui/material";

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


export default function CouponTable() {
  const [couponData, setCouponData] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = React.useState(1);

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    axios({
      method: "get",
      url: `https://api.speakerore.com/api/getallcoupons?page=${page}`,
      withCredentials: true,
    })
      .then((res) => {
        setCouponData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [page]);

  useEffect(() => {
    axios({
      method: "get",
      url: `https://api.speakerore.com/api/getallcoupons?page=${page}`,
      withCredentials: true,
    })
      .then((res) => {
        setCouponData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function convertDate(e) {
    const date = new Date(e).toLocaleDateString();
    return date;
  }
  
  console.log(couponData)
  return (
    <div className='table-container'>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow sx={{backgroundColor:'#393939'}}>
            <StyledTableCell>Coupon Code</StyledTableCell>
            <StyledTableCell align="center">Discount</StyledTableCell>
            <StyledTableCell align="center">Max Usage</StyledTableCell>
            <StyledTableCell align="right">Expiry Date</StyledTableCell>
            <StyledTableCell align="right">Coupon Type</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {couponData && 
          couponData.savedCoupon.map((row) => (
            <StyledTableRow key={row.coupon_code}>
              <StyledTableCell component="th" scope="row">
                {row.coupon_code}
              </StyledTableCell>
              <StyledTableCell align="center">{row.discount}%</StyledTableCell>
              <StyledTableCell align="center">{row.max_usages}</StyledTableCell>
              <StyledTableCell align="right">{convertDate(row.expiration_date)}</StyledTableCell>
              <StyledTableCell align="right">{row.subscription_type}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Stack spacing={2}>
              <Pagination
                style={{ justifyContent: "center", marginTop: "20px" }}
                count={couponData.totalPages}
                page={page}
                onChange={handleChange}
              />
              <Typography>Page: {page}</Typography>
            </Stack>
    </div>
  );
}