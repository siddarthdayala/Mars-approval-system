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
import axios from 'axios';
import { Image, Modal, Input } from 'antd';

// import * as React from 'react';
// import { useSelector } from "react-redux";
export default function HRExpenseList() {
  // const user = useSelector((state) => state.auth.user);
  // function categoryName(id) {
  //   const category = user.categories.find((category) => category._id === id);
  //   return category ? category.label : "NA";
  // }
  const [expenses, setExpenses] = useState([]);
  const currentUser = useSelector((storeState) => storeState.auth.user);

  const [photos, setPhotos] = useState([]);
  const [photoUi, setPhotoUi] = useState("");
  const [visible, setVisible] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);
  const [reason, setReason] = useState("");
  const [rejectedClaim, setRejectedClaim] = useState({})

  const { TextArea } = Input;
 
  useEffect(() => {
    fetchExpenses();
  }, []);

  useEffect(() => {
    axios.get("http://localhost:4000/api/get")
    .then((res) => {
      setPhotos(res.data);
    })
    .catch((err)=>console.log(err));
  },[photoUi]);
  

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
    const data = { ...row, currentStatus: 'HRApproved' };
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
  async function reject() {
    const row = rejectedClaim;
    const token = Cookies.get('token');
    const data = { ...row, status: 'Rejected', reason: reason };
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

  function imagePreview(row){
    setVisible(true);
    setPhotoUi(row); 
  }

  return (
    <>
      <h3 className='page-header'>Pending Claims</h3>
      <TableContainer sx={{ background: 'none', boxShadow: 'none'}} component={Paper}>
        <Table sx={{ width: '80%', margin: '0 auto' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Employee Name</TableCell>
              <TableCell align="center">Employee Id</TableCell>
              <TableCell align="center">Project Name</TableCell>
              <TableCell align="center">Project Id</TableCell>
              <TableCell align="center">Claim Name</TableCell>
              <TableCell align="center">Bill Proof</TableCell>
              <TableCell align="center">Amount (Rs)</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Action</TableCell>
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
                <TableCell align="center"><a style={{color: '#262fe3', cursor:'pointer'}} onClick={()=>imagePreview(row)}>Click Here</a></TableCell>

                { visible && 
                    photos.map(({ photo, _id })=>{
                      let fname = photoUi.billProof.slice(photoUi.billProof.indexOf(":")+2, photoUi.billProof.indexOf("lastModified")-3);

                      if(photo.slice(8)===fname || photo.slice(9)===fname || photo.slice(10)===fname){
                        return(
                          <Image
                              key={_id}
                              style={{
                                display: 'none',
                              }}
                              src={`http://localhost:4000/${photo}`}
                              preview={{
                                visible,
                                onVisibleChange: (value) => {
                                  setVisible(value);
                                },
                              }}
                        />
                  
                        )
                      }
                    })
                  }

                <TableCell align="center">{row.amount}</TableCell>
                <TableCell align="center">{formatDate(row.date)}</TableCell>
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    component="label"
                    onClick={() => approve(row)}
                  >
                    <DoneIcon />
                  </IconButton>
                  <IconButton
                    color="warning"
                    component="label"
                    onClick={()=>{setRejectModal(true);setRejectedClaim(row)}}
                  >
                    <ClearIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>


    {
      rejectModal && 
      <Modal
        open={rejectModal}
        onCancel={()=>setRejectModal(false)}
        onOk={()=>{reject();setRejectModal(false)}}
      >
      <h5>Enter the Reason here</h5>
      <TextArea
        value={reason}
        onChange={(e)=>setReason(e.target.value)}
        placeholder="Write here..."
        autosize={{
          minRows: 3,
          maxRows: 5
        }}
      >
      </TextArea>
      </Modal>
    }
      
    </>
  );
}
