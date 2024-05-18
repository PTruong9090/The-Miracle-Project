import React, { useState, useEffect, Navigate } from 'react'; 
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate} from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import Home from './home/home'

export default function App() {  
    return (
      <Router>
        <Home />
      </Router>
    );
  }
