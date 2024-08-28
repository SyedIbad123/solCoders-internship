import React from 'react'
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';
import { useContext} from 'react';
import { Authorizer } from '../Context/AuthContext';

const RootLayout = () => {

  const {login} = useContext(Authorizer);

  return (
    <>
    
      {login && <Header />}
      <Outlet/>

    </>
  )
}

export default RootLayout; 