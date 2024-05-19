import { useRef, useState } from 'react';
import axios from "axios";
import './classPage.css';

function ClassPage() {
    // State variable
    const [className, setClassName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);

    const fileInputRef = useRef(null);

    const handleChangeClassName = (event) => {
        setClassName(event.target.value);
    }

    const handleChangeFirstName = (event) => {
        setFirstName(event.target.value);
    }

    const handleChangeLastName = (event) => {
        setLastName(event.target.value);
    }

    const handleChangeDescription = (event) => {
        setDescription(event.target.value);
    }

    const handleChangeImage = (event) => {
        setImage(event.target.files[0]);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('className', className);
        formData.append('first', firstName);
        formData.append('last', lastName);
        formData.append('description', description);
        formData.append('image', image);

        try {
            const response = await axios.post('http://localhost:8080/c', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data); // Handle the response data as needed

            // Reset the form fields
            setClassName('');
            setFirstName('');
            setLastName('');
            setDescription('');
            setImage(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }

        } catch (error) {
            console.error('There was an error submitting the form!', error);
        }
    }

    return (
        <main>
            <form id='classForm' onSubmit={handleSubmit}>
                <div className='class-create-container'>
                    <div className='header-container'>Create Class</div>
                    <div className='className-container'>
                        <label htmlFor='className'>Class Name</label>
                        <input 
                            type = 'text'
                            id = 'className'
                            value = {className}
                            onChange = {handleChangeClassName}
                        />
                    </div>
                    <div className='name-container'>
                        <div className='first-name-container'>
                            <label htmlFor='firstName'>First Name</label>
                            <input 
                                type = 'text'
                                id = 'firstName'
                                value = {firstName}
                                onChange = {handleChangeFirstName}
                            />
                        </div>
                        <div className='last-name-container'>
                            <label htmlFor='lastName'>Last Name</label>
                            <input 
                                type = 'text'
                                id = 'lastName'
                                value = {lastName}
                                onChange = {handleChangeLastName}
                            />
                        </div>
                    </div>
                    <div className='description-container'>
                        <label htmlFor='description'>Description</label>
                        <input 
                            type = 'text'
                            id = 'description'
                            value = {description}
                            onChange = {handleChangeDescription}
                        />
                    </div>
                    <div className='image-container'>
                        <label htmlFor='image'>Upload Course Image:</label>
                            <input 
                                type = 'file'
                                id = 'image'
                                ref={fileInputRef}
                                onChange = {handleChangeImage}
                            />
                    </div>
                    <button>Submit</button>
                </div>
            </form>
        </main>
    )
}

export default ClassPage;