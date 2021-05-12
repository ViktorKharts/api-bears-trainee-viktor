const dbquery = require('../utils/dbquery');
const uuid4 = require('uuid4');

const { checkString } = require('../helpers');
const TableName = process.env.COLUMNS_TABLE;
const date = new Date()

createColumn = async title => {
  if (checkString(title)) {
    const Item = {
      id: uuid4(),
      createdAt: date.valueOf(),
      title
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

updateColumn = async (id, paramName, paramValue) => {
  if(checkString(paramValue)) {
    const params = {
      Key: { id },
      TableName,
      ConditionExpression: 'attribute_exists(id)',
      UpdateExpression: `set ${paramName} = :value`,
      ExpressionAttributeValues: { ':value': paramValue },
      ReturnValues: 'ALL_NEW'
    };

    return await dbquery.updateItem(params);
  };
};

deleteColumn = async id => {
  const params = {
    Key: { id },
    TableName
  };

  return await dbquery.deleteItem(params);
};

module.exports = { createColumn, getColumns, getColumn, updateColumn, deleteColumn };
