const {
    getTaskService,
    createTaskService,
    updateTaskService,
    deleteTaskService,
}= require('../services/tasks.services');


const getTasks= async(req, res) => {
    try {
        const tasks= await getTaskService(Number(req.params.id));
        return res.status(200).json({
            message: 'Tasks fetched successfully',
            data: tasks,
        })
    } catch (error) {
        return res.status(500).json({
            message: `Internal Server Error: ${error.message}`,
        })
    }
}

const createTask= async(req, res) => {
    try {
        const { title }= req.body.task;
        if (!title) {
            return res.status(400).json({
                message: 'Title is required',
            })
        }
        const task= await createTaskService(title);
        return res.status(201).json({
            message: 'Task created successfully',
            data: task,
        })
    } catch (error) {
        return res.status(500).json({
            message: `Internal Server Error: ${error.message}`,
        })
    }
}

const updateTask= async(req, res) => {
    try {
        const { id }= req.params;
        if (!id) {
            return res.status(400).json({
                message: 'Id is required',
            })
        }
        const { ...updateBody }= req.body;
        const task= await updateTaskService(id, updateBody);
        return res.status(200).json({
            message: 'Task updated successfully',
            data: task,
        })
    } catch (error) {
        return res.status(500).json({
            message: `Internal Server Error: ${error.message}`,
        })
    }
}

const deleteTask= async(req, res) => {
    try {
        const { id }= req.params;
        if (!id) {
            return res.status(400).json({
                message: 'Id is required',
            })
        }
        const task= await deleteTaskService(id);
        return res.status(200).json({
            message: 'Task deleted successfully',
            data: task,
        })
    } catch (error) {
        return res.status(500).json({
            message: `Internal Server Error: ${error.message}`,
        })
    }
}


module.exports= {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
}