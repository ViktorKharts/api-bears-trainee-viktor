// IMPORT SERVICE FUNCTIONS //
const { createColumnService, 
        getColumnsService, 
        getColumnService, 
        updateColumnService,
        deleteColumnService } = require('../services/columns.services');

// IMPORT HELPER FUNCTIONS //
const { response } = require('../helpers');

// IMPORT TABLE NAME //
const columnsTable = process.env.COLUMNS_TABLE;

// CREATE COLUMN //
module.exports.createColumn = async (event, context, callback) => {
  const { title } = JSON.parse(event.body);

  try {
    var column = await createColumnService(columnsTable, title);
    callback(null, response(200, column));
  } catch (err) {
    console.log('This is a "create column" handler error: ', err);
    callback(null, response(err.statusCode, err));
  };
};

// GET COLUMNS //
module.exports.getColumns = async (event, context, callback) => {

  try {
    var columns = await getColumnsService(columnsTable);
    callback(null, response(200, columns));
  } catch (err) {
    console.log('This is a "get columns" handler error: ', err);
    callback(null, response(err.statusCode, err));
  };
};

// GET SINGLE COLUMN //
module.exports.getColumn = async (event, context, callback) => {
  const { id } = event.pathParameters;

  try {
    var column = await getColumnService(columnsTable, id);
    callback(null, response(200, column));
  } catch (err) {
    console.log('This is a "get column" handler error: ', err);
    callback(null, response(err.status, err.message));
  };
};

// UPDATE A COLUMN //
module.exports.updateColumn = async (event, context, callback) => {
  const { id } = event.pathParameters;
  const { paramName, paramValue } = JSON.parse(event.body);

  try {
    var column = await updateColumnService(columnsTable, id, paramName, paramValue);
    callback(null, response(200, column));
  } catch (err) {
    console.log('This is a "update column" handler error: ', err);
    callback(null, response(err.statusCode, err));
  };
};

// DELETE A COLUMN //
module.exports.deleteColumn = async (event, context, callback) => {
  const { id } = event.pathParameters;
  
  try {
    var column = await deleteColumnService(columnsTable, id);
    callback(null, response(200, "Column successfully deleted"));
  } catch (err) {
    console.log('This is a "delete column" handler error: ', err);
    callback(null, response(err.statusCode, err));
  };
};