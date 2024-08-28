import styles from "../styles/LoginCard.module.css";
import Button from './Button';
import Label from "./Label";
import { useContext, useState } from 'react';
import { Authorizer } from '../Context/AuthContext';
import Input from './Input';
import { ToastSucces, ToastFailure } from "../Services/ToastService";
import { Link } from 'react-router-dom';

const LoginCard = () => {

  const { setLogin } = useContext(Authorizer);
  const [errors, setErrors] = useState({
    email: "",
    password: ""
  })

  function handleSubmit(e) {
    e.preventDefault();

    const loginCredentials = localStorage.getItem("user");
    const {email,password} = JSON.parse(loginCredentials);

    const formElements = e.target.elements;
    const user = {};
    
    for (let index = 0; index < formElements.length-1; index++) {
      const element = formElements[index];
      if (element.name) {
        user[element.name] = element.value;
      }
    }

    if (user.email === email && user.password === password) {
      setLogin(true);
      ToastSucces("Login Successful");
    } else {
      ToastFailure("Login Failed");
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    if (value == "") {
      setErrors({
        ...errors,
        [name]: `${name} is required`
      })
    } 
  }

  return (
    <div className={styles.loginCard}>
      <div className={styles.heading}>
        <h3>Login </h3>
        <p>by entering Email and Password</p>
      </div>
      <form className={styles.inputDiv} onSubmit={handleSubmit}>
        <Label htmlFor="email" text="Email"/>
        <Input type="email" name="email" id="email" placeholder="Enter your email here" onChange={handleChange} />
        <Label htmlFor="password" text="Password"/>
        <Input type="password" name="password" id="pass" placeholder='Enter your password here' onChange={handleChange} />

        <div className={styles.signupDiv}>
          <h5>Don't have an account</h5>
          <Link to="/signup" className={styles.linkToSignup}>SignUp</Link>
        </div>
        <div className={styles.btnLoginDiv}>
          <Button type="submit" category="Login" />
        </div>
      </form>
    </div>
  )
}

export default LoginCard;