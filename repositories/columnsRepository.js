const dbquery = require('../utils/dbquery');
const uuid4 = require('uuid4');

const { checkString } = require('../helpers');
const TableName = process.env.COLUMNS_TABLE;

createColumn = async (title, orderId) => {
  if (checkString(title)) {
    const Item = {
      id: uuid4(),
      createdAt: new Date().toISOString(),
      title,
      orderId
    };

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

getColumn = async id => {
  const params = {
    Key: { id },
    TableName
  };

  return await dbquery.getItem(params);
};

updateColumn = async (id, paramTitle, orderId) => {
  if(checkString(paramTitle)) {
    const params = {
      Key: { id, orderId },
      TableName,
      ConditionExpression: 'attribute_exists(id)',
      UpdateExpression: `
        set title = :t, orderId = :o
      `,
      ExpressionAttributeValues: { 
        ':t': paramTitle,
        ':o': orderId 
      },
      ReturnValues: 'ALL_NEW'
    };

    return await dbquery.updateItem(params);
  };
};

deleteColumn = async (id, orderId) => {
  
  const params = {
    Key: { id, orderId },
    TableName
  };

  return await dbquery.deleteItem(params);
};

module.exports = { createColumn, getColumns, getColumn, updateColumn, deleteColumn };
