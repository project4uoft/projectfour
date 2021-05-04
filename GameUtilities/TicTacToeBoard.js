/*
[0][1][2]
[3][4][5]
[6][7][8]
*/

const SIZE = 3;
const PLAYER_MAP = {
  'X' : 'O',
  'O' : 'X'
}


const checkRow = (rowNum, board, player) =>{
  for(let i = 0; i < SIZE; i++){
    if(board[rowNum*SIZE+i] != player) return false;
  }
  return true;
} 

const checkCol = (colNum, board, player) =>{
  for(let i = 0; i < SIZE; i++){
    if(board[colNum+3*i] != player) return false;
  }
  return true;
} 

const checkLeftDiag  = (board, player) => {
  for(let i = 0; i < SIZE; i++){
    if(board[0 + i*(SIZE+1)] != player) return false;
  }
  return true;
}

const checkRightDiag = (board, player) =>{
  for(let i = 0; i < SIZE; i++){
    if(board[(SIZE-1) + i*(SIZE-1)] != player) return false;
  }
  return true;
}


class TicTacToeBoard{
  
  constructor() {
    this.gameBoard = new Array(SIZE*SIZE).fill(null)
    this.currentPlayer = 'X';
  }

  changePlayer(){
    this.currentPlayer = PLAYER_MAP[this.currentPlayer];
  }

  move(position){
    if(this.gameBoard[position] === null){
      let tempBoard = [...this.gameBoard];
      tempBoard[position] = this.currentPlayer;
      this.gameBoard = tempBoard;
      return true;
    }
    return false;
  }

  checkWinner(){
    //check Rows and Columns
    for(let i = 0; i < SIZE; i++){
      if(checkRow(i, this.gameBoard, this.currentPlayer)) return true;
      if(checkCol(i, this.gameBoard, this.currentPlayer)) return true;
    }
    //check Diagonals
    if(checkLeftDiag(this.gameBoard, this.currentPlayer)) return true;
    if(checkRightDiag(this.gameBoard, this.currentPlayer)) return true;
    return false;
  }

  checkDraw() {
    return this.gameBoard.every(value => value !== null)
  }

  newGame() {
    this.gameBoard = new Array(SIZE*SIZE).fill(null);
    this.currentPlayer = 'X';
  }

  printBoard() {
    for(let i = 0; i < SIZE; i++){
      console.log(`${this.gameBoard[i*3]?this.gameBoard[i*3]:i*3} | ${this.gameBoard[i*3+1]?this.gameBoard[i*3+1]:i*3+1} | ${this.gameBoard[i*3+2]?this.gameBoard[i*3+2]:i*3+2}`)
      if(i < SIZE-1) console.log('----------------')
    }
    
  }

}

module.exports = TicTacToeBoard;