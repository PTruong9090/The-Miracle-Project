import React, { useState, useEffect } from 'react';
import ClassItem from './classitem';
import "./home.css"
import { useNavigate } from 'react-router-dom';


function Home(){
    const allclasses = [{
        "classname": "Theatre",
        "instructor": "John Doe",
        "description": "Explore the dynamic world of performance in our theatre class, where you'll develop acting skills, stage presence, and creative expression. Whether you're a novice or an experienced performer, this class offers a supportive environment to unleash your inner thespian and collaborate on compelling productions."
    },
    {
        "classname": "Classical Music",
        "instructor": "Mary Park",
        "description": "Immerse yourself in the rich heritage of classical music, exploring the works of legendary composers while honing your performance and interpretive skills. This class offers an engaging and supportive environment for musicians of all levels to deepen their understanding and appreciation of classical music traditions."
    },
    {
        "classname": "Classical Music",
        "instructor": "Mary Park",
        "description": "Immerse yourself in the rich heritage of classical music, exploring the works of legendary composers while honing your performance and interpretive skills. This class offers an engaging and supportive environment for musicians of all levels to deepen their understanding and appreciation of classical music traditions."
    }
    ]
    
    const navigateTo = useNavigate();

    const handleClick = (index) => {
        navigateTo(`/roadmap/${index}`)
    };

    return (
        <div className='classes'>
            <h1> ⭐️ Classes! ⭐️ </h1>
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