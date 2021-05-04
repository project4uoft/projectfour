class Player{
  constructor(name){
    this.playerName = name;
    this.playerCards = [];
    this.ticTacToePiece = ''; 
  }

  setTicTacToePiece(piece) {
    this.ticTacToePiece = piece; 
  }
  getTicTacToePiece() {
    return this.ticTacToePiece;
  }

  getPlayerCards() {
    return this.playerCards;
  }
  getPlayerName() {
    return this.playerName;
  }
}

module.exports = Player;