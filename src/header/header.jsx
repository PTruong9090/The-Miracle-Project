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
                    <Link to='/'>
                        <img src={logo} alt='Logo' className='logo' />
                    </Link>
                </div>
                <nav>
                    <Link to='/class' className="nav-link">Create Class</Link>
                    <Link to='/upload' className="nav-link">Upload</Link>
                </nav>
            </header>
        </div>
    );
}
export default Header