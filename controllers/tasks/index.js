const { verifyTaskScema, isIdPresentInTasks } = require('./utils');
const { handleResponse } = require('../../utils/responseHandler');

const getTaskList = (req, res) => {
  console.log('GET: Home route hit');
  const returnObj = {
    length: tasks.length,
    tasks,
  };
  return handleResponse(
    res,
    returnObj,
    'Task list retreived successfully',
    200
  );
};

const getTaskById = (req, res) => {
  try {
    if (!isIdPresentInTasks(req.id)) {
      return handleResponse(res, {}, 'Task id not found', 404);
    }
    for (let ind = 0; ind < tasks.length; ++ind) {
      if (tasks[ind].id === req.id) {
        return handleResponse(
          res,
          { ...tasks[ind] },
          'Task retreived successfully',
          200
        );
      }
    }
    return 1; // unreachable
  } catch (error) {
    return handleResponse(res, {}, 'Internal Server Error', 500);
  }
};

const createTask = (req, res) => {
  console.log('POST: Home route hit');
  try {
    req.body = {};
    req.on('data', (chunk) => {
      req.body = { ...req.body, ...JSON.parse(chunk) };
    });

    req.on('end', () => {
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
      return handleResponse(res, { ...task }, 'Task created successfully', 201);
    });
    return 1; // non reachable
  } catch (error) {
    return handleResponse(res, {}, 'Internal Server Error', 500);
  }
};

const updateTask = (req, res) => {
  try {
    console.log('PUT request hit');
    const { id } = req;
    req.body = {};
    req.on('data', (chunk) => {
      req.body = { ...req.body, ...JSON.parse(chunk) };
    });
    req.on('end', () => {
      const { ...toUpdate } = req.body;
      if (!isIdPresentInTasks(id)) {
        return handleResponse(res, {}, 'Task id not found', 404);
      }
      for (let ind = 0; ind < tasks.length; ++ind) {
        if (tasks[ind].id === id) {
          Object.keys(toUpdate).forEach((key) => {
            tasks[ind][key] = toUpdate[key];
          });
          return handleResponse(
            res,
            {
              updatedCount: 1,
              updatedTask: tasks[ind],
            },
            'Task updated successfully',
            201
          );
        }
      }
      return 1; // unreachable
    });
    return 1; // non reachable
  } catch (error) {
    return handleResponse(res, {}, 'Internal Server Error', 500);
  }
};

const deleteTask = (req, res) => {
  req.body = {};
  const { id } = req;
  req.on('data', (chunk) => {
    req.body = { ...req.body, ...JSON.parse(chunk) };
  }); // on data event has to handled even when no data is sent
  req.on('end', () => {
    if (!isIdPresentInTasks(id)) {
      return handleResponse(res, {}, 'Task id not found', 404);
    }
    for (let ind = 0; ind < tasks.length; ++ind) {
      if (tasks[ind].id === id) {
        tasks.splice(ind, 1);
        return handleResponse(
          res,
          {
            deletedCount: 1,
          },
          'Task deleted successfully',
          201
        );
      }
    }
    return 1;
  });
  return 1; // non reachable
};

module.exports = {
  getTaskList,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
