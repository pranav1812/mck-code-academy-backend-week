const verifyTaskScema = (taskObj) => {
  const { name } = taskObj;
  if (typeof name === 'string') return true;
  return false;
};

const isIdPresentInTasks = (id) => tasks.some((task) => task.id === id);

module.exports = {
  verifyTaskScema,
  isIdPresentInTasks,
};
