import React from 'react'
import { useSelector } from 'react-redux';
import HRHistoryList from '../components/HRHistoryList'
import DirectorHistoryList from '../components/DirectorHistoryList';
import FinanceDepartmentHistoryList from '../components/FinanceDepartmentHistoryList';

const History = () => {
  const currentUser = useSelector((storeState) => storeState.auth.user);
  const currentUserType = currentUser.userType;

  return (
    <>
      {
        currentUserType === 'HR' && (
          <HRHistoryList />
        )
      }
      {
        currentUserType === 'Director' && (
          <DirectorHistoryList />
        )
      }
      {
        currentUserType === 'FinanceDept' && (
          <FinanceDepartmentHistoryList />
        )
      }
    </>
  )
}

export default History