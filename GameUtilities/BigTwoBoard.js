const Deck = require('./Deck');
const { findFirstPlayer, checkValidHand } = require('./BigTwoHelper');

class BigTwoBoard {

  constructor(){
    this.players = [];
    this.lastPlayedHand = [];
    this.currentPlayer = '';
    this.currentPlayerPos = 0; 
    this.firstMove = true; // check for player with lowest card
    this.winner = '';
  }

  newGame(players){
    //set the players in the game
    this.players = players;

    //create new deck and shuffle
    let cardDeck = new Deck();
    cardDeck.createDeck();
    cardDeck.shuffleDeck();

    //deal the cards - 13 cards per player
    let numPlayers = players.length;
    
    for(let i = 0; i < numPlayers; i++){
      this.players[i].playerCards = cardDeck.cards.slice(i*13, (i+1)*13);
    }

    this.currentPlayer = findFirstPlayer(this.players);
    this.currentPlayerPos = this.players.indexOf(this.currentPlayer); 
  }

  // check to see if the hand played is valid
  checkValidMove(player, hand) {
    if(this.firstMove){
      if(!hand.includes(player.playerCards[0])) return false;
      this.firstMove = false;
    }
    return checkValidHand(this.lastPlayedHand, hand)

  }

}

module.exports = BigTwoBoard;