// IMPORT UTIL FUNCTIONS //
const { createInstanceUtil, 
        getAllItemsUtil,
        getItemUtil,
        updateItemUtil,
        deleteItemUtil } = require('../utils/utils');

// IMPORT HELPER FUNCTIONS //
const { checkString } = require('../helpers');
const uuid4 = require('uuid4');

// CREATE CARDS SERVICE //
exports.createCardService = async function (TableName, title) {
  if (checkString(title)) {
    const Item = {
      id: uuid4(),
      createdAt: new Date().toISOString(),
      title,
      description: 'Describe your card'
    };

    return await createInstanceUtil(TableName, Item);
  };
};

// GET CARDS SERVICE //
exports.getCardsService = async function (TableName) {

  return await getAllItemsUtil(TableName);
};

// GET CARD SERVICE //
exports.getCardService = async function (TableName, id) {

  return await getItemUtil(TableName, id);
};

// UPDATE CARD SERVICE //
exports.updateCardService = async function (TableName, id, paramName, paramValue) {

  if (checkString(paramName)) {
    return await updateItemUtil(TableName, id, paramName, paramValue);
  };
};

// DELETE CARD SERVICE //
exports.deleteCardService = async function (TableName, id) {

  return await deleteItemUtil(TableName, id);
};
