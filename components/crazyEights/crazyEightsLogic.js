import React, { useState } from 'react'
const Deck = require('./crazyEightsDeck');
import Card from './components/CardComponent'
import DiscardPile from './components/DiscardPile'


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
    const [readyRender, setReadyRender] = useState(false)
    const [discardPile, setDiscardPile] = useState([])
    const [stockPile, setStockPile] = useState([])
    let currentSuit = ''
    let numPlayers = players.length;
    let currentPlayerIndex = 0
    // let stockPile = []
    //this will change depending on number of logged in users - dynamic??
    let loggedInUsersIndex = 1
    let loggedInUsersPosition = players[loggedInUsersIndex]

    //Creates new shuffled deck
    let cardDeck = new Deck()
    cardDeck.createDeck()
    cardDeck.shuffleDeck()



    function dealHands() {
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
                console.log("loggedInUsersPosition:", loggedInUsersPosition)
                //Removing the nested array that occured when pushing card obj's into the players hand
                players[i].hand = Array.prototype.concat.apply([], players[i].hand);
                console.log("players hand:", players[i].hand)
                console.log("players", players)
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
        // setStock()
        //It's a nested array but can't figure out how to change it :( and make it work 
        setStockPile([...stockPile, cardDeck.cards])

    }


    function setTable() {

        console.log("stock in set table:", stockPile)

        //Pick the top card to be the first starter card
        let topCard = stockPile[0][0]
        console.log("top card:", topCard)

        // //Move the top ard from the stockpile to the discard pile
        setDiscardPile([...discardPile, topCard])
        console.log("discard pile:", discardPile)

        // //Set the starting suit to that of the top card
        currentSuit = topCard.suit
        console.log("first currentSuit:", currentSuit)

        // //Pick a random dealer
        let dealer = players[Math.floor(Math.random() * numPlayers)]
        let dealerPosition = players.indexOf(dealer)

        // //First person to paly is left of the dealer
        let currentPlayerIndex = dealerPosition + 1
        console.log("current player index:", currentPlayerIndex)

        setReadyRender(true)
    }



    //Set the current player
    let currentPlayer = players[currentPlayerIndex]
    console.log("current player:", currentPlayer)

    const [playedCard, setPlayedCard] = useState({})
    console.log("playedCard:", playedCard)

    //Set the card chosen by the user
    const selectedCard = (suit, rank, value) => {
        let chosenCard = {
            "suit": suit,
            "rank": rank,
            "value": value
        }
        setPlayedCard(chosenCard)
        makeMove(currentPlayer, chosenCard)
    }


    // card must match number, or suit, or AN EIGHT, or draw from the pile and continue their turn. 
    const makeMove = (currentPlayer, playedCard) => {

        console.log("moveplayedCard:", playedCard)
        console.log("moveplayedCard suit:", playedCard.suit)
        console.log("moveplayedCard rank:", playedCard.rank)
        console.log("makemove discard:", discardPile[discardPile.length - 1])
        console.log("makemove discard suit:", discardPile[discardPile.length - 1].suit)
        console.log("makemove discard rank:", discardPile[discardPile.length - 1].rank)


        if (playedCard.rank != discardPile[discardPile.length - 1].rank && playedCard.suit != discardPile[discardPile.length - 1].suit) {
            console.log("can't play this card")
            let input = prompt()
            prompt("Would you like to try another card in your hand?")
            if (input == "yes") {
                return;
            } else {

                if (stockPile.length > 0) {
                    currentPlayer.hand.push(stockPile[0].length - 1)
                    console.log(currentPlayer.hand)
                } else {
                    console.log("we need to shuffle the deck")
                    // resetStockPile()
                    // currentPlayer.hand.push(stockpile.length - 1)
                    // offer option of mave move or pass
                    // makeMove()
                    // endMove()
                }

            }
        }

        // If the players card suit matches the last card added to the pile 
        else if (playedCard.suit === discardPile[discardPile.length - 1].suit) {
            console.log("the card suit matches, card accepted")

            //Get the index of the played card in the payers hand
            const playedCardIndex = currentPlayer.hand.findIndex(x => x.suit === playedCard.suit && playedCard.rank)
            console.log("players hand:", currentPlayer.hand)
            console.log("playedCard index:", playedCardIndex)
            const cardspliced = currentPlayer.hand.splice(playedCardIndex, 1)
            const cardRemovedFromHand = cardspliced[0]
            console.log("card removed from array:", cardRemovedFromHand)
            console.log("removed from hand: ", cardspliced)

            //Remove from the hand and push to the discard pile
            setDiscardPile([...discardPile, cardRemovedFromHand])

            //Flatten the discard pile, so there are no nested arrays
            // discardPile = Array.prototype.concat.apply([], discardPile);
            console.log(discardPile)

        }

        else if (playedCard.rank === discardPile[discardPile.length - 1].rank) {
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

    const pickUp = () => {
        if (stockPile.length > 0) {
            currentPlayer.hand.push(stockPile[0].length - 1)
            console.log(currentPlayer.hand)
        } else {
            console.log("we need to shuffle the deck")
            // resetStockPile()
            // currentPlayer.hand.push(stockpile.length - 1)
            // offer option of mave move or pass
            // makeMove()
            // endMove()
        }
    }

    //End turn and move to the next player
    const EndTurnMovePlayer = () => {
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


    //Reshuffle the pile of cards
    const resetStockPile = () => {
        discardPile.shuffleDeck()
        stockPile = disCardPile
    }


    //Instigate the end of the game 
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
        const checkWinner = () => {
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
    }
    //Deal the hands
    //First player picks a card

    return (<>
        <div className="container">
            <button onClick={() => dealHands()}>1. Deal Cards</button>
            <button onClick={() => setTable()}>2. Set Table</button>
            <p>Players hand:</p>
            {readyRender && currentPlayer.hand.map(card => {
                return (
                    <Card key={card.rank + card.suit} rank={card.rank} suit={card.suit} selectedCard={selectedCard} value={card.value} />)
            })}
            <p>Other Players Hands:</p>
            {readyRender && players.map(player => player.hand.map(card => {
                return (
                    <Card key={card.rank + card.suit} rank={card.rank} suit={card.suit} selectedCard={selectedCard} value={card.value} />)
            }))}

            <p>Discard Pile:</p>
            {discardPile && <DiscardPile discardPile={discardPile} />}
            <p>Game Moves:</p>
            <button>Make Move</button>
            <button  onClick={() => pickUp()}>Pick Up Card</button>
        </div>
    </>)
}

module.exports = CrazyEightsLogic;