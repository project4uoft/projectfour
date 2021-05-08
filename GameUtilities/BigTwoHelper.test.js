const Card = require("./Card");
const { 
  checkSingle, 
  checkPair, 
  checkTriple,
  checkStraight,
  checkFlush,
  checkFullHouse,
  checkFourOfKind,
  validSimpleMove,
  validFiveCardMove
} = require('./BigTwoHelper')


describe("Checking whether the hand is valid or invalid combination", () =>{
  test("Valid Single Hand", () => {
    const hand = [new Card('diamonds','A', 1)]
    expect(checkSingle(hand)).toBe(true);
  });
  
  test("Invalid Single Hand", () => {
    const hand = [new Card('diamonds','A', 1),new Card('clubs','3', 3)]
    expect(checkSingle(hand)).toBe(false);
  });
  
  test("Valid Pair Hand", () => {
    const hand = [new Card('diamonds','A', 1), new Card('clubs','A', 1)]
    expect(checkPair(hand)).toBe(true);
  });
  
  test("Invalid Pair Hand", () => {
    const hand = [new Card('diamonds','A', 1),new Card('diamonds','3', 3)]
    expect(checkPair(hand)).toBe(false);
  });
  
  test("Valid Tripe Hand", () => {
    const hand = [new Card('diamonds','A', 1), new Card('clubs','A', 1), new Card('hearts','A', 1)]
    expect(checkTriple(hand)).toBe(true);
  });
  
  test("Invalid Tripe Hand", () => {
    const hand = [new Card('diamonds','A', 1),new Card('diamonds','3', 3), new Card('clubs','A', 1)]
    expect(checkTriple(hand)).toBe(false);
  });
  
  
  test("Valid Straight Hand", () => {
    const hand = [new Card('diamonds','A', 1),  new Card('hearts','4', 4), new Card('clubs','2', 2), new Card('hearts','3', 3), new Card('hearts','5', 5)]
    expect(checkStraight(hand)).toBe(true);
  });
  
  test("Valid Straight Hand", () => {
    const hand = [new Card('diamonds','J', 11), new Card('clubs','10', 10), new Card('hearts','Q', 12), new Card('hearts','K', 13), new Card('hearts','A', 1)]
    expect(checkStraight(hand)).toBe(true);
  });
  
  test("Invalid Straight Hand", () => {
    const hand = [new Card('diamonds','10', 10), new Card('clubs','J', 11), new Card('hearts','9', 9), new Card('hearts','K', 13), new Card('hearts','A', 1)]
    expect(checkStraight(hand)).toBe(false);
  });
  
  test("Invalid Straight Hand", () => {
    const hand = [new Card('diamonds','Q', 12), new Card('clubs','K', 13), new Card('hearts','A', 1), new Card('hearts','2', 2), new Card('hearts','3', 3)]
    expect(checkStraight(hand)).toBe(false);
  });
  
  
  test("Valid Flush Hand", () => {
    const hand = [new Card('diamonds','A', 1),  new Card('diamonds','4', 4), new Card('diamonds','2', 2), new Card('diamonds','3', 3), new Card('diamonds','5', 5)]
    expect(checkFlush(hand)).toBe(true);
  });
  
  
  test("Invalid Flush Hand", () => {
    const hand = [new Card('diamonds','Q', 12), new Card('clubs','K', 13), new Card('hearts','A', 1), new Card('hearts','2', 2), new Card('hearts','3', 3)]
    expect(checkFlush(hand)).toBe(false);
  });
  
  test("Valid Full House Hand", () => {
    const hand = [new Card('diamonds','A', 1),  new Card('hearts','A', 1), new Card('diamonds','2', 2), new Card('clubs','A', 1),  new Card('clubs','2', 2)]
    expect(checkFullHouse(hand)).toBe(true);
  });
  
  test("Valid Full House Hand", () => {
    const hand = [new Card('spades','2', 2),  new Card('hearts','A', 1), new Card('diamonds','2', 2), new Card('clubs','A', 1),  new Card('clubs','2', 2)]
    expect(checkFullHouse(hand)).toBe(true);
  });
  
  
  test("Invalid Full House Hand", () => {
    const hand = [new Card('spades','Q', 12),  new Card('hearts','A', 1), new Card('diamonds','2', 2), new Card('clubs','A', 1),  new Card('clubs','2', 2)]
    expect(checkFullHouse(hand)).toBe(false);
  });
  
  test("Valid Four of a Kind Hand", () => {
    const hand = [new Card('spades','2', 2), new Card('hearts','2', 2),  new Card('diamonds','2', 2), new Card('clubs','A', 1),  new Card('clubs','2', 2)]
    expect(checkFourOfKind(hand)).toBe(true);
  });
  
  test("Invalid Four of a Kind Hand", () => {
    const hand = [new Card('spades','Q', 12),  new Card('hearts','A', 1), new Card('diamonds','2', 2), new Card('clubs','A', 1),  new Card('clubs','2', 2)]
    expect(checkFourOfKind(hand)).toBe(false);
  });
})


