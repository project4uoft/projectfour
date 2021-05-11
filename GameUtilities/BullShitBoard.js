const Deck = require('./Deck');


class BullShitBoard {

  constructor(){
    this.discardPile = [];
    this.players = [];
    this.currentCall = 0; 
    this.lastCallAmount = '';  
    this.currentPlayer = '';
    this.currentPlayerPos = 0; 
    this.winners = [];
    this.ranks = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
    this.bluffPhase = false;
    this.numPassBluff = 0;
  }

  newGame(players){
    //set the players in the game
    this.players = players;

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
    for(let j = 0; j < remainingCards; j++){
      this.players[j].playerCards.push(cardDeck.cards[lastIndex+j]);
    }
    this.players.forEach(player => this.sortCard(player));
  }

  sortCard(player){
    player.playerCards.sort((a,b)=>a.value-b.value)
  }

  getCurrentCall(){
    return this.ranks[this.currentCall]
  }

  // player calls a number and the card indices in their hands
  playMove(player, cardIndices){
    // add cards to discard pile
    for(let i = 0; i < cardIndices.length; i++){
      this.discardPile.push(player.playerCards[cardIndices[i]]);
    }
    //remove cards from player hands
    player.playerCards = player.playerCards.filter((value,index) => !cardIndices.includes(index));
    //set current player
    this.currentPlayer = player;
    this.lastCallAmount = cardIndices.length;
    this.bluffPhase = true;
  }

  endTurn(){
    
    this.numPassBluff = 0;
    this.bluffPhase = false;
    this.currentCall = (this.currentCall + 1)%13;
    if(this.currentPlayer.playerCards.length === 0){
      this.winners.push(this.currentPlayer);
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
    if(this.discardPile.slice(-this.lastCallAmount).every(card => card.rank === this.ranks[this.currentCall])){
      console.log('truth')
      this.discardPile.forEach(card => player.playerCards.push(card))
      this.sortCard(player)
    }
    else{
      console.log('bluff')
      this.discardPile.forEach(card => this.currentPlayer.playerCards.push(card))
      this.sortCard(this.currentPlayer)
    }
    this.discardPile = [];
    return this.endTurn();
  }

  passBluff() {
    this.numPassBluff++;
    if(this.numPassBluff === (this.players.length-this.winners.length-1)){
      return this.endTurn();
    }
  }

}

module.exports = BullShitBoard;