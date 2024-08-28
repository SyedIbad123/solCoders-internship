import React from 'react'
import styles from "../styles/Button.module.css"

const Button = ({type,category}) => {
  return (
    <div className={styles.btnDiv}>
        <button type={type}>{category}</button>
    </div>
  )
}

export default Button;