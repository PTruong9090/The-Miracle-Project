import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { allclasses } from '../assets/sample_classes';
import YouTubeVideo from './youtube_vid';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import './roadmap.css'


function Roadmap(){
    const [courses, setCourses] = useState([]);
    const params= useParams();
    
    const [videoUrl, setVideoUrl] = useState(classData.material_list[0])

    const [modal, setModal] = useState(false)

    function toggleModal(index){
        console.log("open")
        setModal(!modal)
        setVideoUrl(classData.material_list[index])
    }

    const StringTable = ({ list }) => {
        return (
            <div className="table-container">
                {modal && (<div className="modal">
                    <div className="overlay">
                        
                    </div>
                    <div className="modal-content">
                        <button className = 'close-modal'
                        onClick={() => toggleModal(0)}>Close</button>
                        <YouTubeVideo url={videoUrl} />
                    </div>
                </div>)}
                <table className="centered-table">
                    <tbody>
                        {list.map((item, index) => (
                            <tr key={index}>
                                <td onClick = {() => toggleModal(index)}><OndemandVideoIcon /></td>
                                <td onClick = {() => toggleModal(index)}>{item}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    return(
        <div>
            <div className= "classinfo"> 
                <h1>{classData.classname}</h1>
                <h2>{classData.instructor}</h2>
            </div>
            <StringTable list={classData.material_list} />
            
        </div>
    );
}
export default Roadmap


