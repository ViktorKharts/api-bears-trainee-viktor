// IMPORT SERVICE FUNCTIONS //
const { createCardService, 
        getCardsService, 
        getCardService, 
        updateCardService,
        deleteCardService } = require('../services/cards.services');

// IMPORT HELPER FUNCTIONS //
const { response, sortByDate } = require('../helpers');

// IMPORT TABLE NAME //
const cardsTable = process.env.CARDS_TABLE;

// CREATE CARD //
module.exports.createCard = async (event, context, callback) => {
  const { title } = JSON.parse(event.body);

  try {
    var card = await createCardService(cardsTable, title);
    callback(null, response(200, card));
  } catch (err) {
    console.log('This is a "create card" handler error: ', err);
    callback(null, response(err.statusCode, err));
  };
};

// GET CARDS //
module.exports.getCards = async (event, context, callback) => {

  try {
    var cards = await getCardsService(cardsTable);
    callback(null, response(200, cards));
  } catch (err) {
    console.log('This is a "get cards" handler error: ', err);
    callback(null, response(err.statusCode, err));
  };
};

// GET SINGLE CARD //
module.exports.getCard = async (event, context, callback) => {
  const { id } = event.pathParameters;

  try {
    var card = await getCardService(cardsTable, id);
    callback(null, response(200, card));
  } catch (err) {
    console.log('This is a "get card" handler error: ', err);
    callback(null, response(err.statusCode, err));
  };
};

// UPDATE A CARD //
module.exports.updateCard = async (event, context, callback) => {
  const { id } = event.pathParameters;
  const { paramName, paramValue } = JSON.parse(event.body);

  try {
    var card = await updateCardService(cardsTable, id, paramName, paramValue);
    callback(null, response(200, card));
  } catch (err) {
    console.log('This is a "update card" handler error: ', err);
    callback(null, response(err.statusCode, err));
  };
};

// DELETE A CARD //
module.exports.deleteCard = async (event, context, callback) => {
  const { id } = event.pathParameters;

  try {
    var card = await deleteCardService(cardsTable, id);
    callback(null, response(200, "Card successfully deleted"));
  } catch (err) {
    console.log('This is a "delete card" handler error: ', err);
    callback(null, response(err.statusCode, err));
  };
};