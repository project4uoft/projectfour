const suitBigTwo = {
  'diamonds' : 0,
  'clubs': 1,
  'hearts': 2,
  'spades': 3,
}

const suitIcon = {
  'diamonds' : '♦',
  'clubs': '♣',
  'hearts': '♥',
  'spades': '♠',
}

const rankBigTwo = {
  '3' : 0,
  '4': 1,
  '5': 2,
  '6': 3,
  '7': 4,
  '8': 5,
  '9': 6,
  '10': 7,
  'J': 8,
  'Q': 9,
  'K': 10,
  'A': 11,
  '2': 12,
}

class Card {
  constructor(suit, rank, value) {
    this.suit = suit;
    this.rank = rank;
    this.value = value; 
    this.bigTwoRank = rankBigTwo[rank];
  }

  convertBigTwoRanks(){
    return rankBigTwo[this.rank]*4 + suitBigTwo[this.suit];
  }

  getSuit(){
    return this.suit;
  }

  getRank() {
    return this.rank;
  }

  getCard() {
    return this.rank + '-' + suitIcon[this.suit];
  }
}

module.exports = Card;