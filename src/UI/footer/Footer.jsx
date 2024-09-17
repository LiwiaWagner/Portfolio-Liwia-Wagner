import React from 'react'
import './footer.css'
import { FaXTwitter } from "react-icons/fa6"
import { SiObservable } from "react-icons/si"
import { BsGithub } from "react-icons/bs"
import { SiTableau } from "react-icons/si"
import { FaLinkedinIn } from "react-icons/fa"
import { LiaCopyrightSolid } from "react-icons/lia";



const Footer = () => {
    return (
        <div className='footer__container'>
            <div className='footer__name'>
                <LiaCopyrightSolid /> <strong className='footer__name__text'>2024 Liwia Wagner</strong>
            </div>
            <div className='footer__icons'>
                <BsGithub />
                <SiTableau />
                <SiObservable />
                <FaLinkedinIn />
                <FaXTwitter />
            </div>       
        </div>
    )
}

export default Footer