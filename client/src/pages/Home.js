// import Container from '@mui/material/Container';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
// import TransactionChart from '../components/TransactionChart';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import Button from 'react-bootstrap/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TaskIcon from '@mui/icons-material/Task';


export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [editTransaction, setEditTransaction] = useState({});
  const [toggleForm, setToggleForm] = useState(false);

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
    setTransactions(data);
  }

  return (
    <>

      <h3 className="page-header"><TaskIcon className="table-chart-icon" fontSize='large'/>Your Expense Claims</h3>
      <ExpenseForm
        fetchExpenses={fetchExpenses}
        editTransaction={editTransaction}
        toggleForm={toggleForm}
        setToggleForm={setToggleForm}
      />

      <ExpenseList
        data={transactions}
        fetchExpenses={fetchExpenses}
        setEditTransaction={setEditTransaction}
      />

      <Button className="add-claim-button" variant="primary" onClick={()=>{setToggleForm(true)}}><AddCircleIcon className='add-circle-icon'/>Add expense claim</Button>
    </>
  );
}
