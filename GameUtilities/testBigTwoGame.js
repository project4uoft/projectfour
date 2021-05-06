const BigTwoBoard = require('./BigTwoBoard');
const Player = require('./Player');
const Card = require('./Card');

const game = new BigTwoBoard();
const names = ['kirby', 'link','pikachu', 'ness'];
const players = names.map(name => new Player(name));

const printBoard = () =>{
  console.log('current board')
  players.forEach(player => {
    console.log(player.playerName) 
    player.printPlayerCards()});
  console.log('discard pile', game.lastPlayedHand)
  console.log('----------')
  console.log('current player:', game.currentPlayer.playerName)
}

game.newGame(players);

printBoard()

game.playMove(game.currentPlayer,[0,1,2,3,4])

printBoard()