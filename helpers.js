function ErrorHandler (message, status) {
  this.message = message;
  this.status = status;
  this.name = "Exception defined by the user.";
};

const response = (statusCode, message) => {
  return {
    statusCode,
    body: JSON.stringify(message)
  }
};

const checkString = str => {
  if (!str || str.trim() === '') {
    throw new ErrorHandler('Please, provide an attribute name.', 304);
  } else return true;
}

module.exports = { ErrorHandler, response, checkString };