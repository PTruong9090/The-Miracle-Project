const express = require('express');
const router = express.Router();
const {Class, ClassResource, Teacher} = require('../models');

router.get('/', async(req, res) => {
    try {
        const teacher = await teachers.findOne({ where: {first: req.body.first, last: req.body.last}})
        res.json(teacher);

    } catch (error) {
        console.error(error);
        res.status(500).json({"error": "Internal server error"});
    }
})

module.exports = router;