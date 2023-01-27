const http = require('http');

const {
  getTaskList,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require('./controllers/tasks');

const handleResponse = (res, data, message, code) => {
  res.writeHead(code, { 'Content-Type': 'text/json' });
  res.end(
    JSON.stringify({
      data,
      message,
    })
  );
};

global.tasks = [];

const server = http.createServer(async (req, res) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  if (req.url === '/tasks') {
    switch (req.method) {
      case 'POST': {
        return createTask(req, res);
      }
      case 'GET': {
        return getTaskList(req, res);
      }
      default: {
        // return handleResponse(res, {}, 'Route not found', 404);
        return handleResponse(res, {}, 'Method not allowed', 405);
      }
    }
  } else if (req.url.match(/\/tasks\/[a-zA-Z0-9]+/)) {
    const id = req.url.split('/')[2];
    switch (req.method) {
      case 'GET': {
        req.id = id;
        return getTaskById(req, res);
      }
      case 'PUT': {
        req.id = id;
        return updateTask(req, res);
      }
      case 'DELETE': {
        req.id = id;
        return deleteTask(req, res);
      }
      default: {
        return handleResponse(res, {}, 'Method not allowed', 405);
      }
    }
  }
  return true;
});

const PORT = 8000;
server.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
