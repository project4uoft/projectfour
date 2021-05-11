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

  printPlayerCards() {
        console.log(this.playerCards.map((card, index) => index + ": " +card.getCard()).join(' '))
  }
}

module.exports = Player;