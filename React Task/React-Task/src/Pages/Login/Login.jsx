import React from 'react'
import styles from "../../styles/login.module.css"
import LoginCard from '../../components/LoginCard'

const LoginPage = () => {
  return (
    <div className={styles.mainDiv}>
      <h1 className={styles.heading}>Login to Continue</h1>
      <LoginCard />
    </div>
  );
};

export default LoginPage;