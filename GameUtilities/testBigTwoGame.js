const BigTwoBoard = require('./BigTwoBoard');
const Player = require('./Player');
const Card = require('./Card');
const { checkFullHouse } = require('./BigTwoHelper')

const game = new BigTwoBoard();
const names = ['kirby', 'link','pikachu', 'ness'];
const players = names.map(name => new Player(name));

const printBoard = () =>{
  console.log('current board')
  players.forEach(player => {
    console.log(player.playerName) 
    player.printPlayerCards()});
  console.log('discard pile', game.discardPile)
  console.log('----------')
  console.log('player to go first:', game.currentPlayer.playerName)
  console.log(game.currentPlayerPos)
}

game.newGame(players);

printBoard()



const hand = [new Card('diamonds','A', 1),  new Card('hearts','A', 1), new Card('diamonds','2', 2), new Card('clubs','A', 1),  new Card('clubs','2', 2)]
console.log(checkFullHouse(hand))
