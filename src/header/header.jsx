import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import logo from '../assets/miracle-project-logo.png'
import './header.css';
import './nav-buttons.css';
import AppleIcon from '@mui/icons-material/Apple';


function Header(){
    const [valid, setValid] = useState(false)
    const [modal, setModal] = useState(false)
    const [inputPin, setInputPin] = useState('');
    const [message, setMessage] = useState('');
    const correctPin = "Password123"

    function handleRequest(){
        setModal(!modal)
    }

    const handleChange = (event) => {
        setInputPin(event.target.value);
    };

    const handleCheck = () => {
        if (inputPin !== correctPin) {
            setMessage('Incorrect PIN');
        } 
        else{
            setValid(true)
            setModal(!modal)
        }
    };
    return (
        <div className='header-container'>
            <header>
                {modal && <div className="modal">
                    <div className="overlay">
                        
                    </div>
                    <div className="modal-content">
                        <h2>Teacher Authorization</h2>
                        <AppleIcon />
                        <input
                            type="password"
                            value={inputPin}
                            onChange={handleChange}
                            placeholder="Enter PIN"
                            className="pin-input"
                        />
                        <button onClick={handleCheck} className="check-button">Check PIN</button>
                        <p className="message">{message}</p>
                        <button className = 'close-modal' onClick={handleRequest}>Close</button>
                    </div>
                </div>}
                <div className='logo-container'>
                    <img src={logo} alt='Logo' className='logo' />
                </div>
                {!valid && <AppleIcon onClick={handleRequest}/>}
                {valid && (<nav>
                    <Link to='/class' className="nav-link">Create Class</Link>
                    <Link to='/upload' className="nav-link">Upload</Link>
                </nav>)}
            </header>
        </div>
    );
}
export default Header