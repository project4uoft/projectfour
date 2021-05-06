const Card = require("./Card");
const { 
  checkSingle, 
  checkPair, 
  checkTriple,
  checkStraight,
  checkFlush,
  checkFullHouse
} = require('./BigTwoHelper')

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
