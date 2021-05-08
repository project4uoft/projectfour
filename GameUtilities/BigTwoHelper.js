//find the player with the lowest card
function findFirstPlayer(players){
  //check the lowest card that is not in the discard pile
  let lowestCards = new Array(players.length).fill(null)
  players.forEach((player,index)=>{
    player.playerCards.sort((a,b)=>{
      return a.convertBigTwoRanks() - b.convertBigTwoRanks();
    })
    lowestCards[index] = player.playerCards[0].convertBigTwoRanks();
  })
  return players[lowestCards.indexOf(Math.min(...lowestCards))]
}

//checks whether the hand is single
function checkSingle(hand) {
  return hand.length === 1;
}

//checks whether the hand is pair
function checkPair(hand) {
  if(hand.length !== 2) return false;
  else return hand[0].rank === hand[1].rank;
}

//checks whether the hand is triple
function checkTriple(hand) {
  if(hand.length !== 3) return false;
  else return hand.every(card => card.rank === hand[0].rank)
}

//checks whether the hand is 5 card hand
function checkFiveCard(hand) {
  if(hand.length !== 5) return false;
  return checkStraight(hand) || checkFlush(hand) || checkFullHouse(hand) || checkFourOfKind(hand)
}

//checks whether the hand is a straight where the lowest is A2345 and the highest is JQKA2
function checkStraight(hand){
  const sortedByValue = sortByValue(hand);
  const sortedByBigTwoRank = sortByBigTwoRank(hand);
  return checkNumericalStraight(sortedByValue) || checkBigTwoStraight(sortedByBigTwoRank);
}

function checkNumericalStraight(hand){
  for(let i = 0; i < 4; i++){
    if(hand[i].value !== hand[i+1].value-1) return false;
  }
  return true;
}

function checkBigTwoStraight(hand){
  for(let i = 0; i < 4; i++){
    if(hand[i].bigTwoRank !== hand[i+1].bigTwoRank-1) return false;
  }
  return true;
}

function sortByValue(hand){
  let temp = [...hand];
  temp.sort((a,b)=>a.value - b.value)
  return temp;
}

function sortByBigTwoRank(hand){
  let temp = [...hand];
  temp.sort((a,b)=>a.convertBigTwoRanks() - b.convertBigTwoRanks())
  return temp;
}

//checks whether the hand is a flush so all cards are of the same suit
function checkFlush(hand){
  return hand.every(card => card.suit === hand[0].suit)
}

function checkFullHouse(hand){
  const sortedByBigTwoRank = sortByBigTwoRank(hand);
  return (checkPair(sortedByBigTwoRank.slice(0,2)) && checkTriple(sortedByBigTwoRank.slice(2))) || (checkTriple(sortedByBigTwoRank.slice(0,3)) && checkPair(sortedByBigTwoRank.slice(3)))
}

function checkFourOfKind(hand){
  const sortedByBigTwoRank = sortByBigTwoRank(hand);
  return sortedByBigTwoRank.slice(0,4).every(card => card.value === sortedByBigTwoRank[0].value) || sortedByBigTwoRank.slice(1,5).every(card => card.value === sortedByBigTwoRank[1].value)
}

function validSimpleMove(lastPlayedHand,hand){
  let sortedLastPlayedHand = sortByBigTwoRank(lastPlayedHand);
  let sortedHand = sortByBigTwoRank(hand);
  return sortedHand[sortedHand.length-1].convertBigTwoRanks() > sortedLastPlayedHand[sortedLastPlayedHand.length-1].convertBigTwoRanks();
}

function validComplexMove(lastPlayedHand,hand){
  let sortedLastPlayedHand = sortByBigTwoRank(lastPlayedHand);
  let sortedHand = sortByBigTwoRank(hand);
  return sortedHand[2].convertBigTwoRanks() > sortedLastPlayedHand[2].convertBigTwoRanks();
}

function validStraightMove(lastPlayedHand,hand){
  let sortedLastPlayedHand = sortByBigTwoRank(lastPlayedHand);
  if(!checkBigTwoStraight(sortedLastPlayedHand)) sortedLastPlayedHand = sortByValue(lastPlayedHand);
  let sortedHand = sortByBigTwoRank(hand);
  if(!checkBigTwoStraight(sortedHand)) sortedHand = sortByValue(hand);
  return sortedHand[4].convertBigTwoRanks() > sortedLastPlayedHand[4].convertBigTwoRanks();
}

//order is straight, flush, fullhouse, four of kind, royal flush
function validFiveCardMove(lastPlayedHand,hand){
  if(checkStraight(lastPlayedHand) && checkFlush(lastPlayedHand)){
    if(checkStraight(hand) && checkFlush(hand)){
      return validSimpleMove(lastPlayedHand, hand)
    }
    else return false
  }
  else if(checkFourOfKind(lastPlayedHand)){
    if(checkStraight(hand) && checkFlush(hand)) return true;
    else if (checkFourOfKind(hand)) return validComplexMove(lastPlayedHand,hand)
    else return false
  }
  else if(checkFullHouse(lastPlayedHand)){
    if((checkStraight(hand) && checkFlush(hand)) || checkFourOfKind(hand)) return true;
    else if (checkFullHouse(hand)) return validComplexMove(lastPlayedHand,hand)
    else return false
  }
  else if(checkFlush(lastPlayedHand)){
    if((checkStraight(hand) && checkFlush(hand)) || checkFourOfKind(hand) || checkFullHouse(hand)) return true;
    else if (checkFlush(hand)) return validSimpleMove(lastPlayedHand,hand)
    else return false
  }
  else if(checkStraight(lastPlayedHand)){
    if((checkStraight(hand) && checkFlush(hand)) || checkFourOfKind(hand) || checkFullHouse(hand) || checkFlush(hand)) return true;
    else if (checkStraight(hand)) return validStraightMove(lastPlayedHand,hand)
    else return false
  }
  else{
    return false
  }
}

//check whether the move is valid
function checkValidHand(lastPlayedHand, hand){

  //if the lastPlayedHand is empty, check whether the hand is a valid single, pair, triple or 5-card hand
  if(lastPlayedHand.length === 0) {
    return checkSingle(hand) || checkPair(hand) || checkTriple(hand) || checkFiveCard(hand)
  }
  //if the lastPlayHand exist, check whether the hand is of the same type and higher
  else{
    if(checkSingle(lastPlayedHand)){
      if(checkSingle(hand)){
        return validSimpleMove(lastPlayedHand,hand);
      }
    }
    else if(checkPair(lastPlayedHand)){
      if(checkPair(hand)){
        return validSimpleMove(lastPlayedHand,hand);
      }
    }
    else if(checkTriple(lastPlayedHand)){
      if(checkTriple(hand)){
        return validSimpleMove(lastPlayedHand,hand);
      }
    }
    else if(checkFiveCard(lastPlayedHand)){
      if(checkFiveCard(hand)){
        return validFiveCardMove(lastPlayedHand,hand);
      }
    }
    else{
      return false
    }
  }
}

module.exports = {
  findFirstPlayer: findFirstPlayer, 
  checkValidHand: checkValidHand,
  checkSingle: checkSingle,
  checkPair: checkPair,
  checkTriple: checkTriple,
  checkStraight: checkStraight,
  checkFlush: checkFlush,
  checkFullHouse: checkFullHouse,
  checkFourOfKind: checkFourOfKind,
  validSimpleMove: validSimpleMove,
  validFiveCardMove: validFiveCardMove
};