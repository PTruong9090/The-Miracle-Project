import React, { useState, useEffect, Navigate } from 'react'; 
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate} from 'react-router-dom';

import Home from './home/home'
import Header from './header/header';
import Roadmap from './roadmap/roadmap';
import UploadPage from './uploadpage/uploadPage';
import ClassPage from './classpage/classPage';

export default function App() {  
    return (
        <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/class" element={<ClassPage/>} />
                    <Route path="/upload" element={<UploadPage/>} />
                    <Route path="/roadmap/:classID" element={<Roadmap />} />
                    
                </Routes>
        </Router>

    );
  }
