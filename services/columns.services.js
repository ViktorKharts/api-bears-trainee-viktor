const { createInstanceUtil, 
        getAllItemsUtil,
        getItemUtil,
        updateItemUtil,
        deleteItemUtil } = require('../utils/utils');
const { checkString } = require('../helpers');
const uuid4 = require('uuid4');

exports.createColumnService = async function (TableName, title) {
  if (checkString(title)) {
    const Item = {
      id: uuid4(),
      createdAt: new Date().toISOString(),
      title
    };

    console.log('This is the item in the service: ', Item);
    return await createInstanceUtil(TableName, Item);
  };
};

exports.getColumnsService = async function (TableName) {

  return await getAllItemsUtil(TableName);
};

exports.getColumnService = async function (TableName, id) {

  return await getItemUtil(TableName, id);
};

exports.updateColumnService = async function (TableName, id, paramName, paramValue) {

  if (checkString(paramName)) {
    return await updateItemUtil(TableName, id, paramName, paramValue);
  };
};

exports.deleteColumnService = async function (TableName, id) {

  return await deleteItemUtil(TableName, id);
}