// import Autocomplete from "@mui/material/Autocomplete";
import { Modal, Form, Input, DatePicker, Upload, Button } from 'antd';

import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useForm } from 'antd/es/form/Form';
//import ReactImageFileToBase64 from "react-file-image-to-base64";
// import dayjs from 'dayjs';
// import { useSelector } from "react-redux";
import axios from "axios";


const InitialForm = {
  empName: '',
  empId: '',
  projName: '',
  projId: '',
  billProof: "",
  status: 'InProcess',
  amount: 0,
  description: '',
  // date: new Date(),
  date: null,
};


export default function ExpenseForm({ fetchExpenses, editTransaction, toggleForm, setToggleForm }) {
  // const { categories } = useSelector((state) => state.auth.user);
  const token = Cookies.get('token');
  const [form, setForm] = useState(InitialForm);
  const [formf] = useForm();
  const formData = new FormData();
  

  useEffect(() => {
    if (editTransaction.amount !== undefined) {
      setForm(editTransaction);
    }
  }, [editTransaction]);

  function stringify(obj) {
    const replacer = [];
    for (const key in obj) {
        replacer.push(key);
    }
    return JSON.stringify(obj, replacer); 
  }


  function handleChange(e) {
    setForm({ ...form, [e.target.id]: e.target.value });

  }

  function handleDate(newValue) {
    setForm({ ...form, date: newValue });
  }



  function handleFileUpload(e){
    setForm({ ...form, [e.target.id]: stringify(e.target.files[0])});

  }

  async function handleSubmit(e) {
    e.preventDefault();

    formf
    .validateFields()
    .then((values) => {
 

     const proof = document.querySelector('#billProof');
     formData.append("photo", proof.files[0]);

    axios
      .post("http://localhost:4000/api/save", formData)
      .then((res)=>{console.log(res.data)})
      .catch((err)=>{console.log(err)})


      editTransaction.amount === undefined ? create() : update();
      setToggleForm(false);
      formf.resetFields();
    })
    .catch((info) => {
      console.log('Validate Failed:', info);
    });

  }

  function reload(res) {
    if (res.ok) {
      setForm(InitialForm);
      fetchExpenses();
    }
  }

  async function create() {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/expense`, {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    reload(res);
  }

  async function update() {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/expense/${editTransaction._id}`,
      {
        method: 'PATCH',
        body: JSON.stringify(form),
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    reload(res);
  }

  // function getCategoryNameById() {
  //   return (
  //     categories.find((category) => category._id === form.category_id) ?? ""
  //   );
  // }
    
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 14,
      },
    },
  };


  return (


      <Modal 
        open={toggleForm} 
        title="Fill the Form"
        onCancel={()=>{
          formf.resetFields();
          setToggleForm(false)}} 
        centered
        footer={[
          <Button key="submit" type="primary" onClick={handleSubmit}>Submit</Button>
        ]}

        >
            
                <Form className="claim-form" name="claimForm" form={formf}  {...formItemLayout} size='large'>
            
                    <Form.Item label="Name of the claim" name='description' rules={[{required: true, message:"Required"}]}>
                        <Input id="description"  onChange={handleChange} value={form.description}/>
                    </Form.Item>
                    
                    <Form.Item label="Employee Name" name='empName'  rules={[{required: true, message:"Required"}]} >
                        <Input id="empName" onChange={handleChange} value={form.empName}/>
                    </Form.Item>
                    

                    <Form.Item label="Employee ID" name='empId'  rules={[{required: true, message:"Required"}]}>
                        <Input id="empId" onChange={handleChange} value={form.empId}/>
                    </Form.Item>

                
                    <Form.Item label="Project Name" name='projName'  rules={[{required: true, message:"Required"}]}>
                        <Input id="projName"  onChange={handleChange} value={form.projName}/>
                    </Form.Item>

                    <Form.Item label="Project ID" name='projId'  rules={[{required: true, message:"Required"}]}>
                        <Input id="projId" onChange={handleChange}  value={form.projId}/>
                    </Form.Item>
                   
                    
                    <Form.Item label="Amount" name='amount'  rules={[{required: true, message:"Required"}]}>
                        <Input id="amount" type="number" onChange={handleChange} value={form.amount}/>
                    </Form.Item>

                    <Form.Item label="Date Of Expense" name='date'  rules={[{required: true, message:"Required"}]}>
                        <DatePicker  id="date" onChange={handleDate} value={form.date}/>
                    </Form.Item>
                   
                    <Form.Item label="Proof" name='billProof'  rules={[{required: true, message:"Required"}]}>
                       {// <Upload>
                          //  <Button id="billProof" value={form.billProof} onChange={handleChange} icon={<UploadOutlined />}>Click to upload</Button>
                        //</Upload>
                      
                       }
                      <Input type="file" id="billProof"  onChange={handleFileUpload} />
                       
                       
                         
                    </Form.Item>

                </Form>

        </Modal>

  );
  
  
  
   
}
