const express = require('express');
const router = express.Router();
const {Class, ClassResource, Teacher, File} = require('../models');
const sequelize = require('sequelize');
const multer = require('multer');

/*
This will be all the material associated with a class
*/

const storage = multer.diskStorage({
    destination: function (reg, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage })

// Route to handle file uploads
router.post('/upload/:classId', upload.array('files'), async (req, res) => {
    try {

        //  Get data from data sent
        const { classId } = req.params;
        const { title, description } = req.body;
        const files = req.files;    // Array of uploaded files

        // Get class data
        const course = await Class.findByPk(classId);
        if (!course) {
            return res.status(404).json({ success: false, message: "Class not found" });
        }

        // Create class resource
        const classResource = await classResource.create({
            title,
            description,
            classId: classId
        });

        // Iterate over each file and create File record
        const createdFiles = [];
        for (const file of files) {
            const fileType = await FileType.fromFile(file.path);
            const fileRecord = File.create({
                url: file.path,
                type: fileType.ext,
                classResourceId: classResource.id
            });
            createdFiles.push(fileRecord);
        }
        
        res.status(201).json({
            success: true, 
            message: "File uploaded successfully", 
            data: { classResourcee, files: createdFiles}});

    } catch (error) {
        console.error("Error uploading files:", error)
        res.status(500).json({success: false, message: "Internal server error"});
    }
})

// Fetch each resource associated to the class with its associated files
router.get('/:classId/resources', async (req, res) => {
    try {
        const { classId } = req.params;

        const resources = await ClassResource.findAll({
            where: { ClassId: classId},
            include: [File]
        });

        res.status(200).json(resources);
    
    } catch (error) {
        console.error("Error fetching resources:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
})

module.exports = router;