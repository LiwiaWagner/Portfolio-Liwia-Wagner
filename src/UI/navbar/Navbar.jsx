import React from 'react'
import { NavLink } from 'react-router-dom'
import './navbar.css'


const Navbar = () => {
    return (
       <nav>
            <div className="container nav__container">
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/about'>About</NavLink>
            </div>
       </nav>
    )
}

export default Navbar