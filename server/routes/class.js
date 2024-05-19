const express = require('express');
const router = express.Router();
const {Class, Teacher} = require('../models');
const sequelize = require('sequelize');
const multer = require('multer');

// Set up multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Directory where uploaded files will be stored
    },
    filename: function (req, file, cb) {
      // Generate a unique filename for the uploaded file
      cb(null, Date.now() + '-' + file.originalname);
    }
  });

// Set up multer upload middleware
const upload = multer({ storage: storage });


router.post('/', upload.single('image'), async (req, res) => {
    try {
        // Check if teacher name exists
        let teacher = await Teacher.findOne({where: {first: req.body.first, last: req.body.last}})
        if (!teacher) {
            // Create teacher
            teacher = await Teacher.create({
                first: req.body.first,
                last: req.body.last,
            })
        }

        // Create new class
        const newClass = await Class.create({
            className: req.body.className,
            description: req.body.description,
            image: req.file.filename,
            TeacherId: teacher.id
        });

        res.status(201).json({message: 'Class created successfully', data: newClass});

    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal server error"})
    }
})

// Fetch all classes with their associated teachers
router.get('/', async (req, res) => {
    try {
        const classes = await Class.findAll({
            include: {
                model: Teacher,
                attributes: ['first', 'last']
            },
            attributes: ['id', 'className']
        })
        
        const formattedClasses = classes.map(classData => ({
            id: classData.id, 
            className: classData.className,
            teacherName: `${classData.Teacher.first} ${classData.Teacher.last}`
        }));

        res.status(200).json(formattedClasses);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
})

module.exports = router;