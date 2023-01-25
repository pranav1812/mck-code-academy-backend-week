const handleResponse = (res, statusCode, data, message, error = null) => {
  const responseData = {
    statusCode,
    data,
    message,
    error,
  };
  console.log(JSON.stringify(responseData, null, 2));
  return res.status(statusCode).json(responseData);
};

module.exports = {
  handleResponse,
};
