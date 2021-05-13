const columnsRepository = require('../repositories/columnsRepository');

createColumn = async title => {

  return await columnsRepository.createColumn(title);
};

getColumns = async () => {

  return await columnsRepository.getColumns();
};

getColumn = async id => {
  
  return await columnsRepository.getColumn(id);
};

updateColumn = async (id, paramValue) => {

  return await columnsRepository.updateColumn(id, paramValue);
};

deleteColumn = async id => {

  return await columnsRepository.deleteColumn(id);
};

module.exports = { createColumn, getColumns, getColumn, updateColumn, deleteColumn };
