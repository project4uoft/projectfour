const Deck = require('./Deck');
const { findFirstPlayer, checkValidHand } = require('./BigTwoHelper');

class BigTwoBoard {

  constructor(){
    this.players = [];
    this.lastPlayedHand = [];
    this.lastPlayer = '';
    this.currentPlayer = '';
    this.firstMove = true; // check for player with lowest card
    this.winner = [];
    this.numPass = 0;
    this.playerPassed = false;
    this.title = 'bigtwo';
  }

  newGame(players){
    //set the players in the game
    this.firstMove = true;
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
  }

  // check to see if the hand played is valid
  checkValidMove(player, cardIndices) {
    if(this.firstMove){
      // if(!hand.includes(player.playerCards[0])) return false;
      if(!cardIndices.includes[0])
      this.firstMove = false;
    }
    let tempHand = []
    for(let i = 0; i < cardIndices.length; i++){
      tempHand.push(player.playerCards[cardIndices[i]]);
    }
    return checkValidHand(this.lastPlayedHand, tempHand)
  }

  playMove(player, cardIndices){
    this.playerPassed = false;
    this.firstMove = false;
    let tempHand = [];
    this.numPass = 0;
    for(let i = 0; i < cardIndices.length; i++){
      tempHand.push(player.playerCards[cardIndices[i]]);
    }
    //remove cards from player hands
    player.playerCards = player.playerCards.filter((value,index) => !cardIndices.includes(index));
    // hand.forEach(card => {
    //   player.playerCards.splice(player.playerCards.indexOf(card),1);
    // })
    // this.lastPlayedHand = hand;
    if(this.currentPlayer.playerCards.length === 0) {
      this.winner.push(this.currentPlayer);
      return this.winner;
    }
    else{
      this.lastPlayedHand = tempHand;
      this.lastPlayer = this.currentPlayer;
      this.currentPlayer = this.players[(this.players.indexOf(this.currentPlayer) + 1) % this.players.length] 
    }
    return false;
  }

  pass(){
    this.numPass++;
    this.playerPassed = this.currentPlayer;
    if(this.numPass === this.players.length-1){
      this.currentPlayer = this.lastPlayer;
      this.lastPlayedHand = [];
      this.numPass = 0;
    }
    else{
      this.currentPlayer = this.players[(this.players.indexOf(this.currentPlayer) + 1) % this.players.length] 
    }
  }

  getCurrentPlayer() {
    return this.currentPlayer;
  }

}

module.exports = BigTwoBoard;