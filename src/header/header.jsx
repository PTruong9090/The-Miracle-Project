import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import logo from '../assets/miracle-project-logo.png'
import './header.css';
import './nav-buttons.css';


function Header(){
    return (
        <div className='header-container'>
            <header>
                <div className='logo-container'>
                    <img src={logo} alt='Logo' className='logo' />
                </div>
                <nav>
                    <Link to='/upload' className="nav-link">Upload</Link>
                </nav>
            </header>
        </div>
    );
}
export default Header