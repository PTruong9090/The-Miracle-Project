import React, { useState, useEffect, Navigate } from 'react'; 
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate} from 'react-router-dom';

import Home from './home/home'
import Header from './header/header';
import Roadmap from './roadmap/roadmap';

export default function App() {  
    return (
        
        <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/roadmap/:classID" element={<Roadmap />} />
                    <Route path="*" element={<Navigate to="/"/>} />
                </Routes>
        </Router>

    );
  }
