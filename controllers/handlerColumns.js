const columnsServices = require('../services/columnsServices');
const { response } = require('../helpers');

createColumn = async (event, context, callback) => {
  const { title } = JSON.parse(event.body);

  try {
    const column = await columnsServices.createColumn(title);
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
  const { paramValue } = JSON.parse(event.body);

  try {
    const column = await columnsServices.updateColumn(id, paramValue);
    callback(null, response(200, column));
  } catch (err) {
    console.log('This is a "update column" handler error: ', err);
    callback(null, response(err.statusCode, err));
  };
};

deleteColumn = async (event, context, callback) => {
  const { id } = event.pathParameters;
  
  try {
    const column = await columnsServices.deleteColumn(id);
    callback(null, response(200, "Column successfully deleted"));
  } catch (err) {
    console.log('This is a "delete column" handler error: ', err);
    callback(null, response(err.statusCode, err));
  };
};

module.exports = { createColumn, getColumns, getColumn, updateColumn, deleteColumn };
