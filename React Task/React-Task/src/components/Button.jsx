import React from 'react'
import styles from "../styles/Button.module.css"

const Button = ({type,category,...props}) => {
  return (
    <div className={styles.btnDiv}>
        <button type={type} {...props}>{category}</button>
    </div>
  )
}

export default Button; 