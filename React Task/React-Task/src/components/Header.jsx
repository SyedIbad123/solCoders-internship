import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from "../styles/Header.module.css"
import Logout from './Logout'

const Header = () => {
  return (
    <header className={styles.header}>
        <nav className={styles.navbar}>
            <ul className={styles.list}>
                <NavLink className={styles.listItems} to='/home'>Home</NavLink>
                <NavLink className={styles.listItems} to='/about'>About</NavLink>
                <NavLink className={styles.listItems} to='/contact'>Contact</NavLink>
                <Logout/>
            </ul>
        </nav>


    </header>
  )
}

export default Header