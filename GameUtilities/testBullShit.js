const BullShitBoard = require('./BullShitBoard');
const Player = require('./Player');
const inquirer = require('inquirer')

const game = new BullShitBoard;

const names = ['kirby', 'link','pikachu','captain falcon', 'ness'];
const players = names.map(name => new Player(name))

const printBoard = () =>{
  console.log('current board')
  players.forEach(player => {
    console.log(player.playerName) 
    player.printPlayerCards()});
  console.log('discard pile', game.discardPile)
  console.log('----------')
}

const askBluff = () =>{
  printBoard();
  let otherPlayers = players.filter(player => player != game.currentPlayer && !game.winners.includes(player));
  let otherPlayersNames = otherPlayers.map(player => player.playerName);
  otherPlayersNames.push('none')
  inquirer.prompt([
    {
      type: 'list',
      message: `Who calls bluff`,
      name: 'playerName',
      choices: otherPlayersNames
    },
  ]).then((response)=>{
    let winners;
    if(response.playerName != 'none'){
      let p = otherPlayers.filter(player => player.playerName === response.playerName);
      console.log(p)
      winners = game.checkBluff(p[0]);
    }
    else{
      winners = game.endTurn();
    }
    if(!winners) {
      startGame();
    }
    else{
      console.log(winners)
    }
    
  })
}

const startGame = () =>{
  printBoard();
  console.log(`current card to play: ${game.getCurrentCall()}`)
  const currentPlayer = game.players[game.currentPlayerPos];
  console.log(currentPlayer.getPlayerName());
  currentPlayer.printPlayerCards();
  
  inquirer.prompt([
    {
      type: 'input',
      message: `Which indices (space in between)`,
      name: 'indices'
    }
  ]).then((response)=>{
    game.playMove(currentPlayer,  response.indices.trim().split(' ').map(i => parseInt(i)))
    askBluff();
  })
}

const createGame = () =>{
  game.newGame(players);
  startGame()
}



createGame()
