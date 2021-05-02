const TicTacToeBoard = require('./TicTacToeBoard');
const inquirer = require('inquirer')

const game = new TicTacToeBoard;

game.printBoard();


const checkStatus = () =>{
  if(game.checkWinner()){
    console.log('player ' + game.currentPlayer + ' wins')
  }
  else if(game.checkDraw()){
    console.log('it is a draw')
  }
  else{
    game.changePlayer();
    askPlayer();
  }
}

const askPlayer = () =>{
  
  inquirer.prompt([
    {
      type: 'number',
      message: `Player ${game.currentPlayer}, make your move`,
      name: 'position'
    }
  ]).then((response)=>{
    if(game.move(parseInt(response.position))){
      
      console.log('player '+ game.currentPlayer +' moves to position ' + response.position)
      game.printBoard();
      checkStatus()
    }
    else{
      console.log('Invalid position')
      askPlayer();
    }
  })
}


askPlayer()
