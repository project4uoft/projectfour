const Card = require('./crazyEightsCard');

class Deck {
  constructor(){
    this.cards = [];
  }

  createDeck() {
    let suits = ['diamonds', 'clubs','hearts','spades'];
    let ranks = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
    let values = [1,2,3,4,5,6,7,50,9,10,10,10,10]

    for(let i = 0; i < suits.length; i++){
      for(let j = 0; j < ranks.length; j++){
        this.cards.push(new Card(suits[i], ranks[j], values[j]));
      }
    }
  }

  shuffleDeck() {
    for(let i = this.cards.length - 1; i >= 0; i--){
      let j = Math.floor(Math.random()*i+1);
      let temp = this.cards[i];
      this.cards[i] = this.cards[j];
      this.cards[j] = temp;
    }
  }

  printDeck() {
    console.log(this.cards.map(card => card.getCard()).toString())
  }
}

module.exports = Deck;