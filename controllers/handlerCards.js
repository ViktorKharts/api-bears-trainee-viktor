const cardsServices = require('../services/cardsServices');
const { response } = require('../helpers');

createCard = async (event, context, callback) => {
  const { title, columnId } = JSON.parse(event.body);

  try {
    const card = await cardsServices.createCard(title, columnId);
    callback(null, response(200, card));
  } catch (err) {
    console.log('This is a "create card" handler error: ', err);
    callback(null, response(err.statusCode, err));
  };
};

getCards = async (event, context, callback) => {

  try {
    const cards = await cardsServices.getCards();
    callback(null, response(200, cards.Items));
  } catch (err) {
    console.log('This is a "get cards" handler error: ', err);
    callback(null, response(err.statusCode, err));
  };
};

getCard = async (event, context, callback) => {
  const { id } = event.pathParameters;

  try {
    const card = await cardsServices.getCard(id);
    callback(null, response(200, card));
  } catch (err) {
    console.log('This is a "get card" handler error: ', err);
    callback(null, response(err.statusCode, err));
  };
};

updateCard = async (event, context, callback) => {
  const { id } = event.pathParameters;
  const { paramTitle, paramDesc } = JSON.parse(event.body);

  try {
    const card = await cardsServices.updateCard(id, paramTitle, paramDesc);
    callback(null, response(200, card));
  } catch (err) {
    console.log('This is a "update card" handler error: ', err);
    callback(null, response(err.statusCode, err));
  };
};

deleteCard = async (event, context, callback) => {
  const { id } = event.pathParameters;

  try {
    const card = await cardsServices.deleteCard(id);
    callback(null, response(200, "Card successfully deleted"));
  } catch (err) {
    console.log('This is a "delete card" handler error: ', err);
    callback(null, response(err.statusCode, err));
  };
};

module.exports = { createCard, getCards, getCard, updateCard, deleteCard };
