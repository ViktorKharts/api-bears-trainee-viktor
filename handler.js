'use strict';
const AWS = require('aws-sdk');
const uuid4 = require('uuid4');

const ddb = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
const columnsTable = process.env.COLUMNS_TABLE;
const cardsTable = process.env.CARDS_TABLE;

// CREATE A RESPONSE //
function response (statusCode, message) {
  return {
    statusCode: statusCode,
    body: JSON.stringify(message)
  }
};

// SORTING FUNCTION //
function sortByDate (a, b) {
  if (a.createdAt > b.createdAt) {
    return -1
  } else return 1
};

// CREATE A COLUMN //
module.exports.createColumn = (event, context, callback) => {
  const { title, body } = JSON.parse(event.body);

  if (!title || title.trim() === '') {
    return callback(null, response(400, { error: 'Column has to have a title.'}));
  };

  const column = {
    id: uuid4(),
    createdAt: new Date().toISOString(),
    title,
    body
  };

  const params = {
    TableName: columnsTable,
    Item: column
  };

  return ddb.put(params).promise().then(() => {
    callback(null, response(201, column))
  }).catch(err => response(null, response(err.statusCode, err)));
};

// GET ALL COLUMNS //
module.exports.getColumns = (event, context, callback) => {
  const params = {
    TableName: columnsTable
  };

  return ddb.scan(params).promise().then(res => {
    callback(null, response(200, res.Items.sort(sortByDate)));
  }).catch(err => callback(null, response(err.statusCode, err)));
};

// GET A SINGLE COLUMN //
module.exports.getColumn = (event, context, callback) => {
  const id = event.pathParameters.id;
  const params = {
    Key: {
      id: id
    },
    TableName: columnsTable
  };

  return ddb.get(params).promise().then(res => {
    if (res.Item) callback(null, response(200, res.Item));
    else callback(null, response(404, { error: 'Column not found'}));
  }).catch(err => callback(null, response(err.statusCode, err)));
};

// UPDATE A COLUMN //
module.exports.updateColumn = (event, context, callback) => {
  const id = event.pathParameters.id;
  const { paramName, paramValue } = JSON.parse(event.body);

  const params = {
    Key: {
      id: id
    },
    TableName: columnsTable,
    ConditionExpression: 'attribute_exists(id)',
    UpdateExpression: `set ${paramName} = :value`,
    ExpressionAttributeValues: {
      ':value': paramValue
    },
    ReturnValues: 'ALL_NEW'
  };

  return ddb.update(params).promise().then(res => {
    callback(null, response(200, res)).catch(err => callback(null, response(err.statusCode, err)));
  });
};

// DELETE A COLUMN //
module.exports.deleteColumn = (event, context, callback) => {
  const id = event.pathParameters.id;
  const params = {
    Key: {
      id: id
    },
    TableName: columnsTable,
    ReturnValues: 'ALL_OLD'
  };

  return ddb.delete(params).promise().then(() => {
    callback(null, response(200, { message: 'Column deleted successfully'})).catch(err => {
      callback(null, response(err.statusCode, err));
    });
  });
};

// CREATE CARD //
module.exports.createCard = (event, context, callback) => {
  const { title, description, columnId } = JSON.parse(event.body);

  if (!title || title.trim() === '') {
    return callback (null, response(400, { error: 'Card has to have a title.'}));
  }

  const card = {
    id: uuid4(),
    createdAt: new Date().toISOString(),
    title,
    description,
    columnId
  }

  const params = {
    TableName: cardsTable,
    Item: card
  };

  return ddb.put(params).promise().then(() => {
    callback(null, response(201, card));
  }).catch(err => response(null, response(err.statusCode, err)));
};

// GET ALL CARDS //
module.exports.getCards = (event, context, callback) => {
  const params = {
    TableName: cardsTable
  };

  return ddb.scan(params).promise().then(res => {
    callback(null, response(200, res.Items.sort(sortByDate)));
  }).catch(err => callback(null, response(err.statusCode, err)));
};

// GET A SINGLE CARD //
module.exports.getCard = (event, context, callback) => {
  const id = event.pathParameters.id;
  const params = {
    Key: {
      id: id
    },
    TableName: cardsTable
  };

  return ddb.get(params).promise().then(res => {
    if (res.Item) callback(null, response(200, res.Item));
    else callback(null, response(400, { error: 'Card not found'}));
  }).catch(err => callback(null, response(err.statusCode, err)));
};

// UPDATE CARD //
module.exports.updateCard = (event, context, callback) => {
  const id = event.pathParameters.id;
  const { paramName, paramValue } = JSON.parse(event.body);

  const params = {
    Key: {
      id: id
    },
    TableName: cardsTable,
    ConditionExpression: 'attribute_exists(id)',
    UpdateExpression: `set ${paramName} = :value`,
    ExpressionAttributeValues: {
      ':value': paramValue
    },
    ReturnValues: 'ALL_NEW'
  };

  return ddb.update(params).promise().then(res => {
    callback(null, response(200, res)).catch(err => callback(null, response(err.statusCode, err)));
  });
};

// DELETE CARD //
module.exports.deleteCard = (event, context, callback) => {
  const id = event.pathParameters.id;
  const params = {
    Key: {
      id: id
    },
    TableName: cardsTable,
    ReturnValues: 'ALL_OLD'
  };

  return ddb.delete(params).promise().then(() => {
    callback(null, response(200, { message: 'Card deleted successfully'})).catch(err => {
      callback(null, response(err.statusCode, err));
    });
  });
};