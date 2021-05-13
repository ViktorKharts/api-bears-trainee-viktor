function ErrorHandler (message, status) {
  this.message = message;
  this.status = status;
  this.name = "Exception defined by the user.";
};

response = (statusCode, message) => {
  return {
    statusCode,
    body: JSON.stringify(message)
  }
};

checkString = str => {
  if (!str || str.trim() === '') {
    throw new ErrorHandler('Please, provide a valid input.', 304);
  } else return true;
}

module.exports = { ErrorHandler, response, checkString };
