import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Roadmap(){
    const params= useParams();

    return(
        <div>
            <h1>roadmap</h1>
            <p>Class ID: {params.classID}</p>
        </div>
    );
}
export default Roadmap