describe("Checking whether the hand is valid play compared to the last played hand (single, pairs and triples)", () =>{
    
  test("Valid Single Move", () => {
    const hand = [new Card('spades','2', 2)]
    const lastPlayedHand = [new Card('diamonds','2', 2)]
    expect(validSimpleMove(lastPlayedHand,hand)).toBe(true);
  });

  test("Invalid Single Move", () => {
    const hand = [new Card('diamonds','2', 2)]
    const lastPlayedHand = [new Card('hearts','2', 2)]
    expect(validSimpleMove(lastPlayedHand,hand)).toBe(false);
  });

  test("Valid Pair Move", () => {
    const hand = [new Card('spades','2', 2),new Card('clubs','2', 2)]
    const lastPlayedHand = [new Card('diamonds','2', 2),new Card('hearts','2', 2)]
    expect(validSimpleMove(lastPlayedHand,hand)).toBe(true);
  });

  test("Invalid Pair Move", () => {
    const hand = [new Card('hearts','2', 2),new Card('clubs','2', 2)]
    const lastPlayedHand = [new Card('diamonds','2', 2),new Card('spades','2', 2)]
    expect(validSimpleMove(lastPlayedHand,hand)).toBe(false);
  });


  test("Valid Triple Move", () => {
    const hand = [new Card('spades','2', 2),new Card('clubs','2', 2),new Card('diamonds','2', 2)]
    const lastPlayedHand = [new Card('diamonds','A', 1),new Card('hearts','A', 1),new Card('clubs','A', 1)]
    expect(validSimpleMove(lastPlayedHand,hand)).toBe(true);
  });

  test("Invalid Triple Move", () => {
    const hand = [new Card('diamonds','A', 1),new Card('hearts','A', 1),new Card('clubs','A', 1)]
    const lastPlayedHand = [new Card('spades','2', 2),new Card('clubs','2', 2),new Card('diamonds','2', 2)]
    expect(validSimpleMove(lastPlayedHand,hand)).toBe(false);
  });
})


