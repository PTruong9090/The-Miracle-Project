const express = require('express');
const cors = require('cors');
const db = require('./models');
const app = express();

app.use(cors());
app.use(express.json())

app.use('/files', express.static('uploads'));

// Set up routers
const classRouter = require('./routes/class');
app.use('/c', classRouter);

const teacherRouter = require('./routes/teacher');
app.use('/t', teacherRouter);

const resourceRouter = require('./routes/classResource');
app.use('/r', resourceRouter)


// Runs server on port 8080
db.sequelize.sync().then(() => {
    app.listen(8080, ()=>{
        console.log("Server started")
    })
});