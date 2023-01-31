const { Tasks } = require('../models');

const getTaskService= async(id= null) => {
    try {
        if (!id) {
            const tasks= await Tasks.findAll();
            return tasks;
        }
        const task= await Tasks.findOne({
            where: {
                id,
            },
        });
        return task;
    } catch (error) {
        throw new Error(`Services Error: ${error.message}`);
    }
}

const createTaskService= async(title) => {
    try {
        const task= await Tasks.create({
            title,
            isComplete: false,
        });
        return task;
    } catch (error) {
        throw new Error(`Services Error: ${error.message}`);
    }
}

const updateTaskService= async(id, updateBody) => {
    try {
        const task= await Tasks.update(updateBody, {
            where: {
                id,
            },
        });
        return task;
    } catch (error) {
        throw new Error(`Services Error: ${error.message}`);
    }
}

const deleteTaskService= async(id) => {
    try {
        const task= await Tasks.destroy({
            where: {
                id,
            },
        });
        return task;
    } catch (error) {
        throw new Error(`Services Error: ${error.message}`);
    }
}

module.exports= {
    getTaskService,
    createTaskService,
    updateTaskService,
    deleteTaskService,
}