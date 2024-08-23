import React from 'react'
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  const loginItem = localStorage.getItem("login");
  return (
    <>
      {loginItem && <Header/>}
      <Outlet/>
    </>
  )
}

export default RootLayout;