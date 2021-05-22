const columnsRepository = require('../repositories/columnsRepository');

createColumn = async (title, orderId) => {

  return await columnsRepository.createColumn(title, orderId);
};

getColumns = async () => {

  return await columnsRepository.getColumns();
};

getColumn = async id => {
  
  return await columnsRepository.getColumn(id);
};

updateColumn = async (id, paramTitle, orderId) => {

  return await columnsRepository.updateColumn(id, paramTitle, orderId);
};

deleteColumn = async (id, orderId) => {

  return await columnsRepository.deleteColumn(id, orderId);
};

module.exports = { createColumn, getColumns, getColumn, updateColumn, deleteColumn };
