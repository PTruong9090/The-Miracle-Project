const express = require('express');
const router = express.Router();
const { Class, ClassResource, File } = require('../models');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post('/', upload.array('files'), async (req, res) => {
    try {
        const { classId, title, description } = req.body;
        const files = req.files;

        const course = await Class.findByPk(classId);
        if (!course) {
            return res.status(404).json({ success: false, message: "Class not found" });
        }

        const resource = await ClassResource.create({
            title,
            description,
            ClassId: classId
        });

        const createdFiles = [];
        for (const file of files) {
            const fileRecord = await File.create({
                url: `/files/${file.filename}`, // Prefix the path with /files/
                type: file.mimetype,
                ClassResourceId: resource.id
            });
            createdFiles.push(fileRecord);
        }

        res.status(201).json({
            success: true,
            message: "Files uploaded successfully",
            data: { resource, files: createdFiles }
        });
    } catch (error) {
        console.error("Error uploading files:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

router.get('/:classId', async (req, res) => {
    try {
        const { classId } = req.params;

        const resources = await ClassResource.findAll({
            where: { ClassId: classId },
            include: [File]
        });

        res.status(200).json(resources);
    } catch (error) {
        console.error("Error fetching resources:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

module.exports = router;
