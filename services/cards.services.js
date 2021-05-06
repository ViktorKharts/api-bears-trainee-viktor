const { createInstanceUtil, 
        getAllItemsUtil,
        getItemUtil,
        updateItemUtil,
        deleteItemUtil } = require('../utils/utils');
const { checkString } = require('../helpers');
const uuid4 = require('uuid4');

exports.createCardService = async function (TableName, title, columnId) {
  if (checkString(title)) {
    const Item = {
      id: uuid4(),
      createdAt: new Date().toISOString(),
      title,
      description: 'Describe your card',
      columnId
    };

    return await createInstanceUtil(TableName, Item);
  };
};

exports.getCardsService = async function (TableName) {

  return await getAllItemsUtil(TableName);
};

exports.getCardService = async function (TableName, id) {

  return await getItemUtil(TableName, id);
};

exports.updateCardService = async function (TableName, id, paramName, paramValue) {

  if (checkString(paramName)) {
    return await updateItemUtil(TableName, id, paramName, paramValue);
  };
};

exports.deleteCardService = async function (TableName, id) {

  return await deleteItemUtil(TableName, id);
};
