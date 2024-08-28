import styles from "../Styles/SignUpCard.module.css";
import Input from "./Input.jsx";
import Button from "./Button.jsx";
import { Link, useNavigate } from "react-router-dom";
import Label from "./Label";
import { useState } from "react";
import {ToastSucces,ToastFailure} from "../Services/ToastService.js"


const SignUpCard = () => {

  const [errors, setErrors] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  function handleSubmit(e){
    e.preventDefault();
    const formElements = e.target.elements;
    const user = {};
    
    for (let index = 0; index < formElements.length-2; index++) {
      const element = formElements[index];
      if (element.name) {
        user[element.name] = element.value;
      }
    }

    localStorage.setItem("user",JSON.stringify(user));
    const signupItem = JSON.parse(localStorage.getItem("user"));

    if(signupItem.email !== "" && signupItem.password !== ""){
      ToastSucces("SignUp Successfull");
      navigate("/");
    }





  }


  function handleChange(e) {
    const { name, value } = e.target;
    if (value == "") {
      setErrors({
        ...errors,
        [name]: `${ name.charAt(0).toUpperCase() + name.slice(1)} is required`
      })
    } 
  }


  return (

    <div className={styles.signupCard}>
    <div className={styles.heading}>
      <h3>Sign Up </h3>
      <p>by entering Email and Password</p>
    </div>

    <form className={styles.inputDiv} onSubmit={handleSubmit}>
      <Label htmlFor="email" text="Email"/>
      <Input type="email" name="email" id="email" placeholder="Enter your email here"  onChange={handleChange} error={errors.email}/>
      <Label htmlFor="password" text="Password"/>
      <Input type="password" name="password" id="pass" placeholder='Enter your password here'  onChange={handleChange} error={errors.password}/>
      <div className={styles.rememberMeDiv}>
        <Input type="checkbox" name="rememberMe" id="rememberMe"/>
        <label htmlFor="rememberMe">Remember Me</label>
      </div>
    
      <div className={styles.loginDiv}>
         <h5>Already have an account</h5>
         <Link to="/" className={styles.linkToLogin}>LogIn</Link>
      </div>
      <div className={styles.btnDiv}>
        <Button type="submit" category="SignUp"/>
      </div>
    </form>

  </div>
  )
}

export default SignUpCard;
