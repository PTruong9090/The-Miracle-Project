import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { allclasses } from '../assets/sample_classes';
import YouTubeVideo from './youtube_vid';

function Roadmap(){
    const params= useParams();
    const classData = allclasses[params.classID]
    const videoUrl = classData.material_list[0]
    return(
        <div>
            <h1>{classData.classname}</h1>
            <h2>{classData.instructor}</h2>
            <h1>My YouTube Video</h1>
            <YouTubeVideo url={videoUrl} />
        </div>
    );
}
export default Roadmap


