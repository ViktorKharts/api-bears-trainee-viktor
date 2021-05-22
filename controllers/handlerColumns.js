const columnsServices = require('../services/columnsServices');
const { response } = require('../helpers');

createColumn = async (event, context, callback) => {
  const { title, orderId } = JSON.parse(event.body);
  console.log(event)

  try {
    const column = await columnsServices.createColumn(title, orderId);
    callback(null, response(200, column));
  } catch (err) {
    console.log('This is a "create column" handler error: ', err);
    callback(null, response(err.statusCode, err));
  };
};

getColumns = async (event, context, callback) => {

  try {
    const columns = await columnsServices.getColumns();
    callback(null, response(200, columns.Items));
  } catch (err) {
    console.log('This is a "get columns" handler error: ', err);
    callback(null, response(err.statusCode, err));
  };
};

getColumn = async (event, context, callback) => {
  const { id } = event.pathParameters;

  try {
    const column = await columnsServices.getColumn(id);
    callback(null, response(200, column));
  } catch (err) {
    console.log('This is a "get column" handler error: ', err);
    callback(null, response(err.status, err.message));
  };
};

updateColumn = async (event, context, callback) => {
  const { id } = event.pathParameters;
  const { paramTitle, paramOrderId } = JSON.parse(event.body);
  const orderId = parseInt(paramOrderId)

  try {
    const column = await columnsServices.updateColumn(id, paramTitle, orderId);
    callback(null, response(200, column));
  } catch (err) {
    console.log('This is a "update column" handler error: ', err);
    callback(null, response(err.statusCode, err));
  };
};

deleteColumn = async (event, context, callback) => {
  let { id, orderId } = event.pathParameters;
  orderId = parseInt(orderId)
  
  try {
    const column = await columnsServices.deleteColumn(id, orderId);
    callback(null, response(200, "Column successfully deleted"));
  } catch (err) {
    console.log('This is a "delete column" handler error: ', err);
    callback(null, response(err.statusCode, err));
  };
};

module.exports = { createColumn, getColumns, getColumn, updateColumn, deleteColumn };
