import Card from "./Card";
import YellAlert from "./YellAlert";
import FlippedCard from "./FlippedCard";
import OtherPlayer from "./OtherPlayer";

import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
const SOCKET_SERVER_URL = "http://localhost:3000";
const PLAY_EVENT_BULLSHIT = "playMoveBullShit";
const CALL_BULLSHIT = "callBullShit";
const PASS_BULLSHIT = "passBullShit";
const END_TURN_BULLSHIT = "endTurnBullShit";

import { Typography, Box, Button, Grid, Checkbox } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  boxBS: {
    position: "relative",
  },
  discardPile: {
    marginTop: "20px",
    marginBottom: "20px",
    display: "flex",
    justifyContent: "center",
  },
  playerHand: {
    display: "flex",
  },
  checkBtn: {
    display: "none",
  },
  label: {
    cursor: "pointer",
  },
}));

const BullShitPanel = ({ gameBoard, player }) => {
  const classes = useStyles();
  const [numSelected, setNumSelected] = useState([]);
  const [alert, setAlert] = useState(false);

  const [topMessage, setTopMessage] = useState(null);
  const [bottomMessage, setBottomMessage] = useState(null);
  const [pass, setPass] = useState(false);
  const [bluffing, setBluffing] = useState(false);

  const router = useRouter();
  const { roomId } = router.query; // Gets roomId from URL

  const socketRef = useRef();
  socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
    query: { roomId },
  });

  const handleCheck = (event) => {
    let isSelected = event.currentTarget.checked;
    if (isSelected) {
      if (numSelected.length < 4) {
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

    socketRef.current.emit(PLAY_EVENT_BULLSHIT, {
      roomId: roomId,
      playerName: player.playerName,
      cardIndices: numSelected,
    });
    setNumSelected([]);
  };

  const handleYes = (event) => {
    event.preventDefault();

    socketRef.current.emit(CALL_BULLSHIT, {
      roomId: roomId,
      playerName: player.playerName,
    });
  };

  const handleNo = (event) => {
    event.preventDefault();
    socketRef.current.emit(PASS_BULLSHIT, {
      roomId: roomId,
      playerName: player.playerName,
    });
    setPass(true);
  };

  useEffect(() => {
    let timer;

    setBluffing(false);
    if (!gameBoard.bluffPhase) {
      if (
        gameBoard.players[gameBoard.currentPlayerPos].playerName ===
        player.playerName
      ) {
        setTopMessage("It is your turn!");
      } else {
        setTopMessage(
          `It is ${
            gameBoard.players[gameBoard.currentPlayerPos].playerName
          }'s turn!`
        );
      }
      setBottomMessage(null);
      setPass(false);
    } else {
      if (gameBoard.bluff === "null") {
        setBluffing(false);
        if (
          gameBoard.players[gameBoard.currentPlayerPos].playerName ===
          player.playerName
        ) {
          setTopMessage(`You played ${gameBoard.lastCallAmount} cards`);
          setBottomMessage(<div>Seeing if anyone believes you!</div>);
        } else {
          setTopMessage(
            `${
              gameBoard.players[gameBoard.currentPlayerPos].playerName
            } played ${gameBoard.lastCallAmount} cards`
          );
          if (!pass) {
            setBottomMessage(
              <div>
                Would you like to call{" "}
                {gameBoard.players[gameBoard.currentPlayerPos].playerName}{" "}
                bluff? <br />
                <Button
                  variant="contained"
                  color="primary"
                  className="buttonBluff"
                  onClick={handleYes}
                >
                  Yes
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className="buttonBluff"
                  onClick={handleNo}
                >
                  No
                </Button>
              </div>
            );
          } else {
            setBottomMessage(<div>Waiting for other players to decide.</div>);
          }
        }
      } else if (gameBoard.bluff === "pass") {
        setBluffing(false);
        if (
          gameBoard.players[gameBoard.currentPlayerPos].playerName ===
          player.playerName
        ) {
          setBottomMessage(<div>Everyone believed you.</div>);
        } else {
          setBottomMessage(
            <div>
              Everyone believed{" "}
              {gameBoard.players[gameBoard.currentPlayerPos].playerName}
            </div>
          );
        }
        timer = setTimeout(() => {
          socketRef.current.emit(END_TURN_BULLSHIT, {
            roomId: roomId,
          });
        }, 2000);
      } else if (gameBoard.bluff === "truth" || gameBoard.bluff === "bluff") {
        setAlert(true);
        timer = setTimeout(() => {
          setAlert(false);
        }, 2000);
        setBluffing(true);
        if (gameBoard.bluff === "truth") {
          if (
            gameBoard.players[gameBoard.currentPlayerPos].playerName ===
            player.playerName
          ) {
            setTopMessage(
              `${gameBoard.playerWhoCalledBluff.playerName} called you bluff.`
            );
            setBottomMessage(
              <div>Thank goodness you were telling the truth!</div>
            );
          } else if (
            gameBoard.playerWhoCalledBluff.playerName === player.playerName
          ) {
            setTopMessage(
              `You called ${
                gameBoard.players[gameBoard.currentPlayerPos].playerName
              } bluff.`
            );
            setBottomMessage(
              <div>
                Uh oh, it looks like{" "}
                {gameBoard.players[gameBoard.currentPlayerPos].playerName} was
                telling the truth!
              </div>
            );
          } else {
            setTopMessage(
              `${gameBoard.playerWhoCalledBluff.playerName} called ${
                gameBoard.players[gameBoard.currentPlayerPos].playerName
              } bluff.`
            );
            setBottomMessage(
              <div>
                It looks like{" "}
                {gameBoard.players[gameBoard.currentPlayerPos].playerName} was
                telling the truth!
              </div>
            );
          }
        } else {
          if (
            gameBoard.players[gameBoard.currentPlayerPos].playerName ===
            player.playerName
          ) {
            setTopMessage(
              `${gameBoard.playerWhoCalledBluff.playerName} called you bluff.`
            );
            setBottomMessage(<div>Oh no, you got caught!</div>);
          } else if (
            gameBoard.playerWhoCalledBluff.playerName === player.playerName
          ) {
            setTopMessage(
              `You called ${
                gameBoard.players[gameBoard.currentPlayerPos].playerName
              } bluff.`
            );
            setBottomMessage(
              <div>
                And you caught{" "}
                {gameBoard.players[gameBoard.currentPlayerPos].playerName}{" "}
                lying!
              </div>
            );
          } else {
            setTopMessage(
              `${gameBoard.playerWhoCalledBluff.playerName} called ${
                gameBoard.players[gameBoard.currentPlayerPos].playerName
              } bluff.`
            );
            setBottomMessage(
              <div>
                It looks like{" "}
                {gameBoard.players[gameBoard.currentPlayerPos].playerName} was
                caught lying!
              </div>
            );
          }
        }
        console.log("bluffing", bluffing);
        timer = setTimeout(() => {
          socketRef.current.emit(END_TURN_BULLSHIT, {
            roomId: roomId,
          });
        }, 5000);
      }
    }
  }, [gameBoard.bluff, gameBoard.bluffPhase, pass]);

  return (
    <Box className={classes.boxBS}>
      <Typography align="center">
        <Typography variant="h3">BullShit</Typography>

        <Typography variant="h4">
          Current call: {gameBoard.ranks[gameBoard.currentCall]}
        </Typography>

        <Typography variant="h4">{topMessage}</Typography>

        <OtherPlayer
          players={gameBoard.players.filter(
            (p) => p.playerName !== player.playerName
          )}
        />

        <Grid container spacing={3}>
          <Grid item xs={6} className={classes.discardPile}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h5">Discard pile</Typography>
              </Grid>

              <Grid item xs={12}>
                <Box display="flex" justifyContent="center">
                  {!bluffing ? (
                    <FlippedCard
                      text={
                        gameBoard.discardPile.length -
                        gameBoard.lastPlayedHand.length
                      }
                    />
                  ) : (
                    <FlippedCard text={gameBoard.discardPile.length} />
                  )}
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} className={classes.discardPile}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h5">Current Play</Typography>
              </Grid>

              <Grid item xs={12}>
                {!bluffing ? (
                  <Box display="flex" justifyContent="center">
                    {gameBoard.lastPlayedHand.map((card, index) => (
                      <FlippedCard key={`card-flipped-${index}`} text="" />
                    ))}
                  </Box>
                ) : (
                  <Box display="flex" justifyContent="center">
                    {gameBoard.lastPlayedHand.map((card, index) => (
                      <Card
                        key={`card-played-${index}`}
                        rank={card.rank}
                        suit={card.suit}
                        checked={false}
                      />
                    ))}
                  </Box>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Typography>

      <Typography variant="h4">{bottomMessage}</Typography>

      <form onSubmit={handleSubmit}>
        <Box className={classes.playerHand} display="flex" flexWrap="wrap">
          {player.playerCards.map((card, index) => (
            <div key={index}>
              <input
                type="checkbox"
                key={`${card.rank}${card.suit}`}
                disabled={
                  !(
                    !gameBoard.bluffPhase &&
                    gameBoard.players[gameBoard.currentPlayerPos].playerName ===
                      player.playerName
                  )
                }
                onChange={handleCheck}
                value={index}
                id={`your-card-${index}`}
                className={classes.checkBtn}
              />
              <label for={`your-card-${index}`} className={classes.label}>
                <Card
                  rank={card.rank}
                  suit={card.suit}
                  checked={numSelected.includes(index)}
                />
              </label>
            </div>
          ))}
        </Box>

        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={
            !(
              !gameBoard.bluffPhase &&
              gameBoard.players[gameBoard.currentPlayerPos].playerName ===
                player.playerName
            )
          }
        >
          Play
        </Button>
      </form>
      {alert && <YellAlert />}
    </Box>
  );
};

export default BullShitPanel;
