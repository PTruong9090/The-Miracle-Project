import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import './roadmap.css';
import axios from 'axios';

function Roadmap() {
    const [resources, setResources] = useState([]);
    const [course, setCourse] = useState({});
    const [videoUrl, setVideoUrl] = useState('');
    const params = useParams();
    const [modal, setModal] = useState(false);

    function toggleModal(url, type) {
        if (type.startsWith('video/mp4')) {
            setVideoUrl(url);
            setModal(true);
        } else if (type.startsWith('video')) {
            // If it's another type of video, open it in a new tab
            window.open(url, '_blank');
        } else {
            // Construct the full URL by prepending the backend base URL
            const fullUrl = `http://localhost:8080${url}`;
            window.open(fullUrl, '_blank'); 
        }
    }
    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/c/${params.classID}`);
                setCourse(response.data);
            } catch (error) {
                console.error('Error fetching class names: ', error);
            }
        };

        const fetchResources = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/r/${params.classID}`);
                setResources(response.data);
            } catch (error) {
                console.error('Error fetching resources: ', error);
            }
        };

        fetchClasses();
        fetchResources();
    }, [params.classID]);

    return (
        <div>
            <div className="classinfo">
                <h1>{course.className}</h1>
                <h2>{course.teacherName}</h2>
            </div>
            <div className="table-container">
                {modal && (
                    <div className="modal">
                        <div className="overlay" onClick={() => setModal(false)}></div>
                        <div className="modal-content">
                            <button className="close-modal" onClick={() => setModal(false)}>Close</button>
                            <video controls>
                                <source src={videoUrl} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                )}
                <table className="centered-table">
                    <tbody>
                        {resources.map((resource, resourceIndex) => (
                            resource.Files.map((file, fileIndex) => (
                                <tr key={`${resourceIndex}-${fileIndex}`}>
                                    <td onClick={() => toggleModal(file.url, file.type)}>
                                        {file.type.startsWith('video') ? <OndemandVideoIcon /> : '📄'}
                                    </td>
                                    <td onClick={() => toggleModal(file.url, file.type)}>{resource.title}</td>
                                </tr>
                            ))
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Roadmap;
