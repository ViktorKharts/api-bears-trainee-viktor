// IMPORT UTIL FUNCTIONS //
const { createInstanceUtil, 
        getAllItemsUtil,
        getItemUtil,
        updateItemUtil,
        deleteItemUtil } = require('../utils/utils');

// IMPORT HELPER FUNCTIONS //
const { checkString } = require('../helpers');
const uuid4 = require('uuid4');

// CREATE COLUMN SERVICE //
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

// GET COLUMNS SERVICE //
exports.getColumnsService = async function (TableName) {

  return await getAllItemsUtil(TableName);
};

// GET COLUMN SERVICE //
exports.getColumnService = async function (TableName, id) {

  return await getItemUtil(TableName, id);
};

// UPDATE COLUMN SERVICE //
exports.updateColumnService = async function (TableName, id, paramName, paramValue) {

  if (checkString(paramName)) {
    return await updateItemUtil(TableName, id, paramName, paramValue);
  };
};

// DELETE COLUMN SERVICE //
exports.deleteColumnService = async function (TableName, id) {

  return await deleteItemUtil(TableName, id);
}