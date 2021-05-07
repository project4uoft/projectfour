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
    const [discardPile, setDiscardPile] = useState([]);
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
    // const [currentPlayer, setCurrentPlayer] = useState('')
    const [currentPlayerPos, setCurrentPlayerPos] = useState(0)

    //Create new game, inserting the number of players there are    
    let numPlayers = players.length;

    //Creates new shuffled deck
    let cardDeck = new Deck()
    cardDeck.createDeck()
    cardDeck.shuffleDeck()
    console.log(cardDeck.cards)

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
                console.log(players[i].hand)
            }
        } else if (numPlayers > 2 && numPlayers < 7) {
            //Each player gets 5 cards each
            for (let i = 0; i < numPlayers; i++) {
                //for each player, pick 5 random cards
                for (let j = 0; j < 5; j++) {
                    const selectedCard = cardDeck.cards.splice(Math.floor(Math.random() * cardDeck.length), 1)
                    players[i].hand.push(selectedCard)
                }
            }
        } else if (numPlayers > 7) {
            console.log("Too many people to play this game!!")
        }
        let remainingCards = cardDeck.cards
        console.log(remainingCards)
    
        let topCard = remainingCards[0]
        console.log(topCard)

        let dealer = players[Math.floor(Math.random() * numPlayers)]
        let dealerPosition = players.indexOf(dealer)
        console.log("dealer:", dealer)
        console.log("position of dealer in array:", dealerPosition)
        
    }
    dealHands()
    
    //LEFT OFF - the terminal and console are not showing the same logs! 


    return (<></>)
}

module.exports = CrazyEightsBoard;