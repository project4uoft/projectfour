// after user is logged in he gets redirected to this game room page
import SidePanel from "../../../../components/gameroom/side-panel/SidePanel";
import MainPanel from "../../../../components/gameroom/main-panel/MainPanel.js";
import Meta from "../../../../components/Meta";
import Navbar from "../../../../components/Navbar";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";

const NEW_PLAYER_JOINED = "newPlayerJoin"; // Name of the event
const NEW_GAME_EVENT = "newGame"; // Name of the event
const SOCKET_SERVER_URL = "http://localhost:3000";
const CREATE_GAME_EVENT = "createGame";
const UPDATE_GAME_EVENT = "updateGame";
const END_EVENT = "endBullShit";

// functional component is wrapped in withPageAuthRequired method from auth0 to protect route
// if user is not signed in - he will be redirected to login page
export default withPageAuthRequired(function Home() {
  const router = useRouter();
  const { user, error, isLoading } = useUser();
  const { roomId, playerName } = router.query; // Gets roomId from URL
  console.log(roomId, playerName);
  const socketRef = useRef();

  const [gameBoard, setGameBoard] = useState(null);
  const [gameTitle, setGameTitle] = useState(null);
  const [player, setPlayer] = useState(null);
  const [winners, setWinners] = useState(false);

  // Emmit new game event to socket.io when game button clicked in side menu
  const handleClick = (game) => {
    socketRef.current.emit(NEW_GAME_EVENT, {
      roomId: roomId,
      game: game,
    });
  };

  useEffect(() => {
    // Creates a WebSocket connection
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId },
    });

    // Listens for incoming messages
    if (roomId !== undefined) {
      socketRef.current.emit(NEW_PLAYER_JOINED, {
        roomId: roomId,
        playerName: playerName,
      });
    }

    // If game started send game event to socket.io with game info
    socketRef.current.on(CREATE_GAME_EVENT, ({ game, board }) => {
      console.log(`we're playing ${game}`);
      setPlayer(
        board.players.filter((player) => player.playerName === playerName)[0]
      );
      setGameBoard(board);
      setGameTitle(game);
      setWinners(false);
    });

    // Send game end event with winners info
    socketRef.current.on(END_EVENT, ({ winners }) => {
      console.log(`the winners are ${winners}`);
      setWinners(winners);
    });

    // send game update events as game progress
    socketRef.current.on(UPDATE_GAME_EVENT, ({ board }) => {
      console.log(`updating game`);
      console.log(board);
      setPlayer(
        board.players.filter((player) => player.playerName === playerName)[0]
      );
      setGameBoard(board);
    });

    // Destroys the socket reference
    // when the connection is closed
    return () => {
      socketRef.current.disconnect();
    };
  }, [gameBoard, roomId, player]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  // display page content only if user is logged in
  if (user) {
    return (
      <>
        <Meta title="Game Room" />
        <Navbar />
        <div className="flex flex-row flex-auto h-screen">
          <SidePanel handleClick={handleClick} />
          <MainPanel
            roomId={roomId}
            gameTitle={gameTitle}
            player={player}
            gameBoard={gameBoard}
            winners={winners}
            players={gameBoard ? gameBoard.players : []}
            game={gameTitle}
          />
        </div>
      </>
    );
  }
});
