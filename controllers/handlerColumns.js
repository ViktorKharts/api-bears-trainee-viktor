const columnsServices = require('../services/columnsServices');
const { response } = require('../helpers');

createColumn = async (event, context, callback) => {
  const { id, title, orderId } = JSON.parse(event.body);

  try {
    const column = await columnsServices.createColumn(id, title, orderId);
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

getColumnsByGSI = async (event, context, callback) => {

  try {
    const columns = await columnsServices.getColumnsByGSI();
    callback(null, response(200, columns.Items));
  } catch (err) {
    console.log('This is a "get columns by GSI" handler error: ', err);
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
  const { id, createdAt } = event.pathParameters;
  const { title, orderId } = JSON.parse(event.body);

  try {
    const column = await columnsServices.updateColumn(id, createdAt, title, orderId);
    callback(null, response(200, column));
  } catch (err) {
    console.log('This is an "update column" handler error: ', err);
    callback(null, response(err.statusCode, err));
  };
};

deleteColumn = async (event, context, callback) => {
  let { id, createdAt } = event.pathParameters;
  
  try {
    const column = await columnsServices.deleteColumn(id, createdAt);
    callback(null, response(200, "Column successfully deleted"));
  } catch (err) {
    console.log('This is a "delete column" handler error: ', err);
    callback(null, response(err.statusCode, err));
  };
};

module.exports = { createColumn, getColumns, getColumnsByGSI, getColumn, updateColumn, deleteColumn };
