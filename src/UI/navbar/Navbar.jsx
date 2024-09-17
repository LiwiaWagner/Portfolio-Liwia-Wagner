import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { MdMenu } from 'react-icons/md'
import { MdClose } from "react-icons/md"
import './navbar.css'
// import { links } from '../data'


const Navbar = () => {
    const [isNavShowing, setIsNavShowing] = useState(false);

    return (
       <nav>
            <div className='nav__container'>
                <Link to='/' className='nav__left__container'>
                    <div>LIWIA WAGNER</div>
                </Link>
                <ul className={`nav__right__container ${isNavShowing ? 'show__nav' : 'hide__nav'}`}>
                    <li className='nav__link'>
                        <NavLink to='/'>HOME</NavLink>
                    </li>
                    <li className='nav__link'>
                        PORTFOLIO
                    </li>
                    <li className='nav__link'>
                        <NavLink to='/about'>ABOUT</NavLink>
                    </li>
                    <li className='nav__link'>
                        RESUME
                    </li>
                    {/* <li className={`${({isActive}) => isActive ? '.nav__link.active' : ''} ${'nav__link'}`}>
                        <NavLink to='/'>HOME</NavLink>
                    </li>
                    <li className={`${({isActive}) => isActive ? '.nav__link.active' : ''} ${'nav__link'}`}>
                        PORTFOLIO
                    </li>
                    <li className={`${({isActive}) => isActive ? '.nav__link.active' : ''} ${'nav__link'}`}>
                        <NavLink to='/about'>ABOUT</NavLink>
                    </li>
                    <li className={`${({isActive}) => isActive ? '.nav__link.active' : ''} ${'nav__link'}`}>
                        RESUME
                    </li> */}
                </ul>
                {/* <ul className='nav__right_container'>
                    {
                        links.map(({name, path}, index) => {
                            return (
                                <li key={index}>
                                    <NavLink to={path}>{name}</NavLink>
                                </li>
                            )
                        })
                    }
                </ul> */}
                <button className='nav__toggle__btn' onClick={() => setIsNavShowing(!isNavShowing)}>
                    {
                        isNavShowing ? <MdMenu /> : <MdClose />
                    }
                </button>
            </div>
       </nav>
    )
}

export default Navbar