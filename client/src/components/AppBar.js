import 'bootstrap/dist/css/bootstrap.min.css';

import { Button } from 'antd';

import Cookies from 'js-cookie';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../store/auth.js';

export default function ButtonAppBar() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const currentUser = useSelector((state) => state.auth.user);
  const currentUserType = currentUser.userType;
  const dispatch = useDispatch();

  function _logout() {
    Cookies.remove('token');
    dispatch(logout());
    navigate('/login');
   
  }
/*
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link className="text-white" to="/">
              Expense Approval System
            </Link>
          </Typography>

          {isAuthenticated && (
            <Button color="inherit" onClick={_logout}>
              Logout
            </Button>
          )}

          {!isAuthenticated && (
            <>
              <Link to="/login" className="text-white">
                <Button color="inherit">Login</Button>
              </Link>
              <Link to="/register" className="text-white">
                <Button color="inherit">Register</Button>
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
*/
    
        return (
          <div className="nav">

            <h2>Expense Approval System</h2>

            {isAuthenticated && (
            <div className='home_history_logout'>
              <div><Link to="/" className='home-button'>Home</Link></div>

              {currentUserType !== 'Employee' && (
                  <div><Link to="/expense/history" className="history-button">History</Link></div>
              )}

              <div><Button className="logout-button" variant="text" onClick={_logout}>Logout</Button></div>
            </div>
          )}

            {!isAuthenticated && (
            <div className='login_register'>
              <Link to="/login" className="text-white">
                <Button color="inherit" className='login-button'>Login</Button>
              </Link>
              <Link to="/register" className="text-white">
                <Button color="inherit" className='register-button'>Register</Button>
              </Link>
            </div>
          )}
          </div>
       )
      
    

  
}
