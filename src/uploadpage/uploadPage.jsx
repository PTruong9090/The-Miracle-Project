import React, { useEffect, useState } from "react";
import './uploadPage.css';
import axios from "axios";

function UploadPage() {
    // State variables
    const [title, setTitle] = useState('');
    const [teacherName, setTeacherName] = useState('');
    const [files, setFiles] = useState([]);
    const [courses, setCourses] = useState([])

    // Handle input changes
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }

    const handleTeacherNameChange = (event) => {
        setTeacherName(event.target.value);
    }

    const handleFilesChange = (event) => {
        // Append newly selected files to the existing files array
        setFiles(prevFiles => [...prevFiles, ...Array.from(event.target.files)]);
    }

    // Handle file deletion
    const handleDeleteFile = (index) => {
        const updatedFiles = [...files];
        updatedFiles.splice(index, 1);
        setFiles(updatedFiles);
    }

    // Get class information
    useEffect(() => {
        const fetchClassNames = async () => {
            try {
                const response = await axios.get('/c')
                setCourses(response.data);
            } catch (error) {
                console.error('Error fetching class names: ', error);
            }
        }
    })

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <main>
            <form id='uploadForm' onSubmit={handleSubmit}>
                <div className='resource-upload-container'>
                    <div className='header-container'>Assignment</div>
                    <div className='body-container'>
                        <div className='information-container'>
                            <label htmlFor='title'>Assignment Name:</label>
                            <input 
                                type = 'text'
                                id = 'title'
                                value = {title}
                                onChange = {handleTitleChange}
                            />
                            <label htmlFor="teacherName">Teacher Name:</label>
                            <input
                                type = 'text'
                                id = 'teacherName'
                                value = {teacherName}
                                onChange = {handleTeacherNameChange}
                            />
                            <label htmlFor="fileUpload">Upload Files:</label>
                            <input
                                type = 'file'
                                id = 'fileUpload'
                                multiple
                                onChange={handleFilesChange}
                            />
                            <div className="uploaded-files-container">
                            {files.map((file, index) => (
                                <div key={index} className="uploaded-file">
                                    <span>{file.name}</span>
                                    <button onClick={() => handleDeleteFile(index)}>Delete</button>
                                </div>
                            ))}
                        </div>
                        </div>
                        <div className='courses-container'>
                            <select id='course-dropdown'>
                                <option value="">Select a course</option>
                                {courses.map((course) => (
                                    <option key={course.id} value={course.id}>{course.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <button type='submit'>Submit</button>
                </div>
            </form>
        </main>
    )
}

export default UploadPage;