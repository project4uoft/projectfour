import Card from "./Card";
import OtherPlayer from './OtherPlayer';

import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import  { checkValidHand } from '../../../../GameUtilities/BigTwoHelper'
const SOCKET_SERVER_URL = "http://localhost:3000";
const PLAY_EVENT_BIGTWO = "playMoveBigTwo";
const PASS_BIGTWO = "passBigTwo";
import CardClass from '../../../../GameUtilities/Card';
// const END_TURN_BULLSHIT = "endTurnBullShit";

import {Typography, Box, Button, Grid, Checkbox} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  boxBS: {
    position: 'relative'
  },
  discardPile: {
    marginTop:'20px',
    marginBottom:'20px',
    display: 'flex',
    justifyContent: 'center',
    height:'150px'
  },
  playerHand: {
    display: 'flex'
  },
  checkBtn: {
    display:'none'
  },
  label:{
    cursor: 'pointer'
  },
  alert: {
    height: '100px'
  },
  topText: {
    whiteSpace: 'pre-wrap'
  }
}));

const BigTwoPanel = ({ gameBoard, player }) => {
  const classes = useStyles();
  const [numSelected, setNumSelected] = useState([]);
  
  const [topMessage, setTopMessage] = useState(null)
  const [bottomMessage, setBottomMessage] = useState(null)

  let playerIndex = gameBoard.players.indexOf(player);
  const playerOrder = [];
  for(let i = 1; i < gameBoard.players.length; i++){
    playerOrder.push((playerIndex + i)%gameBoard.players.length)
  }

  const router = useRouter();
  const { roomId } = router.query; // Gets roomId from URL

  const socketRef = useRef();
  socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
    query: { roomId },
  });

  const handleCheck = (event) => {
    setBottomMessage('')
    let isSelected = event.currentTarget.checked;
    if (isSelected) {
      let maxNum = gameBoard.lastPlayedHand.length === 0 ? 5 : gameBoard.lastPlayedHand.length;
      
      if (numSelected.length < maxNum) {
        let temp = [...numSelected];
        temp.push(parseInt(event.currentTarget.value));
        setNumSelected(temp);
      } else {
        event.preventDefault();
        event.currentTarget.checked = false;
      }
    } else {
      let temp = numSelected.filter(
        (i) => i !== parseInt(event.currentTarget.value)
      );
      setNumSelected(temp);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let tempHand = []
    for(let i = 0; i < numSelected.length; i++){
      tempHand.push(player.playerCards[numSelected[i]]);
    }

    if(gameBoard.firstMove && !numSelected.includes(0)){
      setBottomMessage(`You must play a hand with ${player.playerCards[0].rank} of ${player.playerCards[0].suit}`)
    }
    else if(!checkValidHand(gameBoard.lastPlayedHand.map(card => new CardClass(card.suit, card.rank)), tempHand.map(card => new CardClass(card.suit, card.rank)))){
      setBottomMessage(`Invalid move`)
    }
    else{
      socketRef.current.emit(PLAY_EVENT_BIGTWO, {
        roomId: roomId,
        playerName: player.playerName,
        cardIndices: numSelected,
      });
      setBottomMessage('')
      setNumSelected([]);
    }
  };

  const handlePass = (event) => {
    event.preventDefault();
    socketRef.current.emit(PASS_BIGTWO, {
      roomId: roomId
    });
    setNumSelected([]);
    setBottomMessage('')
  };

  useEffect(() =>{
    
    let message = '';
    if(!gameBoard.firstMove && gameBoard.lastPlayedHand.length === 0) message += 'Everyone passed!\n'
    else if(gameBoard.playerPassed) message += `${gameBoard.playerPassed.playerName} passed!\n`

    if(gameBoard.currentPlayer.playerName ===
      player.playerName){
        message += "It is your turn!"
      }
    else{
      message += `It is ${gameBoard.currentPlayer.playerName}'s turn!`
    }
    setTopMessage(message)

  },[gameBoard.firstMove, gameBoard.currentPlayer, gameBoard.playerPassed])

  return (
    <Box className={classes.boxBS}>
      <Typography align="center">
        <Typography variant="h3">
          Big Two
        </Typography>


        <Typography variant="h4" className={classes.topText}>
          {topMessage}
        </Typography>

        <OtherPlayer players={playerOrder.map(index => gameBoard.players[index])
        } />

        <Grid container spacing={3} className={classes.discardPile}>
          <Grid item xs={12}>
            <Typography variant="h5">
              Current Play
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent='center'>
              {gameBoard.lastPlayedHand.map((card, index) => (
                <Card key={`card-played-${index}`} rank={card.rank} suit={card.suit} checked={false}/>
              ))}
            </Box>
          </Grid>

        </Grid>

      </Typography>

      <Typography variant="h4"
       className={classes.alert}
       >
        {bottomMessage}
      </Typography>

      <form onSubmit={handleSubmit}>
        <Box 
          className={classes.playerHand}
          display="flex"
          flexWrap="wrap"
        >
          {player.playerCards.map((card, index) => (
            <div key={index}>
              <input
                type="checkbox"
                key={`${card.rank}${card.suit}`}
                disabled={
                  !(gameBoard.currentPlayer.playerName ===
                    player.playerName)
                }
                onChange={handleCheck}
                value={index}
                id={`your-card-${index}`}
                className={classes.checkBtn}
              />
            <label for={`your-card-${index}`} className={classes.label}>
              <Card rank={card.rank} suit={card.suit} checked={numSelected.includes(index)}/>
            </label>
            </div>
          ))}
        </Box>

        <Button 
          variant="contained" 
          color="primary"
          type="submit"
          disabled={
            !(gameBoard.currentPlayer.playerName ===
              player.playerName)
          }
        >
          Play
        </Button>
        <Button 
          variant="contained" 
          color="primary"
          onClick={handlePass}
          disabled={
            !(gameBoard.currentPlayer.playerName ===
                player.playerName && gameBoard.lastPlayedHand.length !== 0)
          }
        >
          Pass
        </Button>
      </form>
    </Box>
  );
};

export default BigTwoPanel;
