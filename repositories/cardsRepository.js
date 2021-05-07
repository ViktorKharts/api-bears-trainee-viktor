const dbquery = require('../utils/dbquery');
const uuid4 = require('uuid4');

const { checkString } = require('../helpers');
const TableName = process.env.CARDS_TABLE;

createCard = async (title, columnId) => {
  if (checkString(title)) {
    const Item = {
      id: uuid4(),
      createdAt: new Date().toISOString(),
      title,
      columnId,
      description: "Your description here"
    };

    const params = {
      TableName,
      Item
    };

    return await dbquery.createInstance(params);
  }
};

getCards = async () => {
  const params = {
    TableName
  };

  return await dbquery.getAllItems(params);
};

getCard = async id => {
  const params = {
    Key: { id },
    TableName
  };

  return await dbquery.getItem(params);
};

updateCard = async (id, paramName, paramValue) => {
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

deleteCard = async id => {
  const params = {
    Key: { id },
    TableName
  };

  return await dbquery.deleteItem(params);
};

module.exports = { createCard, getCards, getCard, updateCard, deleteCard };
