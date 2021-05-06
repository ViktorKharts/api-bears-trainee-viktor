const { createColumnService, 
        getColumnsService, 
        getColumnService, 
        updateColumnService,
        deleteColumnService } = require('../services/columns.services');
const { response } = require('../helpers');
const columnsTable = process.env.COLUMNS_TABLE;

module.exports.createColumn = async (event, context, callback) => {
  const { title } = JSON.parse(event.body);

  try {
    const column = await createColumnService(columnsTable, title);
    callback(null, response(200, column));
  } catch (err) {
    console.log('This is a "create column" handler error: ', err);
    callback(null, response(err.statusCode, err));
  };
};

module.exports.getColumns = async (event, context, callback) => {

  try {
    const columns = await getColumnsService(columnsTable);
    callback(null, response(200, columns.Items));
  } catch (err) {
    console.log('This is a "get columns" handler error: ', err);
    callback(null, response(err.statusCode, err));
  };
};

module.exports.getColumn = async (event, context, callback) => {
  const { id } = event.pathParameters;

  try {
    const column = await getColumnService(columnsTable, id);
    callback(null, response(200, column));
  } catch (err) {
    console.log('This is a "get column" handler error: ', err);
    callback(null, response(err.status, err.message));
  };
};

module.exports.updateColumn = async (event, context, callback) => {
  const { id } = event.pathParameters;
  const { paramName, paramValue } = JSON.parse(event.body);

  try {
    const column = await updateColumnService(columnsTable, id, paramName, paramValue);
    callback(null, response(200, column));
  } catch (err) {
    console.log('This is a "update column" handler error: ', err);
    callback(null, response(err.statusCode, err));
  };
};

module.exports.deleteColumn = async (event, context, callback) => {
  const { id } = event.pathParameters;
  
  try {
    const column = await deleteColumnService(columnsTable, id);
    callback(null, response(200, "Column successfully deleted"));
  } catch (err) {
    console.log('This is a "delete column" handler error: ', err);
    callback(null, response(err.statusCode, err));
  };
};