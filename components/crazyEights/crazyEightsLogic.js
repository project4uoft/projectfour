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
            score: 0,
            gamesWon: 0
        },
        {
            position: 2,
            hand: [],
            score: 0,
            gamesWon: 0
        }
    ])

    const [discardPile, setDiscardPile] = useState([])
    const [stockPile, setStockPile] = useState([])
    const [currentSuit, setCurrentSuit] = useState('')
    const [playedCard, setPlayedCard] = useState({})
    const [dealer, setDealer] = useState()
    const [currentPlayer, setCurrentPlayer] = useState()
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState()
    const [playerSet, setPlayerSet] = useState(false)
    const [passVisible, setPassVisible] = useState(false)
    const [cardPickedUp, setCardPickedUp] = useState(false)
    const [splicedStockPileCardObj, setSplicedStockPileCardObj] = useState({})
    const [validCardPlayed, setValidCardPlayed] = useState(false)
    const [gameOver, setGameOver] = useState()

    const dealerPosition = players.indexOf(dealer)


    let numPlayers = players.length;
    //this will change depending on number of logged in users - dynamic??
    let loggedInUsersIndex = 1
    let loggedInUsersPosition = players[loggedInUsersIndex]

    function dealHands() {
        setGameOver(false)
        //Creates new shuffled deck
        let cardDeck = new Deck()
        cardDeck.createDeck()
        cardDeck.shuffleDeck()
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
        for (var i = 0; i < players.length; i++) {
            console.log(players[i].hand)
        }
    }

    //set the first player once the dealer has been set
    useEffect(() => {
        if (dealerPosition === players.length - 1) {
            setCurrentPlayer(players[0])
            setCurrentPlayerIndex(0)
        } else if (dealerPosition < players.length - 1) {
            setCurrentPlayer(players[dealerPosition + 1])
            setCurrentPlayerIndex(dealerPosition + 1)
        }
    }, [dealer])


    function setTable() {
        //Pick the top card to be the first starter card
        let topCardInArray = stockPile.splice(0, 1)
        let topCard = topCardInArray[0]
        // //Move the top ard from the stockpile to the discard pile
        setDiscardPile([...discardPile, topCard])
        // //Set the starting suit to that of the top card
        setCurrentSuit(topCard.suit)
    }

    //Set the card chosen by the user
    const selectedCard = (suit, rank, value) => {
        let chosenCard = {
            "suit": suit,
            "rank": rank,
            "value": value
        }
        setPlayedCard(chosenCard)
        makeMove(currentPlayer, chosenCard)
        console.log("setiting played card from clcick event", chosenCard)
    }

    // card must match number, or suit, or AN EIGHT, or draw from the pile and continue their turn. 
    const makeMove = (currentPlayer, playedCard) => {
       
        for (var i = 0; i < currentPlayer.hand.length; i++){
            console.log([i], currentPlayer.hand[i])
        }
        for(var i = 0; i < players[currentPlayerIndex].hand.length; i++){
            console.log([i], players[currentPlayerIndex].hand[i])
        }

        //If the user plays a card with the number '8', they can play anytime and chagne the current suit
        if (playedCard.rank === "8") {
            //Get the index of the played card in the payers hand
            const playedCardIndex = currentPlayer.hand.findIndex(x => x.suit === playedCard.suit && x.rank === playedCard.rank)
            //Pull the object out of the array it's in 
            const cardRemovedFromHand = currentPlayer.hand[playedCardIndex]
            //Add it to the discard pile
            setDiscardPile([...discardPile, cardRemovedFromHand])
            //Let the user set the suit for the next turn
            const suitChange = prompt("What suit would you like to make the next play?")
            let lowerSuit;
            if (!suitChange) {
                lowerSuit = cardRemovedFromHand.suit
            } else {
                lowerSuit = suitChange.toLowerCase()
            }
            setCurrentSuit(lowerSuit)
            setValidCardPlayed(true)
            return
        }

        // If the players card suit matches the last card added to the pile 
        if (playedCard.suit === currentSuit) {
            console.log("suit matches, card accepted")

            //Get the index of the played card in the current players hand
            const playedCardIndex = currentPlayer.hand.findIndex(x => x.suit === playedCard.suit && x.rank === playedCard.rank)

            //Get the card using the index found
            const cardRemovedFromHand = currentPlayer.hand[playedCardIndex]

            //Remove from the hand and push to the discard pile
            setDiscardPile([...discardPile, cardRemovedFromHand])
            setValidCardPlayed(true)
            return
        } 


        if (playedCard.rank === discardPile[discardPile.length - 1].rank) {
            console.log("the card number matches, card accepted, changing suit")

            // The user should be able to choose the suit
            const playedCardIndex = currentPlayer.hand.findIndex(x => x.suit === playedCard.suit && x.rank === playedCard.rank)

            //Remove from the hand and push to the discard pile
            const cardRemovedFromHand = currentPlayer.hand[playedCardIndex]

            //Remove from the hand and push to the discard pile
            setDiscardPile([...discardPile, cardRemovedFromHand])
            setCurrentSuit(playedCard.suit)
            setValidCardPlayed(true)
            return
        }
    }

    useEffect(() => {
        //To able to run when current player has a value
        if (currentPlayer && validCardPlayed) {
            const playedCardIndex = players[currentPlayerIndex].hand.findIndex(x => x.suit === playedCard.suit && x.rank === playedCard.rank)

            //Remove the card from the current players hand
            currentPlayer.hand.splice(playedCardIndex, 1)

            //Make copy of players
            let playersCopy = [...players]

            // //Create copy of the the obj and then rewriting the value to change
            playersCopy[currentPlayerIndex] = { ...playersCopy[currentPlayerIndex], hand: currentPlayer.hand }

            setPlayers(playersCopy)
            EndTurnMovePlayer()

        }
        
        setValidCardPlayed(false)
        //Only execute when the below state is changed 
    }, [validCardPlayed])


    const pickUp = () => {
        setPassVisible(true)
        setCardPickedUp(true)

        if (stockPile.length > 0) {
            let splicedFromStockPile = stockPile.splice(stockPile[0], 1)
            let cardObjectRemovedArray = splicedFromStockPile[0]
            setSplicedStockPileCardObj(cardObjectRemovedArray)
            setPlayerSet(true)

        } else {
            console.log("we need to shuffle the deck")
            resetStockPile()
            let splicedFromStockPile = stockPile.splice(stockPile[0], 1)
            let cardObjectRemovedArray = splicedFromStockPile[0]

            setSplicedStockPileCardObj(cardObjectRemovedArray)

            setPlayerSet(true)

        }
    }

    //Set the main players array to have the extra card in current players hand when current player is updated
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
            //redefine the one object we want to update using bracket notatation for the index
            //Create copy of the the obj and then rewriting the value to change
            playersCopy[currentPlayerIndex] = { ...playersCopy[currentPlayerIndex], hand: [...playersCopy[currentPlayerIndex].hand, splicedStockPileCardObj] }

            setPlayers(playersCopy)
        }
        setPlayerSet(false)
    }, [playerSet])
    

    const EndTurnMovePlayer = () => {
        //Allows the next player to pick up a card again
        setCardPickedUp(false)
        // hides the pass button until the next player picks up a card if they have to
        setPassVisible(false)

        for (var i = 0; i < players.length; i++) {
            if (players[i].hand.length === 0) {
                console.log(`GAME OVER! Player ${currentPlayer.position} wins this round!`)
                endOfRound();
            } else {
                continue
            }
        }

        // If the index of the current player is the last in the array, go to the start [0] again
        if (currentPlayerIndex === players.length - 1) {
            setCurrentPlayer(players[0])
            setCurrentPlayerIndex(0)

        } else {
            setCurrentPlayer(players[currentPlayerIndex + 1])
            setCurrentPlayerIndex(currentPlayerIndex + 1)
        }
    }


    //Reshuffle the pile of cards
    const resetStockPile = () => {
        for (let i = discardPile.length - 1; i >= 0; i--) {
            let j = Math.floor(Math.random() * i + 1);
            let temp = discardPile[i];
            discardPile[i] = discardPile[j];
            discardPile[j] = temp;
        }
        setStockPile(discardPile)
    }


    //Instigate the end of the game 
    const endOfRound = () => {
        // If the current player has no cards left
        if (currentPlayer.hand.length === 0) {
            // Look at each of the players hands and calculate the total value
            const sum = () => {
                for (var i = 0; i < players.length; i++) {
                    for (var j = 0; j < players[i].hand.length; j++) {
                        currentPlayer.score += players[i].hand[j].value
                        console.log("currentPlayer.score", currentPlayer.score)
                    }
                }
            }
            sum()

            //Make copy of players
            let playersCopy = [...players]
            //redefine the one object we want to update using bracket notatation for the index
            //Create copy of the the obj and then rewriting the value to change
            playersCopy[currentPlayerIndex] = { ...playersCopy[currentPlayerIndex], score: currentPlayer.score }

            for (var i = 0; i < playersCopy.length; i++) {
                playersCopy[i] = { ...playersCopy[i], hand: [] }
            }

            setPlayers(playersCopy)
            checkWinner()
            emptyHands()

            console.log("current player after set players: ", currentPlayer)
        }
    }

    const emptyHands = () => {
         //Reset current players hands to empty
         let tempCurrentPlayer = {
            ...currentPlayer, //<-- shallow state copy
            hand: [...currentPlayer.hand]
        }

        tempCurrentPlayer.hand = []
        setCurrentPlayer(tempCurrentPlayer)

        console.log("current player after set current palyer: ", currentPlayer)

        //Make copy of all players
        let playersCopy = [...players]
        //Create copy of the the obj and then rewriting the hands to empty

        for (var i = 0; i < playersCopy.length; i++) {
            playersCopy[i] = { ...playersCopy[i], hand: []}
        }

        setPlayers(playersCopy)

    }

    const endGame = () => {
        setGameOver(true)

        //Reset current players hands to empty
        let tempCurrentPlayer = {
            ...currentPlayer, //<-- shallow state copy
            hand: [...currentPlayer.hand]
        }

        tempCurrentPlayer.hand = []
        setCurrentPlayer(tempCurrentPlayer)

        console.log("current player after set current palyer: ", currentPlayer)

        //Make copy of all players
        let playersCopy = [...players]
        //Create copy of the the obj and then rewriting the hands to empty

        for (var i = 0; i < playersCopy.length; i++) {
            playersCopy[i] = { ...playersCopy[i], hand: [], score: 0 }
        }
        //give one point to the winner
        playersCopy[currentPlayerIndex] = { ...playersCopy[currentPlayerIndex], gamesWon: + 1 }
        setPlayers(playersCopy)
        console.log("current player after set players: ", currentPlayer)


        console.log("code completed to change hand to empty ")
        setDiscardPile([])
        setStockPile([])
    }

    // check to see if there's a winner
    const checkWinner = () => {
        console.log("checking for a winner")
        switch (players.length) {
            case 2:
                console.log("case 2 players was hit")
                if (players[currentPlayerIndex].score >= 100) {
                    console.log(`Game over Player${currentPlayer.position} wins!`)
                    endGame()
                } else {
                    console.log(`Next Round`)
                    break
                };
            case 3:
                if (players[currentPlayerIndex].score >= 150) {
                    console.log(`Game over Player ${currentPlayer.position} wins!`)
                    endGame()
                } else {
                    console.log(`Next Round`)
                    break
                };
            case 4:
                if (players[currentPlayerIndex].score >= 200) {
                    console.log(`Game over ${currentPlayer} wins!`)
                    endGame()
                } else {
                    console.log(`Next Round`)
                    break
                };
            case 5:
                if (players[currentPlayerIndex].score >= 250) {
                    console.log(`Game over Player${currentPlayer.position} wins!`)
                    endGame()
                } else {
                    console.log(`Next Round`)
                    break
                };
            case 6:
                if (players[currentPlayerIndex].score >= 300) {
                    console.log(`Game over  Player${currentPlayer.position} wins!`)
                    endGame()
                } else {
                    console.log(`Next Round`)
                    break
                };
            case 7:
                if (players[currentPlayerIndex].score >= 350) {
                    console.log(`Game over Player${currentPlayer.position} wins!`)
                    endGame()
                } else {
                    console.log(`Next Round`)
                    break

                }
        }
    }

    return (<>
        <div className="container">
            {currentPlayer && players.map(player => {
                return <p key={player.position}>Player {player.position} Score: {player.score} Games Won: {player.gamesWon}</p>
            })}
            <button onClick={() => dealHands()}>1. Deal Cards</button>
            <button onClick={() => setTable()}>2. Set Table</button>
            <button onClick={() => endGame()}>3. Empty Hands</button>
            <button onClick={() => checkWinner()}>4. Check Winner</button>
            <h1>Current suit: {currentSuit}</h1>
            <p>Players hand:</p>
            {!gameOver && currentPlayer && currentPlayer.hand.map(card => {
                return (
                    <Card key={card.rank + card.suit} rank={card.rank} suit={card.suit} selectedCard={selectedCard} value={card.value} />)
            })}
            <p>Other Players Hands:</p>
            {players && currentPlayer && players.map(player => player.hand.map(card => {
                return (
                    <Card key={card.rank + card.suit} rank={card.rank} suit={card.suit} selectedCard={selectedCard} value={card.value} />
                )
            }))}

            <p>Discard Pile:</p>
            {discardPile.length > 0 && <DiscardPile discardPile={discardPile} />}
            <p>Game Moves:</p>
            <div></div>
            <button onClick={() => pickUp(currentPlayer.position)} disabled={cardPickedUp}>Pick Up Card</button>
            <div></div>
            {passVisible ? <button onClick={() => EndTurnMovePlayer()}>Pass</button> : ''}

        </div>
    </>)
}

module.exports = CrazyEightsLogic;