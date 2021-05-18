import React, { useEffect, useState } from 'react'
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
    const [currentSuit, setCurrentSuit] = useState('')
    const [playedCard, setPlayedCard] = useState({})
    // const [currentPlayer, setCurrentPlayer] = useState()
    const [dealer, setDealer] = useState()
    const [currentPlayer, setCurrentPlayer] = useState()
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState()
    const [playerSet, setPlayerSet] = useState(false)
    const [passVisible, setPassVisible] = useState(false)
    const [cardPickedUp, setCardPickedUp] = useState(false)
    const [splicedStockPileCardObj, setSplicedStockPileCardObj] = useState({})
    console.log("playedCard:", playedCard)

    let numPlayers = players.length;
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
        //Flatten the nested arrays
        var stockPileArr = [].concat.apply([], cardDeck.cards);
        setStockPile([...stockPileArr])

        // //Pick a random dealer
        setDealer(players[Math.floor(Math.random() * numPlayers)])
        console.log(dealer)
    }

    console.log(players)
    const dealerPosition = players.indexOf(dealer)
    console.log(dealerPosition)

    //set the first player once the dealer has been set
    useEffect(() => {
        if (dealerPosition === players.length - 1) {
            setCurrentPlayer(players[0])
            setCurrentPlayerIndex(0)
            console.log(currentPlayerIndex)
        } else if (dealerPosition < players.length - 1) {
            setCurrentPlayer(players[dealerPosition + 1])
            setCurrentPlayerIndex(dealerPosition + 1)
        }
    }, [dealer])


    function setTable() {

        //Pick the top card to be the first starter card
        let topCard = stockPile[0]

        // //Move the top ard from the stockpile to the discard pile
        setDiscardPile([...discardPile, topCard])

        // //Set the starting suit to that of the top card
        setCurrentSuit(topCard.suit)

        //buffer function to allow loading - try to remove 
        setReadyRender(true)
    }


    //Set the current player
    console.log("current player:", currentPlayer)


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

        //If the user plays a card with the number '8', they can play anytime and chagne the current suit
        if (playedCard.rank === "8") {
            //Get the index of the played card in the payers hand
            const playedCardIndex = currentPlayer.hand.findIndex(x => x.suit === playedCard.suit && playedCard.rank)
            //Splice the card from the plaers hand
            const cardspliced = currentPlayer.hand.splice(playedCardIndex, 1)
            //Pull the object out of the array it's in 
            const cardRemovedFromHand = cardspliced[0]
            //Add it to the discard pile
            setDiscardPile([...discardPile, cardRemovedFromHand])
            //Let the user set the suit for the next turn
            const suitChange = prompt("What suit would you like to make the next play?")
            setCurrentSuit(suitChange)
            EndTurnMovePlayer()
            return
        }

        // If the players card suit matches the last card added to the pile 
        if (playedCard.suit === discardPile[discardPile.length - 1].suit || playedCard.suit === currentSuit) {
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
            EndTurnMovePlayer()
        }


        else if (playedCard.rank != discardPile[discardPile.length - 1].rank && playedCard.suit != discardPile[discardPile.length - 1].suit) {
            console.log("can't play this card")
            let input = prompt()
            prompt("Would you like to try another card in your hand?")
            if (input == "yes") {
                return;
            } else {
                alert("Picking up a card, since you can't play anything in your hand")
                setCardPickedUp(true)
                setPassVisible(true)

                if (stockPile.length > 0) {

                    let splicedFromStockPile = stockPile.splice(stockPile[0], 1)
                    console.log("splicedFromStockPile", splicedFromStockPile)

                    let splicedStockPileCardObj = splicedFromStockPile[0]
                    console.log(splicedStockPileCardObj)


                    //Add on to hand array with the top card of the stock pile
                    setCurrentPlayer(currentPlayer => ({
                        ...currentPlayer, //< -- Shallow copy state
                        //copy existing nested state array into new array and append new element
                        hand: [...currentPlayer.hand, splicedStockPileCardObj]
                    }))
                } else {
                    console.log("we need to shuffle the deck")
                    resetStockPile()
                    let splicedFromStockPile = stockPile.splice(stockPile[0], 1)
                    console.log("splicedFromStockPile", splicedFromStockPile)
                    let splicedStockPileCardObj = splicedFromStockPile[0]
                    console.log(splicedStockPileCardObj)


                    //Add on to hand array with the top card of the stock pile
                    setCurrentPlayer(currentPlayer => ({
                        ...currentPlayer, //< -- Shallow copy state
                        //copy existing nested state array into new array and append new element
                        hand: [...currentPlayer.hand, splicedStockPileCardObj]
                    }))
                }

            }
        }


        else if (playedCard.rank === discardPile[discardPile.length - 1].rank) {
            console.log("the card number matches, card accepted, changing suit")

            // The user should be able to choose the suit
            const playedCardIndex = currentPlayer.hand.findIndex(x => x.rank === playedCard.rank && playedCard.suit)
            console.log("players hand:", currentPlayer.hand)
            console.log("playedCard index:", playedCardIndex)

            //Remove from the hand and push to the discard pile
            const cardspliced = currentPlayer.hand.splice(playedCardIndex, 1)
            const cardRemovedFromHand = cardspliced[0]

            //Remove from the hand and push to the discard pile
            setDiscardPile([...discardPile, cardRemovedFromHand])
            setCurrentSuit(playedCard.suit)
            EndTurnMovePlayer()
        }

    }


    const pickUp = () => {
        console.log("stockpile", stockPile)
        console.log("stockpile", stockPile[0])
        setPassVisible(true)
        setCardPickedUp(true)

        if (stockPile.length > 0) {

            let splicedFromStockPile = stockPile.splice(stockPile[0], 1)

            let cardObjectRemovedArray = splicedFromStockPile[0]

            setSplicedStockPileCardObj(cardObjectRemovedArray)

            setPlayerSet(true)
            console.log("card added:", cardObjectRemovedArray)

        } else {
            console.log("we need to shuffle the deck")
            resetStockPile()
            let splicedFromStockPile = stockPile.splice(stockPile[0], 1)

            setSplicedStockPileCardObj(splicedFromStockPile[0])

            //Add on to hand array with the top card of the stock pile
            setCurrentPlayer(currentPlayer => ({
                ...currentPlayer, //< -- Shallow copy state
                //copy existing nested state array into new array and append new element
                hand: [...currentPlayer.hand, splicedStockPileCardObj]
            }))
            setPlayerSet(true)

        }
    }
    //Set the main players array to have the extra card in hand when current player is updated

    useEffect(() => {
        //Adding conditional so that this only runs once the playerSetValue is true
        if (playerSet && splicedStockPileCardObj) {

            setCurrentPlayer(currentPlayer => ({
                ...currentPlayer, //< -- Shallow copy state
                //copy existing nested state array into new array and append new element
                hand: [...currentPlayer.hand, splicedStockPileCardObj]
            }))

            //Make copy of players
            let playersCopy = [...players]
            //get index of current hand
            //redefine the one object we want to update using bracket notatation for the index
            //Create copy of the the obj and then rewriting the value to change

            playersCopy[currentPlayerIndex] = { ...playersCopy[currentPlayerIndex], hand: [...playersCopy[currentPlayerIndex].hand, splicedStockPileCardObj] }

            setPlayers(playersCopy)
            // playersCopy[currentPlayerIndex].hand = [...currentPlayer.hand, splicedStockPileCardObj]
        }

    }, [playerSet])



    console.log(players)
    console.log(currentPlayer)


    const EndTurnMovePlayer = () => {

        if (currentPlayer.hand.length === 0) {
            console.log("gameover")
            roundOver();
        }
        //Allows the next player to pick up a card again
        setCardPickedUp(false)
        // hides the pass button until the next player picks up a card if they have to
        setPassVisible(false)

        // If the index of the current player is the last in the array, go to the start [0] again
        console.log("current", currentPlayer)
        if (currentPlayerIndex === players.length - 1) {
            setCurrentPlayer(players[0])
            setCurrentPlayerIndex(0)

        } else {
            setCurrentPlayer(players[currentPlayerIndex + 1])
            setCurrentPlayerIndex(currentPlayerIndex + 1)
            console.log("adding one to current index:", currentPlayer)
        }
        console.log(currentPlayer)
    }


    //Reshuffle the pile of cards
    const resetStockPile = () => {
        discardPile.shuffleDeck()
        setStockPile(disCardPile)
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
    console.log(currentPlayer)
    console.log(players)
    // console.log(currentPlayerposition)
    // console.log(currentPlayer.hand)
    console.log(stockPile)
    console.log(discardPile)
    return (<>
        <div className="container">
            <button onClick={() => dealHands()}>1. Deal Cards</button>
            <button onClick={() => setTable()}>2. Set Table</button>
            <h1>current suit: {currentSuit}</h1>
            <p>Players hand:</p>
            {currentPlayer && currentPlayer.hand.map(card => {
                return (
                    <Card key={card.rank + card.suit} rank={card.rank} suit={card.suit} selectedCard={selectedCard} value={card.value} />)
            })}
            <p>Other Players Hands:</p>
            {currentPlayer && players.map(player => player.hand.map(card => {
                return (
                    <Card key={card.rank + card.suit} rank={card.rank} suit={card.suit} selectedCard={selectedCard} value={card.value} />)
            }))}

            <p>Discard Pile:</p>
            {discardPile.length > 0 && <DiscardPile discardPile={discardPile} />}
            <p>Game Moves:</p>
            <button>Make Move</button>
            <div></div>
            <button onClick={() => pickUp(currentPlayer.position)} disabled={cardPickedUp}>Pick Up Card</button>
            <div></div>
            {passVisible ? <button onClick={() => EndTurnMovePlayer()}>Pass</button> : ''}

        </div>
    </>)
}

module.exports = CrazyEightsLogic;