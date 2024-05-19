import React, { useState, useEffect } from 'react';
import ClassItem from './classitem';
import "./home.css"
import { useNavigate } from 'react-router-dom';
import MicIcon from '@mui/icons-material/Mic';
import { run } from '../gemini/gemini-test.cjs';
import { allclasses } from '../assets/sample_classes';

function Home(){
    
    const navigateTo = useNavigate();

    const handleClick = (index) => {
        navigateTo(`/roadmap/${index}`)
    };
    const strippedString = inputString => inputString.replace(/[^a-zA-Z]/g, '');
    function searchFirstClassByClassnameIndex(classes, searchTerm) {
        return classes.findIndex(cls => strippedString(cls.classname).toLowerCase().includes(searchTerm.toLowerCase()));
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
                const firstMatchingIndex = searchFirstClassByClassnameIndex(allclasses, data)
                handleClick(firstMatchingIndex)
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
                        allclasses.map((classitem, index) => (
                            <div key={index} onClick={() => handleClick(index)}>
                                <ClassItem
                                    classname={classitem.classname}
                                    instructor={classitem.instructor}
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