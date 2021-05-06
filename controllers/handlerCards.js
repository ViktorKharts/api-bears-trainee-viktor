const { createCardService, 
        getCardsService, 
        getCardService, 
        updateCardService,
        deleteCardService } = require('../services/cards.services');
const { response } = require('../helpers');
const cardsTable = process.env.CARDS_TABLE;

module.exports.createCard = async (event, context, callback) => {
  const { title, columnId } = JSON.parse(event.body);

  try {
    const card = await createCardService(cardsTable, title, columnId);
    callback(null, response(200, card));
  } catch (err) {
    console.log('This is a "create card" handler error: ', err);
    callback(null, response(err.statusCode, err));
  };
};

module.exports.getCards = async (event, context, callback) => {

  try {
    const cards = await getCardsService(cardsTable);
    callback(null, response(200, cards.Items));
  } catch (err) {
    console.log('This is a "get cards" handler error: ', err);
    callback(null, response(err.statusCode, err));
  };
};

module.exports.getCard = async (event, context, callback) => {
  const { id } = event.pathParameters;

  try {
    const card = await getCardService(cardsTable, id);
    callback(null, response(200, card));
  } catch (err) {
    console.log('This is a "get card" handler error: ', err);
    callback(null, response(err.statusCode, err));
  };
};

module.exports.updateCard = async (event, context, callback) => {
  const { id } = event.pathParameters;
  const { paramName, paramValue } = JSON.parse(event.body);

  try {
    const card = await updateCardService(cardsTable, id, paramName, paramValue);
    callback(null, response(200, card));
  } catch (err) {
    console.log('This is a "update card" handler error: ', err);
    callback(null, response(err.statusCode, err));
  };
};

module.exports.deleteCard = async (event, context, callback) => {
  const { id } = event.pathParameters;

  try {
    const card = await deleteCardService(cardsTable, id);
    callback(null, response(200, "Card successfully deleted"));
  } catch (err) {
    console.log('This is a "delete card" handler error: ', err);
    callback(null, response(err.statusCode, err));
  };
};