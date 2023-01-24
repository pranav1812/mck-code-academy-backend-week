const handleResponse = (res, data, message, code) => {
  res.writeHead(code, { 'Content-Type': 'text/json' });
  res.end(
    JSON.stringify({
      data,
      message,
    })
  );
};

module.exports = {
  handleResponse,
};
