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

import React, { useState } from 'react'
const Deck = require('./crazyEightsDeck');

const CrazyEightsLogic = () => {

    //Setting up default states
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
    ])

    let currentSuit = ''
    let numPlayers = players.length;
    let currentPlayerIndex = 0
    let discardPile = []


    //Creates new shuffled deck
    let cardDeck = new Deck()
    cardDeck.createDeck()
    cardDeck.shuffleDeck()



    const dealHands = () => {
        //Deal the hands depending on the number of players
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
                //Removing the nested array that occured when pushing card obj's into the players hand
                players[i].hand = Array.prototype.concat.apply([], players[i].hand);
            }

        } else if (numPlayers > 2 && numPlayers < 7) {
            //if more than two players, each player gets 5 cards each
            for (let i = 0; i < numPlayers; i++) {
                //for each player, pick 5 random cards
                for (let j = 0; j < 5; j++) {
                    const selectedCard = cardDeck.cards.splice(Math.floor(Math.random() * cardDeck.length), 1)
                    players[i].hand.push(selectedCard)
                }
                //Removing the nested array that occured when pushing card objts into the players hand
                players[i].hand = Array.prototype.concat.apply([], players[i].hand);
            }

        } else if (numPlayers > 7) {
            console.log("Too many people to play this game!!")
        }

        //Let the stockpile be the remaining cards after hands are dealt
        let stockPile = cardDeck.cards
        console.log("stockpile:", stockPile)

        //Pick the top card to be the first starter card
        let topCard = stockPile[0]
        console.log("top card:", topCard)

        //Move the top ard from the stockpile to the discard pile
        discardPile.push(topCard)
        console.log("discard pile:", discardPile)

        //Set the starting suit to that of the top card
        currentSuit = topCard.suit
        console.log("first currentSuit:", currentSuit)

        //Pick a random dealer
        let dealer = players[Math.floor(Math.random() * numPlayers)]
        let dealerPosition = players.indexOf(dealer)

        //First person to paly is left of the dealer
        let currentPlayerIndex = dealerPosition + 1
        console.log("current player index:", currentPlayerIndex)


    }
    dealHands()

    //Set the current player
    let currentPlayer = players[currentPlayerIndex]

    // card must match number, or suit, or AN EIGHT, or draw from the pile and continue their turn. 
    const makeMove = (currentPlayer, playedCard) => {
        console.log("playedCard:", playedCard)

        // If the players card suit matches the last card added to the pile 
        if (playedCard.suit === discardPile[discardPile.length - 1].suit) {
            console.log("the card suit matches, card accepted")

            //Get the index of the played card in the payers hand
            const playedCardIndex = currentPlayer.hand.indexOf(playedCard[0])

            //Remove from the hand and push to the discard pile
            discardPile.push(currentPlayer.hand.splice(playedCardIndex, 1))

            //Flatten the discard pile, so there are no nested arrays
            discardPile = Array.prototype.concat.apply([], discardPile);
        }

        if (playedCard.rank === discardPile[discardPile.length - 1].rank) {
            console.log("the card number matches, card accepted, changing suit")

            // The user should be able to choose the suit
            currentSuit = playedCard.suit
            console.log("current suit:", currentSuit)

            //Remove from the hand and push to the discard pile
            discardPile.push(currentPlayer.hand.splice(playedCardIndex, 1))

            //Flatten the discard pile, so there are not nested arrays
            discardPile = Array.prototype.concat.apply([], discardPile);
        }
    }

    if ("") {
        if (stockpile.length > 0) {
            currentPlayer.hand.push(stockpile.length - 1)
        } else {
            resetStockPile()
            currentPlayer.hand.push(stockpile.length - 1)
            // offer option of mave move or pass
            // makeMove()
            // endMove()
        }
    }


    //End turn and move to the next player
    const endMove = () => {
        if (currentPlayer.hand.length === 0) {
            roundOver();
        }
        // If the index of the current player is the last in the array, go to the start [0] again
        if (currentPlayerIndex === players.length) {
            currentPlayerIndex = 0
        } else {
            currentPlayerIndex++
        }
    }



    const resetStockPile = () => {
        discardPile.shuffleDeck()
        stockPile = disCardPile
    }



    const endOfRound = () => {
        let scoreSum = 0
        // If the current player has no cards left
        if (currentPlayer.hand.length === 0) {
            // Look at each of the players hands and calculate the total value
            const sum = () => {
                for (var i = 0; i < players.length; i++) {
                    console.log("player[i]", players[i])
                    for (var j = 0; j < players[i].hand.length; j++) {
                        console.log("this is [j]", players[i].hand[j])
                        scoreSum += players[i].hand[j].value
                        console.log(scoreSum)

                    }
                }
            }
            sum()
        }
        currentPlayer.score += scoreSum;


        // check to see if there's a winner
        switch (players.length) {
            case 2:
                if (currentPlayer.score >= 100) {
                    console.log(`Game over ${currentPlayer} wins!`)
                } else {
                    break
                };
            case 3:
                if (currentPlayer.score >= 150) {
                    console.log(`Game over ${currentPlayer} wins!`)
                } else {
                    break
                };
            case 4:
                if (currentPlayer.score >= 200) {
                    console.log(`Game over ${currentPlayer} wins!`)
                } else {
                    break
                };
            case 5:
                if (currentPlayer.score >= 250) {
                    console.log(`Game over ${currentPlayer} wins!`)
                } else {
                    break
                };
            case 6:
                if (currentPlayer.score >= 300) {
                    console.log(`Game over ${currentPlayer} wins!`)
                } else {
                    break
                };
            case 7:
                if (currentPlayer.score >= 350) {
                    console.log(`Game over ${currentPlayer} wins!`)
                } else {
                    break

                }
        }
    }
    endOfRound()






    return (<></>)
}

module.exports = CrazyEightsLogic;