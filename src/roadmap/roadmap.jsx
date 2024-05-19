import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import YouTubeVideo from './youtube_vid';
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
        if (type.startsWith('video')) {
            setVideoUrl(url);
            setModal(true);
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

    const StringTable = ({ list }) => {
        return (
            <div className="table-container">
                {modal && (
                    <div className="modal">
                        <div className="overlay" onClick={() => setModal(false)}></div>
                        <div className="modal-content">
                            <button className="close-modal" onClick={() => setModal(false)}>Close</button>
                            <YouTubeVideo url={videoUrl} />
                        </div>
                    </div>
                )}
                <table className="centered-table">
                    <tbody>
                        {list.map((resource, resourceIndex) => (
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
        );
    };

    return (
        <div>
            <div className="classinfo">
                <h1>{course.className}</h1>
                <h2>{course.teacherName}</h2>
            </div>
            <StringTable list={resources} />
        </div>
    );
}

export default Roadmap;
