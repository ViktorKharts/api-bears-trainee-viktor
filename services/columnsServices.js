const columnsRepository = require('../repositories/columnsRepository');

createColumn = async (id, title, orderId) => {

  return await columnsRepository.createColumn(id, title, orderId);
};

getColumns = async () => {

  return await columnsRepository.getColumns();
};

getColumnsByGSI = async () => {

  return await columnsRepository.getColumnsByGSI();
};

getColumn = async id => {
  
  return await columnsRepository.getColumn(id);
};

updateColumn = async (id, createdAt, title, orderId) => {

  return await columnsRepository.updateColumn(id, createdAt, title, orderId);
};

deleteColumn = async (id, createdAt) => {

  return await columnsRepository.deleteColumn(id, createdAt);
};

module.exports = { createColumn, getColumns, getColumnsByGSI, getColumn, updateColumn, deleteColumn };
