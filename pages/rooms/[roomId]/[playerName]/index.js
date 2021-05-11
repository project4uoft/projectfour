import SidePanel from '../../../../components/gameroom/side-panel/SidePanel'
import MainPanel  from '../../../../components/gameroom/main-panel/MainPanel.js'

import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const NEW_PLAYER_JOINED = "newPlayerJoin"; // Name of the event
const NEW_GAME_EVENT = "newGame"; // Name of the event
const SOCKET_SERVER_URL = "http://localhost:4000";
const CREATE_GAME_EVENT = "createGame";  
const UPDATE_GAME_EVENT = "updateGame";
const END_EVENT = "endBullShit";

export default function Home() {

  const router = useRouter()
  const { roomId, playerName } = router.query; // Gets roomId from URL
  console.log(roomId)
  const socketRef = useRef();

  const [gameBoard, setGameBoard] = useState(null);
  const [gameTitle, setGameTitle] = useState(null);
  const [player, setPlayer] = useState(null);
  const [winners, setWinners] = useState(false);

  
  const handleClick = (game) =>{
    socketRef.current.emit(NEW_GAME_EVENT, {
      roomId : roomId,
      game : game,
    });
  }

  useEffect(() => {

    // Creates a WebSocket connection
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
        query: { roomId },
    });

    // Listens for incoming messages
    if(roomId!==undefined){
      socketRef.current.emit(NEW_PLAYER_JOINED,{
        roomId : roomId,
        playerName: playerName
      });
    }

    socketRef.current.on(CREATE_GAME_EVENT, ({game, board}) => {
      console.log(`we're playing ${game}`)
      setPlayer(board.players.filter(player => player.playerName === playerName)[0]);
      setGameBoard(board);
      setGameTitle(game);
      setWinners(false)
    });

    socketRef.current.on(END_EVENT, ({winners}) => {
      console.log(`the winnders are ${winners}`)
      setWinners(winners)
    });
    
    socketRef.current.on(UPDATE_GAME_EVENT, ({board}) => {
      console.log(`updating game`)
      console.log(board)
      setPlayer(board.players.filter(player => player.playerName === playerName)[0]);
      setGameBoard(board);
    });

    // Destroys the socket reference
    // when the connection is closed
    return () => {
        socketRef.current.disconnect();
    };
}, [gameBoard, roomId, player]);


  return (
    <>
    <div className="flex flex-auto flex-row h-screen">
        <SidePanel handleClick={handleClick}/>
        <MainPanel gameTitle={gameTitle} player={player} gameBoard={gameBoard} winners={winners}/>
    </div>
    </>
  )
}
