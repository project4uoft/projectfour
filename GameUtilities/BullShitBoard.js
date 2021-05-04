const Deck = require('./Deck');

class BullShitBoard {

  constructor(){
    this.discardPile = [];
    this.players = [];
    this.lastCallValue = ''; 
    this.lastCallAmount = '';  
    this.currentPlayer = '';
    this.currentPlayerPos = 0; 
    this.winners = [];
  }

  newGame(players){
    //set the players in the game
    this.players = players

    //create new deck and shuffle
    let cardDeck = new Deck();
    cardDeck.createDeck();
    cardDeck.shuffleDeck();

    //deal the cards
    let numPlayers = players.length;
    let remainingCards = cardDeck.cards.length % numPlayers;
    let divisibleCards = Math.floor(cardDeck.cards.length / numPlayers);
    let lastIndex = divisibleCards*numPlayers;

    for(let i = 0; i < numPlayers; i++){
      this.players[i].playerCards = cardDeck.cards.slice(i*divisibleCards, (i+1)*divisibleCards);
    }
    for(let j = 0; j < remainingCards.length; j++){
      this.player[j].playerCards.push(cardDeck.cards[lastIndex+j]);
    }
  }
  // player calls a number and the card indices in their hands
  playMove(player, call, cardIndices){
    // add cards to discard pile
    for(let i = 0; i < cardIndices.length; i++){
      this.discardPile.push(player.playerCards[cardIndices[i]]);
    }
    //remove cards from player hands
    player.playerCards = player.playerCards.filter((value,index) => !cardIndices.includes(index));
    //set current player
    this.currentPlayer = player;
    this.lastCallAmount = cardIndices.length;
    this.lastCallValue = call;
  }

  endTurn(){
    if(this.currentPlayer.playerCards.length === 0){
      this.winners.push(this.lastPlayer);
      if(this.winners.length === this.players.length - 1) {
        return this.winners
      }
    }
    do{
      this.currentPlayerPos = (this.currentPlayerPos + 1) % this.players.length; 
    } while(this.players[this.currentPlayerPos].playerCards.length === 0)
    return false
  }

  checkBluff(player){
    
    if(this.discardPile.slice(-this.lastCallAmount).every(card => card.rank === this.lastCallValue)){
      console.log('truth')
      this.discardPile.forEach(card => player.playerCards.push(card))
    }
    else{
      console.log('bluff')
      this.discardPile.forEach(card => this.currentPlayer.playerCards.push(card))
    }
    this.discardPile = [];
    this.endTurn();
  }

}

module.exports = BullShitBoard;