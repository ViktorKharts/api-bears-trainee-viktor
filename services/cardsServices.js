const cardsRepository = require('../repositories/cardsRepository');

createCard = async (title, columnId, orderId) => {

  return await cardsRepository.createCard(title, columnId, orderId);
};

getCards = async () => {

  return await cardsRepository.getCards();
};

getCard = async id => {
  
  return await cardsRepository.getCard(id);
};

updateCard = async (id, paramColumnId, paramTitle, paramDesc, paramOrderId) => {

  return await cardsRepository.updateCard(id, paramColumnId, paramTitle, paramDesc, paramOrderId);
};

deleteCard = async id => {

  return await cardsRepository.deleteCard(id);
};

module.exports = { createCard, getCards, getCard, updateCard, deleteCard };
