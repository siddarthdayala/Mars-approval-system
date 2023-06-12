import Paper from '@mui/material/Paper';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import Cookies from 'js-cookie';

const HRHistoryList = () => {
  const [expenses, setExpenses] = useState([]);
  const currentUser = useSelector((storeState) => storeState.auth.user);

  useEffect(() => {
    fetchExpenses();
  }, []);

  async function fetchExpenses() {
    const token = Cookies.get('token');
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/expense/history`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const { data } = await res.json();
    setExpenses(data);
  }

  function formatDate(date) {
    return dayjs(date).format('DD MMM, YYYY');
  }

  return (
    <>
      <Typography sx={{ marginTop: 10 }} variant="h6">
        List of Expenses
      </Typography>
      <TableContainer sx={{ background: 'none', boxShadow: 'none'}} component={Paper}>
        <Table sx={{ width: '80%', margin: '0 auto' }} aria-label="simple table">
          <TableHead>
            <TableRow>
            <TableCell align="center">Employee Name</TableCell>
              <TableCell align="center">Employee Id</TableCell>
              <TableCell align="center">Project Name</TableCell>
              <TableCell align="center">Project Id</TableCell>
              <TableCell align="center">Claim Name</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Amount (Rs)</TableCell>
              <TableCell align="center">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map((row) => (
              <TableRow
                key={row._id}
              >
                <TableCell align="center" component="th" scope="row">
                  {row.empName}
                </TableCell>
                <TableCell align="center">{row.empId}</TableCell>
                <TableCell align="center">{row.projName}</TableCell>
                <TableCell align="center">{row.projId}</TableCell>
                <TableCell align="center">{row.description}</TableCell>
                <TableCell align="center">{
                  row.status === 'Rejected'?'Rejected':'Accepted'
                }</TableCell>
                <TableCell align="center">{row.amount}</TableCell>
                <TableCell align="center">{formatDate(row.date)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default HRHistoryList;
