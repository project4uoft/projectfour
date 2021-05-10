//how many players? 2-7
//how many cards each player gets - 5 each (7 in two player)
//rest of deck facedown as stock pile of cards
//top card turned up on the side 
//pick a dealer 
//left of the dealer starts 
// card must match number, or suit, or AN EIGHT (declares new suit) or draw from the pile and continue their turn. 
//one card at a time 

//once the stock pile is done - all cards played are shuffled to form a new stock 

//game ends when one player has no cards left 


// Scoring 
// Winner gets points from remaining players hands
// 8's are 50 
// face cards - 10 
//all other cards are face value 
import React, { useEffect, useState } from 'react'
const Deck = require('./crazyEightsDeck');

const CrazyEightsBoard = () => {

    //Setting up default states
    // const [discardPile, setDiscardPile] = useState([]);
    const [players, setPlayers] = useState([
        {
            position: 1,
            hand: [],
            score: 0
        },
        {
            position: 2,
            hand: [],
            score: 0
        }
        // , {
        //     position: 3,
        //     hand: []
        // } 
    ])

    const dealerPosition = 0;
    let currentSuit = ''
    const topCard = {}
    let numPlayers = players.length;
    let currentPlayerIndex = 0
    let discardPile = []

    //Creates new shuffled deck
    let cardDeck = new Deck()
    cardDeck.createDeck()
    cardDeck.shuffleDeck()
    console.log(cardDeck)
    
      
    //Create new game, inserting the number of players there are    
    const dealHands = () => {

        //Deal the hands

        if (numPlayers === 1) {
            console.log("You need friends for this one")

        } else if (numPlayers > 1 && numPlayers < 3) {
            //Each player gets 7 cards each
            for (let i = 0; i < numPlayers; i++) {
                //for each player, pick 7 random cards
                for (let j = 0; j < 7; j++) {
                    const selectedCard = cardDeck.cards.splice(Math.floor(Math.random() * cardDeck.length), 1)
                    players[i].hand.push(selectedCard)
                }
                //Removing the nested array that occured when pushing card objts into the players hand
                players[i].hand = Array.prototype.concat.apply([], players[i].hand);
                console.log(players[i].hand.flat())
            }
        } else if (numPlayers > 2 && numPlayers < 7) {
            //Each player gets 5 cards each
            for (let i = 0; i < numPlayers; i++) {
                //for each player, pick 5 random cards
                for (let j = 0; j < 5; j++) {
                    const selectedCard = cardDeck.cards.splice(Math.floor(Math.random() * cardDeck.length), 1)
                    players[i].hand.push(selectedCard)
                }
                //Removing the nested array that occured when pushing card objts into the players hand
                players[i].hand = Array.prototype.concat.apply([], players[i].hand);
                console.log(players[i].hand.flat())
            }
        } else if (numPlayers > 7) {
            console.log("Too many people to play this game!!")
        }
        let remainingCards = cardDeck.cards
    
        let topCard = remainingCards[0]
        console.log("top card:",  topCard)

        discardPile.push(topCard)
        console.log("discard pile:", discardPile)

        currentSuit = topCard.suit
        console.log("first currentSuit:", currentSuit)

        let dealer = players[Math.floor(Math.random() * numPlayers)]
        let dealerPosition = players.indexOf(dealer)
        // console.log("dealer:", dealer)
        // console.log("index of dealer:", dealerPosition)
        let currentPlayerIndex = dealerPosition + 1 
        // console.log("current player index:", currentPlayerIndex)

        
    }
    dealHands()
    // console.log(players[currentPlayerIndex])
    let currentPlayer = players[currentPlayerIndex]

    

// let testPlayerCard = {suit: 'hearts', rank: 'K', value: 10 }
// card must match number, or suit, or AN EIGHT (declares new suit) or draw from the pile and continue their turn. 
    const makeMove = (currentPlayer, playedCard) => {
        // console.log("current player:", currentPlayer)
        console.log("playedCard:", playedCard)

        // If the players card suit matches the last card added to the pile 
        if(playedCard.suit === discardPile[discardPile.length - 1].suit){
            console.log("the card suit matches, card accepted")
            const playedCardIndex = currentPlayer.hand.indexOf(playedCard[0])
            console.log("played Card index:", playedCardIndex)
            discardPile.push(currentPlayer.hand.splice(playedCardIndex, 1))
            discardPile = Array.prototype.concat.apply([], discardPile);

        } 
        discardPile.concat.apply([], discardPile);

        if(playedCard.rank === discardPile[discardPile.length -1].rank){
            console.log("the card number matches, card accepted, changing suit")
            // currentSuit = playedCard.suit
            // console.log("current suit:", currentSuit)
            //Take the card out of their hand and insert into discard pile
            // const playedCardIndex = player.hand.indexOf(playedCard)
            // console.log(playedCardIndex)
            // discardPile.push(player.hand.splice(playedCard))
        }
    }
    makeMove(currentPlayer, currentPlayer.hand[0])
    console.log("current player:", currentPlayer)

    console.log("discard pile:", discardPile)
    // playedCard = {suit: 'hearts', rank: 'K', value: 10 }


    return (<></>)
}

module.exports = CrazyEightsBoard;