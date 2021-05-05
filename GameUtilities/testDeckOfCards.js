const Desk = require('./Deck');
const Card = require('./Card');

let cardDeck = new Deck();

cardDeck.createDeck();
console.log('deck of cards')
cardDeck.printDeck();
cardDeck.shuffleDeck();

console.log('after shuffling')
cardDeck.printDeck();
