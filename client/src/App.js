import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import AppBar from './components/AppBar';
import { setUser } from './store/auth.js';
import './App.css';
import { Container } from '@mui/material';
import { useSelector } from 'react-redux';

function App() {
  const navigate = useNavigate();
  const token = Cookies.get('token');
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  // const [currentUser, setCurrentUser] = useState({});
  // var currentUser = {
  //   user: {
  //     userType: 'Employee',
  //   },
  // };
  var currentUser;

  const currentAuth = useSelector(
    (storeState) => storeState.auth.isAuthenticated
  );
  // const currentUser = useSelector((storeState) => storeState.auth.user);
  // console.log(currentUser)

  async function fetchUser() {
    setIsLoading(true);
    const res = await fetch(`${process.env.REACT_APP_API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      const user = await res.json();
      currentUser = user;
      dispatch(setUser(user));
    }
    setIsLoading(false);
  }

  useEffect(() => {
    // var currentUser = {};
    if (!currentUser || currentAuth) {
      fetchUser();
    } else {
      setIsLoading(false);
    }
    // fetchUser();
    console.log('ran');
    // navigate(0);
  }, [currentUser, currentAuth]);

  if (isLoading) {
    return <p>Loading ...</p>;
  }
  // console.log(currentUser);

  return (
    <>
      <AppBar />
      {/* <Outlet context={[currentUser]} /> */}
      <Outlet />
    </>
  );
}

export default App;
