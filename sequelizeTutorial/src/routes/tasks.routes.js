const express= require('express');

const {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
}= require('../controllers/tasks.controllers');

const router = express.Router();

// router.get('/', );

// router.post('/', );

// router.
router.get('/', getTasks);

router.post('/', createTask);

router.get('/:id', getTasks);

router.put('/:id', updateTask);

router.delete('/:id', deleteTask);

module.exports= router;