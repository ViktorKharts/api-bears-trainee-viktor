const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
const { ErrorHandler } = require('../helpers');

createInstance = params => {

  try { 
    return ddb.put(params).promise();
  } catch (err) {
    console.log('This is from the "create" util:', err);
    throw new ErrorHandler(`Failed to create a new record in ${params.TableName}`, 400);
  };
};

getAllItems = params => {

  try {
    return ddb.scan(params).promise();
  } catch (err) {
    console.log('This is from the "get all" util:', err);
    throw new ErrorHandler(`Failed to scan ${params.TableName}`, 400);
  };
};

getItemsByGSI = params => {

  try {
    return ddb.query(params).promise();
  } catch (err) {
    console.log('This is from the "get items by GSI" util:', err);
    throw new ErrorHandler(`Failed to query ${params.TableName}`, 400);
  };
};

getItem = params => {

  try {
    return ddb.get(params).promise();
  } catch (err) {
    console.log('This is from the "get one" util:', err);
    throw new ErrorHandler(`Faild to get an item from the ${params.TableName}`, 400);
  };
};

updateItem = params => {

  try {
    return ddb.update(params).promise();
  } catch (err) {
    console.log('This is from the "update" util:', err);
    throw new ErrorHandler(`Failed to update item in the ${params.TableName}`, 400);
  };
};

deleteItem = params => {

  try {
    return ddb.delete(params).promise();
  } catch (err) {
    console.log('This is from the "delete" util:', err);
    throw new ErrorHandler(`Failed to delete item from the ${params.TableName}`, 400);
  };
};

module.exports = { createInstance, getAllItems, getItemsByGSI, getItem, updateItem, deleteItem };