describe("Checking whether the 5 card hand is valid play compared to the last played hand", () =>{
    
  test("Valid Straight Flush move", () => {
    const hand = [new Card('spades','2', 2), new Card('spades','A', 1), new Card('spades','J', 11), new Card('spades','Q', 12), new Card('spades','K', 13)]
    const lastPlayedHand = [new Card('hearts','2', 2), new Card('hearts','A', 1), new Card('hearts','J', 11), new Card('hearts','Q', 12), new Card('hearts','K', 13)]
    expect(validFiveCardMove(lastPlayedHand,hand)).toBe(true);
  });

  test("Invalid Straight Flush move", () => {
    const lastPlayedHand = [new Card('spades','2', 2), new Card('spades','A', 1), new Card('spades','J', 11), new Card('spades','Q', 12), new Card('spades','K', 13)]
    const hand = [new Card('hearts','2', 2), new Card('hearts','A', 1), new Card('hearts','J', 11), new Card('hearts','Q', 12), new Card('hearts','K', 13)]
    expect(validFiveCardMove(lastPlayedHand,hand)).toBe(false);
  });

  test("Valid Four of a Kind move", () => {
    const hand = [new Card('spades','2', 2), new Card('hearts','2', 2),  new Card('diamonds','2', 2), new Card('clubs','A', 1),  new Card('clubs','2', 2)]
    const lastPlayedHand = [new Card('spades','A', 1), new Card('hearts','A', 1),  new Card('diamonds','2', 2), new Card('diamonds','A', 1),  new Card('clubs','A', 1)]
    expect(validFiveCardMove(lastPlayedHand,hand)).toBe(true);
  });

  test("Invalid Four of a Kind move", () => {
    const lastPlayedHand = [new Card('spades','2', 2), new Card('hearts','2', 2),  new Card('diamonds','2', 2), new Card('clubs','A', 1),  new Card('clubs','2', 2)]
    const hand = [new Card('spades','A', 1), new Card('hearts','A', 1),  new Card('diamonds','2', 2), new Card('diamonds','A', 1),  new Card('clubs','A', 1)]
    expect(validFiveCardMove(lastPlayedHand,hand)).toBe(false);
  });
  
  test("Valid Full House move", () => {
    const hand = [new Card('spades','2', 2), new Card('hearts','2', 2),  new Card('diamonds','A', 1), new Card('clubs','A', 1),  new Card('clubs','2', 2)]
    const lastPlayedHand = [new Card('spades','A', 1), new Card('hearts','A', 1),  new Card('diamonds','2', 2), new Card('diamonds','A', 1),  new Card('clubs','2', 2)]
    expect(validFiveCardMove(lastPlayedHand,hand)).toBe(true);
  });

  test("Invalid Full House move", () => {
    const lastPlayedHand = [new Card('spades','2', 2), new Card('hearts','2', 2),  new Card('diamonds','2', 2), new Card('clubs','A', 1),  new Card('clubs','2', 2)]
    const hand = [new Card('spades','2', 2), new Card('hearts','2', 2),  new Card('diamonds','A', 1), new Card('clubs','A', 1),  new Card('clubs','2', 2)]
    expect(validFiveCardMove(lastPlayedHand,hand)).toBe(false);
  });

  test("Valid Flush move", () => {
    const hand =  [new Card('diamonds','K', 13),  new Card('diamonds','4', 4), new Card('diamonds','2', 2), new Card('diamonds','3', 3), new Card('diamonds','5', 5)]
    const lastPlayedHand = [new Card('diamonds','Q', 12),  new Card('diamonds','6', 6), new Card('diamonds','7', 7), new Card('diamonds','8', 8), new Card('diamonds','9', 9)]
    expect(validFiveCardMove(lastPlayedHand,hand)).toBe(true);
  });

  test("Invalid Full House move", () => {
    const lastPlayedHand = [new Card('spades','2', 2), new Card('hearts','2', 2),  new Card('diamonds','2', 2), new Card('clubs','A', 1),  new Card('clubs','2', 2)]
    const hand = [new Card('diamonds','K', 13),  new Card('diamonds','4', 4), new Card('diamonds','2', 2), new Card('diamonds','3', 3), new Card('diamonds','5', 5)]
    expect(validFiveCardMove(lastPlayedHand,hand)).toBe(false);
  });

  test("Valid Straight move", () => {
    const hand =  [new Card('clubs','4', 4),  new Card('spades','5', 5), new Card('diamonds','7', 7), new Card('diamonds','8', 8), new Card('diamonds','6', 6)]
    const lastPlayedHand = [new Card('clubs','A', 1),  new Card('diamonds','4', 4), new Card('spades','2', 2), new Card('diamonds','3', 3), new Card('diamonds','5', 5)]
    expect(validFiveCardMove(lastPlayedHand,hand)).toBe(true);
  });
  
  test("Valid Straight move", () => {
    const lastPlayedHand =  [new Card('clubs','4', 4),  new Card('spades','5', 5), new Card('diamonds','7', 7), new Card('diamonds','8', 8), new Card('diamonds','6', 6)]
    const hand = [new Card('clubs','A', 1),  new Card('diamonds','K', 13), new Card('spades','2', 2), new Card('diamonds','Q', 12), new Card('diamonds','J', 11)]
    expect(validFiveCardMove(lastPlayedHand,hand)).toBe(true);
  });

})
