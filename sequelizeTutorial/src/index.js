const express= require('express');
const cors= require('cors');

const {
    tasksRouter,
} = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/tasks', tasksRouter);

app.listen(8000, () => {
    console.log('Server on port 8000');
});
