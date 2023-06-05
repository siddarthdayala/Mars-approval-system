import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
// import EditSharpIcon from '@mui/icons-material/EditSharp';

import dayjs from 'dayjs';
import Cookies from 'js-cookie';
import * as React from 'react';
import { Image, Card, Row, Col, Modal, Steps, Pagination } from 'antd';

import 'antd/dist/reset.css'; 
import { useState, useEffect }  from "react";

import axios from 'axios';


// import { useSelector } from "react-redux";
export default function ExpenseList({
  data,
  fetchExpenses,
  setEditTransaction,
}) {
  // const user = useSelector((state) => state.auth.user);
  // function categoryName(id) {
  //   const category = user.categories.find((category) => category._id === id);
  //   return category ? category.label : "NA";
  // }
 

  
  async function remove(_id) {
    const token = Cookies.get('token');
    if (!window.confirm('Are you sure')) return;
    const res = await fetch(`${process.env.REACT_APP_API_URL}/expense/${_id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      fetchExpenses();
    }
  }

  function formatDate(date) { 
    return dayjs(date).format('DD MMM, YYYY');
  }




/*
  const rowdata=
    data.map((row)=>({
      key: row._id,
      claimName: row.description,
      projectName: row.projName,
      projectID: row.projId,
      date: formatDate(row.date),
      amount: row.amount,
      status: row.status,
      delete: row._id
    })
    )

*/

    const [selected, setSelected] = useState(null);
    const [openModal, setopenModal] = useState(false);
    const [page, setPage] = useState(1);
    const pageSize = 6;
    const [photos, setPhotos] = useState([]);
    const [photoUi, setPhotoUi] = useState("");

    useEffect(() => {
      axios.get("http://localhost:4000/api/get")
      .then((res) => {
        setPhotos(res.data);
      })
      .catch((err)=>console.log(err));
    },[photoUi]);

    
    let indexOfFirstPage, indexOfLastPage, currentData;
    indexOfLastPage = page * pageSize;
    indexOfFirstPage = indexOfLastPage - pageSize;
    currentData = data.slice(indexOfFirstPage,indexOfLastPage)
    //console.log(indexOfLastPage,indexOfFirstPage,page,pageSize,currentData)
    

 
  return (
    <>
      {/*
      <Table
        className='claims-table'
        columns = {columns}
        dataSource={rowdata}
        bordered
        pagination={{
          current: page,
          pageSize: pageSize,
          onChange:(page,pageSize)=>{
            setPage(page);
            setPageSize(pageSize)
          }
        }}
        scroll={{x: 'max-content'}}
      />

      */}
    


   

    <Row>
      {currentData.map((row)=>{
                  return(
                    
                      <Col span={8} key={row._id}>
                        <Card 
                            className='cards'
                            headStyle={{textAlign: 'center', 
                            border: '1px solid rgba(255, 255, 255, .25)',
                            borderRadius: '20px',
                            //backgroundColor: 'rgba(255, 255, 255, 0.45)',
                            boxShadow: '0 0 10px 1px rgba(0, 0, 0, 0.25)',
                          
                            backdropFilter: 'blur(15px)'
                          }}
                            style={{margin: '10px 25px', boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px'}}
                            title={row.description}
                            extra={
                              <DeleteOutlineOutlinedIcon style={{cursor: "pointer"}} onClick={()=>{remove(row._id)}}/>
                            }
                        >
                          <div>
                            <h6>Project Name:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span>{row.projName}</span></h6>
                            <h6>Amount (Rs):&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span>{row.amount}</span></h6>
                            <h6>Date of Expense:&nbsp; <span>{formatDate(row.date)}</span></h6>
                            <p style={{textAlign:"right"}}><span style={{cursor: "pointer"}} onClick={()=>{
                              setSelected(row);
                              setopenModal(true);
                              setPhotoUi(row._id);
                            }}
                            >Check Status</span></p>
                            
      
                        </div>
                        </Card>
                      </Col>
                     

                  )})}
      
    
      
    </Row>
  
    <Pagination 
          className='pagination'
          total={data.length}
          current={page}
          pageSize={pageSize}
      
          onChange={(page)=>{
            setPage(page);
          }}
      />
    
   


    {
      openModal &&

      
    
    <Modal 
        open={openModal}
        onCancel={()=>{
          setopenModal(false);
          setSelected(null)
        }}
        centered 
        width= {750}
        bodyStyle={{padding: '20px'}}
        footer={null}
      >
        <h2>{selected.description}</h2>
        <div className='claim-card-modal'>
            <div className='modal-details'>
              <p>Project Name<h4>{selected.projName}</h4></p>
              <p>Amount (Rs)<h4>{selected.amount}</h4></p>
              <p>Date of Expense<h4>{formatDate(selected.date)}</h4></p>
            </div>

            <div className='modal-details-1'>
                <div className='modal-status'>
                  <h5>Status</h5>
                  <Steps
                    size='small'
                    direction="vertical"
                    current={1}
                    items={[
                      {
                        title: 'Claim Submitted',
                      },
                      {
                        title: 'HR Approval',
                      },
                      {
                        title: 'Director Approval',
                      },
                      {
                        title: 'Reimbursement'
                      }
                    ]}
                  />
                </div>

                <div className='modal-proof'>
                  <h5>Proof</h5>
                  {
                    photos.map(({ photo, _id })=>{
                      let fname = selected.billProof.slice(selected.billProof.indexOf(":")+2, selected.billProof.indexOf("lastModified")-3);
                      if(photo.slice(9)===fname){
                        return(
                          <Image key={_id} src={`http://localhost:4000/${photo}`} alt="proof" width={400} height={200} />
                        )
                      }
                    })
                  }
                </div>

            </div>

            
        </div>
            
        
      </Modal>
    
    }
  
    </>
  );

  

 
}
