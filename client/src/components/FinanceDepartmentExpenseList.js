import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import IconButton from '@mui/material/IconButton';
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
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
// import * as React from 'react';
// import { useSelector } from "react-redux";
export default function FinanceDepartmentExpenseList() {
  // const user = useSelector((state) => state.auth.user);
  // function categoryName(id) {
  //   const category = user.categories.find((category) => category._id === id);
  //   return category ? category.label : "NA";
  // }
  const [expenses, setExpenses] = useState([]);
  const currentUser = useSelector((storeState) => storeState.auth.user);

  useEffect(() => {
    fetchExpenses();
  }, []);

  async function fetchExpenses() {
    const token = Cookies.get('token');
    const res = await fetch(`${process.env.REACT_APP_API_URL}/expense`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { data } = await res.json();
    setExpenses(data);
  }

  async function approve(row) {
    const token = Cookies.get('token');
    const data = {
      ...row,
      currentStatus: 'FinanceDepartmentApproved',
      status: 'Accepted',
    };
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/expense/${row._id}`,
      {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.ok) {
      fetchExpenses();
    }
  }
  async function reject(row) {
    const token = Cookies.get('token');
    const data = { ...row, status: 'Rejected' };
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/expense/${row._id}`,
      {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.ok) {
      fetchExpenses();
    }
  }
  //   async function remove(_id) {
  //     const token = Cookies.get('token');
  //     if (!window.confirm('Are you sure')) return;
  //     const res = await fetch(`${process.env.REACT_APP_API_URL}/expense/${_id}`, {
  //       method: 'DELETE',
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     if (res.ok) {
  //       fetchExpenses();
  //     }
  //   }

  function formatDate(date) {
    return dayjs(date).format('DD MMM, YYYY');
  }

  return (
    <>
      <Typography sx={{ marginTop: 10 }} variant="h6">
        List of Expenses
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Employee Name</TableCell>
              <TableCell align="center">Employee Id</TableCell>
              <TableCell align="center">Project Name</TableCell>
              <TableCell align="center">Project Id</TableCell>
              <TableCell align="center">Bill Proofs</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Amount</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Action</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map((row) => (
              <TableRow
                key={row._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center" component="th" scope="row">
                  {row.empName}
                </TableCell>
                <TableCell align="center">{row.empId}</TableCell>
                <TableCell align="center">{row.projName}</TableCell>
                <TableCell align="center">{row.projId}</TableCell>
                <TableCell align="center">{row.billProof}</TableCell>
                <TableCell align="center">{row.status}</TableCell>
                <TableCell align="center">{row.amount}</TableCell>
                <TableCell align="center">{row.description}</TableCell>
                <TableCell align="center">{formatDate(row.date)}</TableCell>
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    component="label"
                    onClick={() => approve(row)}
                  >
                    <DoneIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    color="warning"
                    component="label"
                    onClick={() => reject(row)}
                  >
                    <ClearIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
