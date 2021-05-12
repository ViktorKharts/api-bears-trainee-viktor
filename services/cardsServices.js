const cardsRepository = require('../repositories/cardsRepository');

createCard = async (title, columnId) => {

  return await cardsRepository.createCard(title, columnId);
};

getCards = async () => {

  return await cardsRepository.getCards();
};

getCard = async id => {
  
  return await cardsRepository.getCard(id);
};

updateCard = async (id, paramTitle, paramDesc) => {

  return await cardsRepository.updateCard(id, paramTitle, paramDesc);
};

deleteCard = async id => {

  return await cardsRepository.deleteCard(id);
};

module.exports = { createCard, getCards, getCard, updateCard, deleteCard };
