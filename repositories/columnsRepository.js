const dbquery = require('../utils/dbquery');
const uuid4 = require('uuid4');

const { checkString } = require('../helpers');
const TableName = process.env.COLUMNS_TABLE;

createColumn = async (id, title, orderId) => {
  if (checkString(title)) {
    if (!id) {
      id = uuid4()
    }

    Item = {
      id,
      createdAt: new Date().toISOString(),
      title,
      orderId,
      status: "created"
    }

    const params = {
      TableName,
      Item
    };

    return await dbquery.createInstance(params);
  }
};

getColumns = async () => {
  const params = {
    TableName
  };

  return await dbquery.getAllItems(params);
};

getColumnsByGSI = async () => {
  const params = {
    TableName,
    IndexName: 'status-orderId-index',
    KeyConditionExpression: '#status = :s and #orderId >= :o',
    ExpressionAttributeValues: {
      ':s': 'created',
      ':o': 0
    },
    ExpressionAttributeNames: {
      '#status': 'status',
      '#orderId': 'orderId'
    }
  };

  return await dbquery.getItemsByGSI(params);
};

getColumn = async id => {
  const params = {
    Key: { id },
    TableName
  };

  return await dbquery.getItem(params);
};

updateColumn = async (id, createdAt, title, orderId) => {
  if(checkString(title)) {
    const params = {
      Key: { id, createdAt },
      TableName,
      ConditionExpression: 'attribute_exists(id)',
      UpdateExpression: `
        set title = :t, orderId = :o
      `,
      ExpressionAttributeValues: { 
        ':t': title,
        ':o': orderId 
      },
      ReturnValues: 'ALL_NEW'
    };

    return await dbquery.updateItem(params);
  };
};

deleteColumn = async (id, createdAt) => {
  
  const params = {
    Key: { id, createdAt },
    TableName
  };

  return await dbquery.deleteItem(params);
};

module.exports = { createColumn, getColumns, getColumnsByGSI, getColumn, updateColumn, deleteColumn };
