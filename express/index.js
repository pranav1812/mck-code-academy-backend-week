const express = require('express');
const { tasksRouter } = require('./routes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

global.tasks = [];

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Express App up and running',
  });
});

app.use('/tasks', tasksRouter);

app.listen(8000, () => console.log(`Server running on 8000`));
