import React from 'react'
import styles from "../styles/LoginCard.module.css"
import Button from './Button'
import { useContext,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Authorizer } from '../Context/AuthContext';


const LoginCard = () => { 

  const navigate = useNavigate();
  const { handleChange, handleSubmit, login, credential } = useContext(Authorizer);

  useEffect(() => {
    if (login) {
      navigate('/home');
    }
  }, [login, navigate]);

  return (
    <div className={styles.loginCard}>
      <div className={styles.heading}>
        <h3>Login </h3>
        <p>by entering Email and Password</p>
      </div>
      <form className={styles.inputDiv} onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type="email" name='email' id='email'  placeholder='Enter your email here' value={credential.email}  onChange={handleChange} />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="pass" placeholder='Enter your password here' value={credential.password}  onChange={handleChange}/>
        <Button type="submit"  category="Login"/>
      </form>
    </div>
  )
}

export default LoginCard;