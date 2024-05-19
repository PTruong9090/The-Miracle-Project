import React, { useState, useEffect } from 'react';
import theatreImage from '../assets/theatre.jpg';
import './classitem.css'

function ClassItem(props){

    return (
        <>
            <div className='cards__item__link'>
                <div className='classimage'>
                    <img className='cards__item__img' src={theatreImage}/>
                </div>
                <div className='cards__item__caption'>
                    {/* card caption */}
                    <h2 className='cards__classname'>{props.classname}</h2>
                    <h4 className='cards__instructor'>Instructor: {props.instructor}</h4>
                    <h4 className='cards__description'>Description: {props.description}</h4>
                </div>
            </div>
        
        </>
    );
}

export default ClassItem