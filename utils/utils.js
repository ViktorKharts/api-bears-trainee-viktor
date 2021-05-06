const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
const { ErrorHandler } = require('../helpers');

module.exports.createInstanceUtil = (TableName, Item) => {
  const params = {
    TableName,
    Item
  };

  try { 
    return ddb.put(params).promise();
  } catch (err) {
    console.log('This is from the "create" util:', err);
    throw new ErrorHandler(`Failed to create a new record in ${TableName}`, 400);
  };
};

exports.getAllItemsUtil = TableName => {
  const params = {
    TableName
  };

  try {
    return ddb.scan(params).promise();
  } catch (err) {
    console.log('This is from the "get all" util:', err);
    throw new ErrorHandler(`Failed to scan ${TableName}`, 400);
  };
};

exports.getItemUtil = (TableName, id) => {
  const params = {
    Key: { id },
    TableName
  };

  try {
    return ddb.get(params).promise();
  } catch (err) {
    console.log('This is from the "get one" util:', err);
    throw new ErrorHandler(`Faild to get an item from the ${TableName}`, 400);
  };
};

exports.updateItemUtil = (TableName, id, paramName, paramValue) => {
  const params = {
    Key: { id },
    TableName,
    ConditionExpression: 'attribute_exists(id)',
    UpdateExpression: `set ${paramName} = :value`,
    ExpressionAttributeValues: { ':value': paramValue },
    ReturnValues: 'ALL_NEW'
  };

  try {
    return ddb.update(params).promise();
  } catch (err) {
    console.log('This is from the "update" util:', err);
    throw new ErrorHandler(`Failed to update item in the ${TableName}`, 400);
  };
};

exports.deleteItemUtil = (TableName, id) => {
  const params = {
    Key: { id },
    TableName,
    ReturnValues: 'ALL_OLD'
  };

  try {
    return ddb.delete(params).promise();
  } catch (err) {
    console.log('This is from the "delete" util:', err);
    throw new ErrorHandler(`Failed to delete item from the ${TableName}`, 400);
  };
};