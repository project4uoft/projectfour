// const Desk = require('./Deck');
// const Card = require('./Card');

// let cardDeck = new Deck();

// cardDeck.createDeck();
// console.log('deck of cards')
// cardDeck.printDeck();
// cardDeck.shuffleDeck();

// console.log('after shuffling')
// cardDeck.printDeck();

const Player = require('./Player');
const BullShitBoard = require('./BullShitBoard');

const bsBoard = new BullShitBoard();
const p1 = new Player('kirby');
const p2 = new Player('Pikachu');
const p3 = new Player('Link');
bsBoard.newGame([p1,p2,p3]);

// for(let i = 0; i < bsBoard.players.length; i++){
//   console.log(bsBoard.players[i])
// }

console.log('kirby hands')
console.log(p1)

bsBoard.playMove(p1,'3',[0]);

console.log('kirby hands')
console.log(p1)

console.log('discard')
console.log(bsBoard.discardPile);

bsBoard.checkBluff(p2);

console.log('discard')
console.log(bsBoard.discardPile);

console.log('kirby hands')
console.log(p1)


console.log('Pikachu hands')
console.log(p2)