import Card from "./Card";

import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
const SOCKET_SERVER_URL = "http://localhost:3000";
const PLAY_EVENT_BULLSHIT = "playMoveBullShit";
const CALL_BULLSHIT = "callBullShit";
const PASS_BULLSHIT = "passBullShit";

const BullShitPanel = ({ gameBoard, player }) => {
  const [numSelected, setNumSelected] = useState([]);

  const router = useRouter();
  const { roomId, playerName } = router.query; // Gets roomId from URL

  const socketRef = useRef();
  socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
    query: { roomId },
  });

  const handleCheck = (event) => {
    console.log(numSelected);
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
  };

  return (
    <div className="container mx-auto">
      <div className="text-center">
        <h1 className="mb-3 text-2xl font-bold">BullShit</h1>
        <h2>Discard pile: {gameBoard.discardPile.length}</h2>
        {gameBoard.players
          .filter((p) => p.playerName !== player.playerName)
          .map((p, i) => (
            <div key={i}>
              Player: {p.playerName} | Cards Left: {p.playerCards.length}
            </div>
          ))}
        <h2>Current call: {gameBoard.ranks[gameBoard.currentCall]}</h2>
        {gameBoard.bluffPhase ? (
          <h2>
            {gameBoard.players[gameBoard.currentPlayerPos].playerName} played{" "}
            {gameBoard.lastCallAmount} cards.
            {gameBoard.players[gameBoard.currentPlayerPos].playerName ==
            player.playerName ? (
              <div>Seeing if anyone believes you!</div>
            ) : player.playerCards.length === 0 ? null : (
              <div>
                Would you like to call{" "}
                {gameBoard.players[gameBoard.currentPlayerPos].playerName}{" "}
                bluff? <br />
                <button
                  className="px-2 py-1 mx-2 text-blue-700 bg-transparent border border-blue-500 rounded hover:bg-blue-500 hover:text-white hover:border-transparent"
                  onClick={handleYes}
                >
                  Yes
                </button>
                <button
                  className="px-2 py-1 mx-2 text-red-500 bg-transparent border border-red-500 rounded hover:bg-red-500 hover:text-white hover:border-transparent"
                  onClick={handleNo}
                >
                  No
                </button>
              </div>
            )}
          </h2>
        ) : (
          <h2>
            It is{" "}
            {gameBoard.players[gameBoard.currentPlayerPos].playerName ===
            player.playerName ? (
              <span>your turn</span>
            ) : (
              <span>
                {gameBoard.players[gameBoard.currentPlayerPos].playerName}'s
                turn
              </span>
            )}
          </h2>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap justify-center max-w-5xl mx-auto mt-1">
          {player.playerCards.map((card, index) => (
            <label key={index}>
              <input
                key={`${card.rank}${card.suit}`}
                type="checkbox"
                disabled={
                  !(
                    !gameBoard.bluffPhase &&
                    gameBoard.players[gameBoard.currentPlayerPos].playerName ===
                      player.playerName
                  )
                }
                onChange={handleCheck}
                value={index}
              />
              <Card rank={card.rank} suit={card.suit} />
            </label>
          ))}
        </div>

        <button
          className="flex px-4 py-2 mx-auto mt-1 font-semibold text-blue-700 bg-transparent border border-blue-500 rounded hover:bg-blue-500 hover:text-white hover:border-transparent"
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
        </button>
      </form>
    </div>
  );
};

export default BullShitPanel;
