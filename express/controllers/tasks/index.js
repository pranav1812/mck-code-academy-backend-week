const { handleResponse } = require('../../utils/responseHandler');

const { verifyTaskScema, isIdPresentInTasks } = require('./utils');

const getTasks = (req, res) => {
  try {
    console.log(`Get route hit: ${req.url}`);
    const { id } = req.params;
    if (!id) {
      const returnObj = {
        length: tasks.length,
        tasks,
      };
      return handleResponse(
        res,
        200,
        returnObj,
        'Tasks fetched successfully',
        null
      );
    }
    if (!isIdPresentInTasks(id)) {
      return handleResponse(res, 404, {}, null, 'Task id not found');
    }
    for (let ind = 0; ind < tasks.length; ++ind) {
      if (tasks[ind].id === id) {
        return handleResponse(
          res,
          200,
          { ...tasks[ind] },
          'Task retreived successfully',
          null
        );
      }
    }
  } catch (error) {
    return handleResponse(
      res,
      500,
      {},
      null,
      `Internal Server Error: ${error.message}`
    );
  }
};

const createTask = (req, res) => {
  console.log('POST: Home route hit');
  try {
    let { task } = req.body;
    const schemaVerification = verifyTaskScema(task);
    if (!schemaVerification) {
      return handleResponse(res, {}, 'Invalid Schema', 400);
    }
    task = {
      ...task,
      isCompleted: false,
      id: Math.floor(Math.random() * 100000000).toString(),
    };
    tasks.push(task);
    return handleResponse(
      res,
      201,
      { ...task },
      'Task created successfully',
      null
    );
  } catch (error) {
    return handleResponse(
      res,
      500,
      {},
      null,
      `Internal Server Error: ${error.message}`
    );
  }
};

const updateTask = (req, res) => {
  try {
    console.log('PUT request hit');
    const { id } = req.params;

    const { ...toUpdate } = req.body;
    if (!isIdPresentInTasks(id)) {
      return handleResponse(res, 404, {}, null, 'Task id not found');
    }
    for (let ind = 0; ind < tasks.length; ++ind) {
      if (tasks[ind].id === id) {
        Object.keys(toUpdate).forEach((key) => {
          tasks[ind][key] = toUpdate[key];
        });
        return handleResponse(
          res,
          200,
          {
            updatedCount: 1,
            updatedTask: tasks[ind],
          },
          'Task updated successfully',
          null
        );
      }
    }
    return 1; // unreachable
  } catch (error) {
    return handleResponse(
      res,
      500,
      {},
      null,
      `Internal Server Error: ${error.message}`
    );
  }
};

const deleteTask = (req, res) => {
  try {
    const { id } = req.params;
    if (!isIdPresentInTasks(id)) {
      return handleResponse(res, 404, {}, null, 'Task id not found');
    }
    for (let ind = 0; ind < tasks.length; ++ind) {
      if (tasks[ind].id === id) {
        tasks.splice(ind, 1);
        return handleResponse(
          res,
          200,
          {
            deletedCount: 1,
          },
          'Task deleted successfully',
          null
        );
      }
    }
    return 1;
  } catch (error) {
    return handleResponse(
      res,
      500,
      {},
      null,
      `Internal Server Error: ${error.message}`
    );
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
