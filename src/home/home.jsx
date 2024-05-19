import React, { useState, useEffect } from 'react';
import ClassItem from './classitem';
import "./home.css"
import { useNavigate } from 'react-router-dom';
import MicIcon from '@mui/icons-material/Mic';
import { run } from '../gemini/gemini-test.cjs';
import { allclasses } from '../assets/sample_classes';
import axios from "axios";

function Home(){
    const [courses, setCourses] = useState([]);
    
    const navigateTo = useNavigate();

    const handleClick = (index) => {
        navigateTo(`/roadmap/${index}`)
    };
    
    const strippedString = inputString => inputString.replace(/[^a-zA-Z0-9]/g, '');
    function searchFirstClassByClassnameIndex(classes, searchTerm) {
        return classes.findIndex(cls => strippedString(cls.className).toLowerCase().includes(searchTerm.toLowerCase()));
    }

    const handleSpeak = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
        const recognition = new SpeechRecognition();
        console.log("here")
        recognition.onresult = async function(event) {
            const transcript = event.results[0][0].transcript;
            console.log('transcript', transcript)
            
            try {
                console.log("using chat")
                const data = await run(transcript);
                console.log("chatgpt: ", data);
                const firstMatchingIndex = searchFirstClassByClassnameIndex(courses, data)
                handleClick(courses[firstMatchingIndex].id)
            } catch (error) {
                console.error("Error loading data: ", error);
            }
        };
        recognition.start()
    }

    const [modal, setModal] = useState(true)

    function toggleModal(){
        setModal(!modal)
    }

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await axios.get('http://localhost:8080/c')
                setCourses(response.data);
            } catch (error) {
                console.error('Error fetching class names: ', error);
            }
        };
        fetchClasses();
    }, []);
    console.log(courses)

    return (
        <div className='classes'>
            
            {modal && <div className="modal">
                <div className="overlay">
                    
                </div>
                <div className="modal-content">
                    <h2>Hello Student! Tell us which class you would like to visit!</h2>
                    <MicIcon className= "svg_icons_modal" onClick={handleSpeak} />
                    <button className = 'close-modal'
                    onClick={toggleModal}>Close</button>
                </div>
            </div>}
            
            <h1> ⭐️ Classes! ⭐️ </h1>
            
            <div className= "intro">
                <h2>Click microphone and tell us which class you want to see! </h2>
                <MicIcon className="svg_icons" onClick={handleSpeak} />
            </div>
            
            <div className='classes__container'>
                <div className='classes__wrapper'>
                    <ul className='classes__items'>
                        {
                        courses.map((classitem, index) => (
                            <div key={classitem.id} onClick={() => handleClick(classitem.id)}>
                                <ClassItem
                                    src={classitem.image}
                                    classname={classitem.className}
                                    instructor={classitem.teacherName}
                                    description={classitem.description}
                                />
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Home