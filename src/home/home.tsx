import React, { useState, useEffect } from 'react';
import ClassItem from './classitem';
import "./home.css"
import { useNavigate } from 'react-router-dom';
import MicIcon from '@mui/icons-material/Mic';
import { run } from '../gemini/gemini-test.cjs';
import { allclasses } from '../assets/sample_classes';

function Home(){
    
    const [text, setText] = useState("");
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
            setText(transcript)
        };
        recognition.start()
    }

    return (
        <div className='classes'>
            <h1> ⭐️ Classes! ⭐️ </h1>
            <MicIcon onClick={handleSpeak} />
            <p>{text}</p>
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